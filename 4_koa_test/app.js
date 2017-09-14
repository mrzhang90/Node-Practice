const Koa = require('koa');
var render = require('koa-swig');
const app = new Koa();

var co = require('co');
var path = require('path');
app.context.render = co.wrap(render({
  // ...your setting 
  root: path.join(__dirname, 'views'),
  autoescape: true,
  cache: 'memory', // disable, set to false 
  ext: 'html',
  writeBody: false
}));

app.use(async ctx => {
	ctx.body = await ctx.render('index')
});

app.listen(3000);