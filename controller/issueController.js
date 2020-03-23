const mongoose = require('mongoose');
const IssueModel = mongoose.model('Issue');

let _ISSUES = {};


// GET - 用于获取数据。
// PUT - 用于更新或添加数据。
// POST - 用于添加数据。
// DELETE - 用于删除数据。
exports.issues_get = async (ctx) => {
    let {page, page_size} = ctx.request.query;

    let _key = `${page}-${page_size}`;
    let _value = {
        count: 0,
        list: [],
        isEnd: false
    };

    page = parseInt(page);
    page_size = parseInt(page_size);

    if (_ISSUES[_key]) _value = _ISSUES[_key];
    else {
        _value.count = await IssueModel.estimatedDocumentCount();
        _value.list = await IssueModel
            .find({})
            .populate({
                path: 'cate',
                select: 'name -_id'
            })
            .populate({
                path: 'tags',
                select: 'name -_id'
            })
            .skip((page - 1) * page_size)
            .limit(page_size)
            .sort({'_id': -1});
        _value.isEnd = (page_size * page) >= _value.count;
        // _ISSUES[_key] = _value;
    }
    ctx.success(_value);
};

exports.issue_by_key = async (ctx) => {
    // ctx.validateQuery({key: {required: true}});
    let {key, id} = ctx.request.query;
    if (!key && !id) return ctx.fail('缺少参数');
    ctx.success(
        await IssueModel.findByKey({id, key})
            .populate({
                path: 'cate',
                select: 'name -_id'
            })
            .populate({
                    path: 'tags',
                    select: 'name -_id'
                }
            )
    );
};


exports.issue_post = async (ctx) => {
    const params = ctx.request.body;
    const issue = await new IssueModel(params).save();
    if (issue) {
        _ISSUES = {};
    }
    ctx.success(issue);
};

exports.issue_delete_by_id = async (ctx) => {
    const {id} = ctx.params;
    console.log(id);
    const issue = await IssueModel.deleteOne({_id: id});
    ctx.success(issue);
};

exports.issue_update_by_id = async (ctx) => {
    const {id} = ctx.params;
    console.log(id);
    const issue = await IssueModel.deleteOne({_id: id});
    ctx.success(issue);
};
