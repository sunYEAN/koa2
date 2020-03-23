const mongoose = require('mongoose');
const CateModel = mongoose.model('Category');

/**
 * 获取所有分类
 * @param ctx
 * @returns {Promise<void>}
 */
exports.getCategories = async function (ctx) {
    ctx.success(await CateModel.find({}));
};


/**
 * 添加一个分类项
 * @param ctx
 * @returns {Promise<void>}
 */
exports.addCategory = async function (ctx) {
    const {name} = ctx.request.body;
    ctx.success(await new CateModel({
        name
    }).save());
};
