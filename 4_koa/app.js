const messages = require('./controllers/messages.js')
const Koa = require('koa');
const path = require('path');
const render = require('koa-swig');
const co = require('co');
const router = require('koa-simple-router');
const serve = require('koa-static');
const app = new Koa();

app.use(serve(__dirname + '/public/'));
app.context.render = co.wrap(render({
  root: path.join(__dirname, 'views'),
  ext: 'html',
  writeBody: false
}));

app.use(router(_ => {
  _.get('/', messages.home)
  _.get('/message', messages.list)
  _.post('/message', messages.create)
}))
 
app.listen(3001);