var router = require('koa-router')()


router.get('/', async (ctx, next) => {
  //ctx.body = 'hello koa2';
  //await ctx.render('index');
  await ctx.render('index', {
    title: 'Hello Koa 2222!'
  })
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
