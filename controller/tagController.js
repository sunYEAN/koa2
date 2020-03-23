const mongoose = require('mongoose');
const TagModel = mongoose.model('Tag');

/**
 * 获取所有标签
 * @param ctx
 * @returns {Promise<void>}
 */
exports.getTags = async function (ctx) {
    ctx.success(await TagModel.find({}));
};


/**
 * 添加一个标签
 * @param ctx
 * @returns {Promise<void>}
 */
exports.addTag = async function (ctx) {
    const {name} = ctx.request.body;
    ctx.success(await new TagModel({
        name
    }).save());
};
