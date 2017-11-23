var Koa=require('koa');
var bodyParser = require('koa-bodyparser');
var views = require('koa-views');



var routeIndex = require('./routes/index')


var app=new Koa();


app.use(bodyParser());


app.use(views((__dirname + '/views'), {
  extension: 'html',
  map: { html: 'nunjucks' }
}));

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`=========================>${ctx.method} ${ctx.url} - ${ms}ms`)
})
// routes
app.use(routeIndex.routes(), routeIndex.allowedMethods())
//app.use(users.routes(), users.allowedMethods())


// 监听在3000端口
app.listen(3000, ()=>{
  console.log('[pithyMark-blog]The server is starting at port 3000');
});

//app.listen(3000)
//console.log(`listening on port ${config.port}`)
