const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const IssueSchema = Schema({
    title: String,
    desc: String,
    edit_time: {
        type: Date, default: Date.now
    },
    update_time: Date,
    tags: [String],
    cate: {
        type: Schema.Types.ObjectID, ref: 'CateModel'
    },
    poster: [],
    content: String,
    views: String,
    comments: []
});

// 虚拟属性，相当于计算属性。不会记录到数据库。
// IssueModel
//     .virtual('')
//     .get(function () {
//        // 通过this访问当前模型
//     });

mongoose.model('Issue', IssueSchema);
