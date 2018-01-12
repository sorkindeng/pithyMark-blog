var Koa=require('koa');
var bodyParser = require('koa-bodyparser');
var views = require('koa-views');
var session = require('koa-session-minimal');
var koaStatic = require('koa-static');
var siteInit = require('./service/middleware-site-init')


var routeIndex = require('./routes/index')
var routeAdmin = require('./routes/admin')
var routePosts = require('./routes/posts')

var app=new Koa();

// 配置静态资源加载中间件
app.use(koaStatic(__dirname + '/public'))

// 配置session中间件
app.use(session({
  key: 'u-session-id',
  cookie: {                   // 与 cookie 相关的配置
    domain: 'localhost',    // 写 cookie 所在的域名
    path: '/',              // 写 cookie 所在的路径
    maxAge: 1000 * 60 * 60*24,      // cookie 有效时长
    httpOnly: true,         // 是否只用于 http 请求中获取
    overwrite: false        // 是否允许重写
  }
}))


app.use(views((__dirname + '/views'), {
  extension: 'ejs'
}))

app.use(bodyParser());

app.use(siteInit.sessionInit);

// routes
app.use(routeIndex.routes(), routeIndex.allowedMethods())
app.use(routeAdmin.routes(), routeAdmin.allowedMethods())
app.use(routePosts.routes(), routePosts.allowedMethods())


// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});
// 监听在3000端口
app.listen(3000, ()=>{
  console.log('[pithyMark-blog]The server is starting at port 3000');
});

//app.listen(3000)
//console.log(`listening on port ${config.port}`)
