'use strict';
const parse = require('co-body');
const messages = [
  { id: 0,
    message: 'Koa next generation web framework for node.js'
  },
  { id: 1,
    message: 'Koa is a new web framework designed by the team behind Express'
  }
];

module.exports.home=async (ctx,next)=>{
 	ctx.body = await ctx.render('index',{'messages':messages})
}
module.exports.list=async (ctx,next)=>{
	ctx.body = await messages
}
module.exports.create=async (ctx,next)=>{
	const message = await parse(ctx);
	const id = messages.push(message)-1;
	message.id=id;
	ctx.response.redirect('/');
}