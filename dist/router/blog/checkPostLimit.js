'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _koaRouter=require('koa-router');var _koaRouter2=_interopRequireDefault(_koaRouter);var _boom=require('boom');var _boom2=_interopRequireDefault(_boom);var _koaConvert=require('koa-convert');var _koaConvert2=_interopRequireDefault(_koaConvert);var _koaReqValidator=require('koa-req-validator');var _koaReqValidator2=_interopRequireDefault(_koaReqValidator);var _auth=require('../../utils/auth');var _mixed=require('../../utils/mixed');var _config=require('../../config');var _config2=_interopRequireDefault(_config);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _asyncToGenerator(fn){return function(){var gen=fn.apply(this,arguments);return new Promise(function(resolve,reject){function step(key,arg){try{var info=gen[key](arg);var value=info.value}catch(error){reject(error);return}if(info.done){resolve(value)}else{return Promise.resolve(value).then(function(value){step('next',value)},function(err){step('throw',err)})}}return step('next')})}}var validate=function validate(){return(0,_koaConvert2.default)(_koaReqValidator2.default.apply(undefined,arguments))};var router=new _koaRouter2.default({prefix:'/v1/checkPostLimit'});router.get('/',function(){var _ref=_asyncToGenerator(regeneratorRuntime.mark(function _callee(ctx,next){var authorization,_ref2,userId,_ref3,findUser,canPost,user;return regeneratorRuntime.wrap(function _callee$(_context){while(1){switch(_context.prev=_context.next){case 0:_context.prev=0;authorization=ctx.request.header.authorization;_context.next=4;return(0,_mixed.checkAuth)(authorization);case 4:_ref2=_context.sent;userId=_ref2.userId;if(userId){_context.next=8;break}throw _boom2.default.create(401,'Token is not valid or expired',{code:401002});case 8:_context.next=10;return(0,_mixed.canPostArticle)(userId);case 10:_ref3=_context.sent;findUser=_ref3.findUser;canPost=_ref3.canPost;user=(0,_mixed.getCleanUser)(findUser);if(canPost){_context.next=16;break}throw _boom2.default.create(403,'You can\'t repeatly post article in '+_config2.default.user.createdPostTime,{code:403003,create_post_time:user.create_post_time});case 16:ctx.body={code:200005,status:'success',create_post_time:user.create_post_time,message:'You have allowed to post articles'};_context.next=22;break;case 19:_context.prev=19;_context.t0=_context['catch'](0);if(_context.t0.output.statusCode){ctx.throw(_context.t0.output.statusCode,_context.t0)}else{ctx.throw(500,_context.t0)}case 22:case'end':return _context.stop();}}},_callee,undefined,[[0,19]])}));return function(_x,_x2){return _ref.apply(this,arguments)}}());exports.default=router;