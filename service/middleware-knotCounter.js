
const debug = require('debug')('knotCounter');

module.exports = function (options) {
  options = options || {};
  options.cache = options.cache || true ;
  console.log(`===options.cache=${options.cache}`)
  var count = 0;
  
  return async function (ctx, next) {
    //await traceLog(ctx);
    traceLog(ctx);
  
    await next();
  }

  async function traceLog(ctx){
    console.log(`>>>>>>>>>>>>>>>>>>>>>>>>>>>${ctx.method} ${ctx.url}`)
    console.log(`===ctx.state.href=${ctx.state.href}`)
    await sleep(1000);
    console.log(`===ctx.state.href=${ctx.state.href}`)
    console.log(`===ctx.href=${ctx.href}`)
    console.log(`===ctx.path=${ctx.path}`)
    console.log(`===ctx.host=${ctx.request.host}`)
    console.log(`===ctx.ip=${ctx.request.ip}`)
    console.log(`===ctx.sessionid=` + ctx.cookies.get('koa:sid'))
    console.log(`>>>>>>>>>>>>>>>>>>>>>>>>>>>`+ count++ )
  }
  
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
  
};