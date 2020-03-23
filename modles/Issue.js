const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const IssueSchema = new Schema({
    title: String,
    desc: String,
    layout: {
        type: Number, default: 0
    },
    create_time: {
        type: Date, default: Date.now
    },
    update_time: Date,
    tags: [{
        type: Schema.Types.ObjectID, ref: 'Tag'
    }],
    cate: {
        type: Schema.Types.ObjectID, ref: 'Category'
    },
    poster: [],
    content: String,
    views: String,
    comments: []
});

/**
 * 根据Id查询issue
 * @param id
 * @returns {Query|void}
 */
IssueSchema.statics.findById = function (id) {
    return this.findOne({_id: id});
};

/**
 * 根据关键字查询issues
 * @param key
 * @returns {Query}
 */
IssueSchema.statics.finByKeyWord = function (key) {
    // 模糊匹配
    return this.find({
        $or: [
            {desc: {$regex: key, $options: '$i'}},
            {title: {$regex: key, $options: '$i'}},
            {content: {$regex: key, $options: '$i'}},
        ]
    }).sort({
        "_id": -1
    });
};

/**
 * 查询issue|s
 * @param id
 * @param key
 * @returns {*}
 */
IssueSchema.statics.findByKey = function ({id, key}) {
    return id ? this.findById(id) : this.finByKeyWord(key)
};

mongoose.model('Issue', IssueSchema);

// // 虚拟属性，相当于计算属性。不会记录到数据库。
// IssueSchema
//     .virtual('category')
//     .get(function () {
//         // 通过this访问当前模型
//         return this.cate.name
//     });

