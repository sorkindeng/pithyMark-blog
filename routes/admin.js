var router = require('koa-router')()
var userModel = require('../models/user')
var optModel = require('../models/options')
var postModel = require('../models/posts')
var md5 = require('md5');
var config = require('../config/config');
var queryString = require('querystring'); 



router.get('/admin', async (ctx, next) => {
  if (ctx.session.user){
    console.log(ctx.session);
    await ctx.render('admin', {
      title: 'admin',
      session: ctx.session
    })
  }else{
    ctx.redirect('/login');
    //ctx.status = 301;
  }
})


router.get('/logout', async (ctx, next) => {
  console.log(ctx.session);
  
  ctx.session = null;
  console.log('登出成功')
  ctx.redirect('/login');
  
})

router.get('/login', async (ctx, next) => {
  console.log(ctx.session);
  //判断用户是否已经登陆
  if (ctx.session.user) {     
    ctx.redirect('/admin');
  }else{
    await ctx.render('login', {
      title: 'login'
    })
  }
})


router.post('/login', async (ctx, next) => {
	let  userName = ctx.request.body.username
	let  userPwd = ctx.request.body.password
	
  ctx.body = 'false'
  await userModel.findFounderPassword(userPwd)
  .then(result => {
    if (md5(userPwd) === result[0]['optvalue']) {
      ctx.body = 'true'
      ctx.session.user = {
        username: 'admin',
        userid: 1
      }
    }else{
      console.log('密码不正确');    
    }
  }).catch(err => {
    console.log('查询数据库错误2');    
    //console.log(err);
  })
  let counts = await postModel.getCounts();  
  if ((counts!=null) && (counts!=undefined)){
    ctx.session.postCounts = counts;
    ctx.session.postPages = Math.ceil(counts/config.adminPagingSize)
  }
})

router.get('/admin/options', async (ctx, next) => {
  console.log(ctx.session);
  //判断用户是否已经登陆
  // if ( !ctx.session.user) {     
  //   return ctx.redirect('/login');
  // }
  let ret = await optModel.findAllOptions();
  
  return await ctx.render('admin-options', {
    title: 'options',
    opts: ret
  })
})

router.post('/admin/options/update', async (ctx, next) => {
  console.log(ctx.session);
  ctx.body = 'false'
  //判断用户是否已经登陆
  // if ( !ctx.session.user) {     
  //   return ctx.redirect('/login');
  // }
  console.log(ctx.request.body);
  let optKey = ctx.request.body.txtKey;
  let optValue = ctx.request.body.txtValue;
  let optDesc = ctx.request.body.txtDesc;

  let ret = await optModel.updateOption([optValue, optDesc, optKey]);
  ctx.body = 'true'
})

router.get('/admin/posts', async (ctx, next) => {
  console.log(ctx.session);
  //判断用户是否已经登陆
  // if ( !ctx.session.user) {     
  //   return ctx.redirect('/login');
  // }
  let page=1;
  if(ctx.request.querystring){
    var params = queryString.parse(ctx.request.querystring);  
    console.log(ctx.request.querystring);
    page = params.page;
  }
  //let page2= (queryString.parse(ctx.request.querystring).page) || 1;
  //console.log('page2:' + page2);

  let offset=config.adminPagingSize*(page-1);
  let rows=config.adminPagingSize;
  let ret = await postModel.findForPage(offset, rows);
  ctx.session.postCurPage =page;
  //utlFunc.postsFormat(ret);

  return await ctx.render('admin-posts', {
    title: 'posts',
    session: ctx.session,
    posts: ret
  })
})


//新增文章 get
router.get('/admin/post/new', async (ctx, next) => {
  console.log(ctx.session);
  //判断用户是否已经登陆
  // if ( !ctx.session.user) {     
  //   return ctx.redirect('/login');
  // }
  return await ctx.render('admin-postedit', {
    title: 'posts',
    session: ctx.session,
    isEdit: false,
    post: []
  })
})
//编辑
router.get('/admin/post/edit/:postId', async (ctx, next) => {
  console.log(ctx.session);
  //判断用户是否已经登陆
  // if ( !ctx.session.user) {     
  //   return ctx.redirect('/login');
  // }

  let ret = await postModel.findById(ctx.params.postId)
  ret = JSON.parse(JSON.stringify(ret[0]))   // 二维数组转一维

  return await ctx.render('admin-postedit', {
    title: 'posts',
    session: ctx.session,
    isEdit: true,
    post: ret
  })
})
//新增文章保存 post
//(posttype,status,title,pathname,summary,markdown_content,content,allow_comment,create_time) VALUES(0,?,?,?,?,?,?,?,?);
//post status:    '0 草稿，1 待审核，2 已拒绝，3 已发布，4 私有不公开，9 删除'
router.post('/admin/post/save', async (ctx, next) => {
  console.log(ctx.session);
  //判断用户是否已经登陆
  // if ( !ctx.session.user) {     
  //   return ctx.redirect('/login');
  // }
  console.log(ctx.request.body);
  let values = [];
  let status = 0;
  if (ctx.request.body.public) status = 3
  if( ctx.request.body.isHold ) status = 4;
  values.push(status);
  values.push(ctx.request.body.txtTitle );
  values.push(ctx.request.body.txtPath);
  values.push(ctx.request.body.txtContent.substr(0,20) );
  values.push(ctx.request.body.txtContent);
  values.push(ctx.request.body.txtContent);
  values.push( ctx.request.body.isComment ? 1 : 0 );
  let dt= new Date();
  values.push(dt.toLocaleString() );
  if (ctx.request.body.txtId){
    values.push(ctx.request.body.txtId);
    console.log(values);
    let ret = await postModel.updateRowById(values);
  }else{
    console.log(values);
    let ret = await postModel.newRow(values);
  }

  ctx.redirect('/admin/posts');

})

//删除
router.get('/admin/post/delete/:postId', async (ctx, next) => {
  console.log(ctx.session);
  //判断用户是否已经登陆
  // if ( !ctx.session.user) {     
  //   return ctx.redirect('/login');
  // }

  let ret = await postModel.deleteById(ctx.params.postId);

  ctx.redirect('/admin/posts');
})

//修改为发布状态
router.get('/admin/post/public/:postId', async (ctx, next) => {
  console.log(ctx.session);
  //判断用户是否已经登陆
  // if ( !ctx.session.user) {     
  //   return ctx.redirect('/login');
  // }
  let values = [3, ctx.params.postId];

  let ret = await postModel.updateStatusById(values);

  ctx.redirect('/admin/posts');
})

module.exports = router
