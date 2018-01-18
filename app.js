var Koa=require('koa');
var bodyParser = require('koa-bodyparser');
var views = require('koa-views');
//var session = require('koa-session-minimal');
var session = require('koa-session');
var koaStatic = require('koa-static');
var siteInit = require('./service/middleware-site-init')
var fileStore = require('./service/koa-session-file')
var path = require('path');
var knotCounter = require('./service/middleware-knotCounter')


var routeIndex = require('./routes/index')
var routeAdmin = require('./routes/admin')
var routePosts = require('./routes/posts')

var app=new Koa();
app.keys = ['pithyMark'];

// 配置静态资源加载中间件
app.use(koaStatic(__dirname + '/public'))

// 配置session中间件
//app.use(session());
app.use(session({
  key: 'koa:sid',
  maxAge: 86400000,
  store: new fileStore({cacheDir: path.resolve(__dirname, './cacheSession/')})
}, app))

// 配置模板类型
app.use(views((__dirname + '/views'), {extension: 'ejs'}))

app.use(bodyParser());

// 自定义中间件
app.use(siteInit.sessionInit);
app.use(knotCounter({cache: true}));

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
