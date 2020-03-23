const Router = require('koa-router');
const Home = new Router();
const Issue = require("./issue");
const Category = require("./category");


Home.use('/issue', Issue.routes(), Issue.allowedMethods());
Home.use('/category', Category.routes(), Category.allowedMethods());


module.exports = Home;
