var router = require('koa-router')()
var postModel = require('../models/posts')


router.get('/:article.html', async (ctx, next) => {

  let pathname = ctx.params.article;
  let ret = await postModel.getByPathname(pathname);
  ctx.state.href = ctx.request.href;
  //console.log(ctx.state);
  await ctx.render('post', {
    title: pathname,
    item: ret[0]
  })
})


module.exports = router