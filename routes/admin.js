var router = require('koa-router')()
var userModel = require('../models/user.js')
var md5 = require('md5')

router.get('/admin', async (ctx, next) => {
  ctx.redirect('/login');
  ctx.status = 301;
})

router.get('/logout', async (ctx, next) => {
  console.log(ctx.session);
  
  ctx.session = null;
  console.log('登出成功')

  ctx.redirect('/login')

})

router.get('/login', async (ctx, next) => {
  console.log(ctx.session);
  //判断用户是否已经登陆
  if ( ctx.session && ctx.session.user) {     
    //ctx.redirect('/signin');
    //return false;
  }

  await ctx.render('login', {
    title: 'login',
    session: ctx.session
  })
})

router.post('/login', async (ctx, next) => {
	let  userName = ctx.request.body.username
	let  userPwd = ctx.request.body.password
	
  ctx.session.error = '';

  await userModel.findUserByName(userName)
    .then(result => {
      console.log(result);
      console.log(result[0].id);
      var res = JSON.parse(JSON.stringify(result));
      console.log('=======================================');
      console.log(res);
      console.log(res[0]['id']);
      if (md5(userPwd) === res[0]['pass']) {
        //ctx.session.user = res[0]['name']
        //ctx.session.id = res[0]['id']
        ctx.session.user = {
          username: userName,
          userid: res[0]['id']
        }
      }else{
        ctx.session.error = '用户密码不正确'
      }
    }).catch(err => {
      ctx.session.error = '用户名或密码不正确'
    })
  
  await ctx.render('login', {
    title: 'login',
    session: ctx.session
  })
})

module.exports = router
