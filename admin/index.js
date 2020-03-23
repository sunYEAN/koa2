const Router = require('koa-router');
const Home = new Router();
const Tag = require("./tag");
const Issue = require("./issue");
const Category = require("./category");


Home.use('/tag', Tag.routes(), Tag.allowedMethods());
Home.use('/issue', Issue.routes(), Issue.allowedMethods());
Home.use('/category', Category.routes(), Category.allowedMethods());


module.exports = Home;
