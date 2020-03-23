const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const IssueSchema = Schema({
    title: String,
    desc: String,
    layout: {
        type: Number, default: 0
    },
    create_time: {
        type: Date, default: Date.now
    },
    update_time: Date,
    tags: [String],
    cate: {
        type: Schema.Types.ObjectID, ref: 'Category'
    },
    poster: [],
    content: String,
    views: String,
    comments: []
});

mongoose.model('Issue', IssueSchema);

// // 虚拟属性，相当于计算属性。不会记录到数据库。
// IssueSchema
//     .virtual('category')
//     .get(function () {
//         // 通过this访问当前模型
//         return this.cate.name
//     });

