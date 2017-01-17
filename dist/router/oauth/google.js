'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key]}}}return target};var _koaRouter=require('koa-router');var _koaRouter2=_interopRequireDefault(_koaRouter);var _lodash=require('lodash');var _lodash2=_interopRequireDefault(_lodash);var _nodeFetch=require('node-fetch');var _nodeFetch2=_interopRequireDefault(_nodeFetch);var _querystring=require('querystring');var _querystring2=_interopRequireDefault(_querystring);var _boom=require('boom');var _boom2=_interopRequireDefault(_boom);var _koaConvert=require('koa-convert');var _koaConvert2=_interopRequireDefault(_koaConvert);var _koaReqValidator=require('koa-req-validator');var _koaReqValidator2=_interopRequireDefault(_koaReqValidator);var _users=require('../../models/users');var _users2=_interopRequireDefault(_users);var _auth=require('../../utils/auth');var _mixed=require('../../utils/mixed');var _config=require('../../config');var _config2=_interopRequireDefault(_config);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _asyncToGenerator(fn){return function(){var gen=fn.apply(this,arguments);return new Promise(function(resolve,reject){function step(key,arg){try{var info=gen[key](arg);var value=info.value}catch(error){reject(error);return}if(info.done){resolve(value)}else{return Promise.resolve(value).then(function(value){step('next',value)},function(err){step('throw',err)})}}return step('next')})}}var validate=function validate(){return(0,_koaConvert2.default)(_koaReqValidator2.default.apply(undefined,arguments))};var router=new _koaRouter2.default({prefix:'/v1/auth/google'});router.post('/',validate({'code:body':['require','code is required']}),function(){var _ref=_asyncToGenerator(regeneratorRuntime.mark(function _callee(ctx,next){var code,_Config$google,accessTokenUrl,peopleApiUrl,params,accessTokenResponse,_ref2,access_token,token_type,_userInfoResponse,userInfo,name,email,picture,id,accountExist,socialAccountExist,base64URI,userBdy,token,user,BadRequestError;return regeneratorRuntime.wrap(function _callee$(_context){while(1){switch(_context.prev=_context.next){case 0:_context.prev=0;code=ctx.request.body.code;_Config$google=_config2.default.google,accessTokenUrl=_Config$google.accessTokenUrl,peopleApiUrl=_Config$google.peopleApiUrl;params=_extends({code:code},_config2.default.google);_context.next=6;return(0,_nodeFetch2.default)(accessTokenUrl,{method:'post',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:_querystring2.default.stringify(params)});case 6:accessTokenResponse=_context.sent;if(!accessTokenResponse.ok){_context.next=40;break}_context.next=10;return accessTokenResponse.json();case 10:_ref2=_context.sent;access_token=_ref2.access_token;token_type=_ref2.token_type;_context.next=15;return(0,_nodeFetch2.default)(peopleApiUrl,{method:'get',headers:{Authorization:token_type+' '+access_token}});case 15:_userInfoResponse=_context.sent;if(!_userInfoResponse.ok){_context.next=40;break}_context.next=19;return _userInfoResponse.json();case 19:userInfo=_context.sent;name=userInfo.name,email=userInfo.email,picture=userInfo.picture,id=userInfo.id;_context.next=23;return _users2.default.findOne({email:email,social:false});case 23:accountExist=_context.sent;if(!accountExist){_context.next=26;break}throw _boom2.default.forbidden('The email has already been registered in our web approach');case 26:_context.next=28;return _users2.default.findOne({googleId:id});case 28:socialAccountExist=_context.sent;_context.next=31;return(0,_mixed.encodeRemoteImg)(picture);case 31:base64URI=_context.sent;userBdy={nickname:name,email:email,avatar:base64URI};token=_auth.getToken['JWT'](email);if(!socialAccountExist){_context.next=36;break}return _context.abrupt('return',ctx.response.body={status:'success',auth:_extends({token:token},userBdy)});case 36:user=new _users2.default(_lodash2.default.extend(userBdy,{isEmailActived:true,social:true,googleAccessToken:access_token,googleId:id}));_context.next=39;return user.save();case 39:return _context.abrupt('return',ctx.response.body={status:'success',auth:_extends({token:token},userBdy)});case 40:/* Bad */BadRequestError=_boom2.default.badRequest(userInfoResponse.statusText+' '+userInfoResponse.url);ctx.throw(BadRequestError.output.statusCode,BadRequestError);_context.next=47;break;case 44:_context.prev=44;_context.t0=_context['catch'](0);if(_context.t0.output.statusCode){ctx.throw(_context.t0.output.statusCode,_context.t0)}else{ctx.throw(500,_context.t0)}case 47:case'end':return _context.stop();}}},_callee,undefined,[[0,44]])}));return function(_x,_x2){return _ref.apply(this,arguments)}}());exports.default=router;