var router = require('koa-router')()
var userModel = require('../models/user')
var md5 = require('md5');
var config = require('../config/config');
var queryString = require('querystring'); 
var postModel = require('../models/posts')


router.get('/', async (ctx, next) => {
  let page=1;
  if(ctx.request.querystring){
    var params = queryString.parse(ctx.request.querystring);  
    page = (params.page>1 ? params.page: 1) ;
  }

  let offset=config.postsListSize*(page-1);
  let rows=config.postsListSize;
  let ret = await postModel.findForPage2(offset, rows);
  ctx.session.postCurPage =page;

  return await ctx.render('index', {
    title: ctx.session.options.title,
    session: ctx.session,
    posts: ret
  })
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
  //await initSessionData(ctx);
})

 
router.get('/archives', async (ctx, next) => {
  
  let data = await postModel.findAll();

  let result = {};
  data.forEach(item => {
    let strDate = item['create_time']
    let dtDate = new Date(strDate)
    strDate = "" + dtDate.getFullYear() + "年" + (dtDate.getMonth()+1) + "月"
    if(!(strDate in result)) {
      result[strDate] = [];
    }
    result[strDate].push(item);
  });
  console.log(result);
  await ctx.render('archives', {
    title: 'article detail',
    pagename: '归档',  
    posts: result
  })
})

router.get('/categories', async (ctx, next) => {
  
  let data = await postModel.findAll();

  let result = {};
  data.forEach(item => {
    let strCate = item['postcate']
    if(!(strCate in result)) {
      result[strCate] = [];
    }
    result[strCate].push(item);
  });
  console.log(result);
  await ctx.render('archives', {
    title: 'article detail',
    pagename: '分类',
    posts: result
  })
})
  
router.get('/categories/:catename', async (ctx, next) => {
  ctx.redirect('/categories');
})

   

router.get('/hello', async (ctx, next) => {
  let url = ctx.request.url;
  let content = ctx.request.body;
  let html = `
  <ul>
    <li>Let's beginning!!!!!</li>
    <li>${url}</li>
    <li>${content}</li>
    </ul>
  `
  ctx.body = html;
})


module.exports = router
