const Router = require('koa-router');
const Category = new Router();
const CategoryModel = require('../controller/categoryController');


Category.get('/', CategoryModel.getCategories);

Category.post('/add', CategoryModel.addCategory);

module.exports = Category;
