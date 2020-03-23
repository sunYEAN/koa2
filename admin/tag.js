const Router = require('koa-router');
const Tag = new Router();
const TagModel = require('../controller/tagController');


Tag.get('/', TagModel.getTags);

Tag.post('/add', TagModel.addTag);

module.exports = Tag;
