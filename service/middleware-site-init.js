var config = require('../config/config');
var optModel = require('../models/options')
var postModel = require('../models/posts')
var cateModel = require('../models/cate')


async function sessionInit(ctx, next) {
  console.log(`=====================================================================>>>${ctx.method} ${ctx.url}`)
  console.log(`===ctx.href=${ctx.href}`)
  console.log(`===ctx.path=${ctx.path}`)
  console.log(`===ctx.host=${ctx.request.host}`)
  console.log(`===ctx.ip=${ctx.request.ip}`)
  console.log(`===ctx.sessionid=` + ctx.cookies.get('koa:sid'))
  console.log(`=====================================================================`)
  
  const start = new Date()

  if(!ctx.session.isInit)
  {
    let options = {};
    let data = await optModel.findAllOptions();
    data.forEach(item => {
      let optKey = item['optkey']
      options[optKey] = item['optvalue']
    });
    ctx.session.options = options;
    
    let cates= await cateModel.findAll();
    ctx.session.cates = cates;    

    let counts = await postModel.getCounts(true);  
    if ((counts!=null) && (counts!=undefined)){
      ctx.session.postCounts = counts;
      ctx.session.postPages = Math.ceil(counts/config.postsListSize)
    }

    counts = await postModel.getCounts();  
    if ((counts!=null) && (counts!=undefined)){
      ctx.session.postAdminCounts = counts;
      ctx.session.postAdminPages = Math.ceil(counts/config.adminPagingSize)
    }

    ctx.session.isInit = true;
  }
  ctx.state.siteTitle = ctx.session.options.title;
  
  await next()
  const ms = new Date() - start
  console.log(`=====================================================================<<<<<${ctx.method} ${ctx.url} - ${ms}ms`)
}

module.exports={
  sessionInit
}