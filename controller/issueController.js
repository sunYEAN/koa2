const mongoose = require('mongoose');
const IssueModel = mongoose.model('Issue');


let issues = {

};

// GET - 用于获取数据。
// PUT - 用于更新或添加数据。
// POST - 用于添加数据。
// DELETE - 用于删除数据。
exports.issues_get = async (ctx) => {
    await IssueModel.find()
};

exports.issues_get_search = async (ctx) => {
    ctx.validateQuery({key: {required: true}});
    const {key} = ctx.request.query;

    // 模糊匹配
    const result = await IssueModel.find({
        $or: [
            {title: {$regex: key, $options: '$i'}},
            {content: {$regex: key, $options: '$i'}},
            {desc: {$regex: key, $options: '$i'}}
        ]
    });
    ctx.success(result);
};

exports.issue_get_by_id = async (ctx) => {
    ctx.validateQuery({id: {required: true}});
    const {id} = ctx.request.query;
    const issue = await IssueModel.findOne({_id: id});
    ctx.success(issue);
};

exports.issue_post = async (ctx) => {
    const params = ctx.request.body;
    const issue = await new IssueModel(params).save();
    ctx.success(issue);
};

exports.issue_delete_by_id = async (ctx) => {
    ctx.validateQuery({id: {required: true}});
    const {id} = ctx.request.body;
    const issue = await IssueModel.deleteOne({_id: id});
    ctx.success(issue);
};
