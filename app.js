const Koa = require('koa');
const path = require('path');
const Router = require('koa-router');
const mongoose = require('mongoose');
const bodyParser = require('koa-body');
const {responseData, validateQuery, errorHandler} = require('./utils/responseData');

// 初始化model
require('./modles/Issue');
require('./modles/Category');

const app = new Koa();

const config = {
    port: 3000,
    host: 'localhost',
    dbName: 'blog'
};

// 数据库连接
mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://${config.host}/${config.dbName}`, {
    keepAlive: 1,
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.log.bind(console, 'MongoDB: 连接错误'));


app.keys = [];

app.use(errorHandler);
// 响应数据格式化中间件
app.use(responseData);
app.use(validateQuery);

// 响应时间
app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
});

app.use(bodyParser({
    multipart: true, // 支持文件上传
    formidable: {
        uploadDir: path.join(__dirname, 'public/upload/'), // 设置文件上传目录
        keepExtensions: true, // 保持文件的后缀
        maxFieldsSize: 2 * 1024 * 1024, // 文件上传大小，缺省2M
        onFileBegin: (name, file) => { // 文件上传前的设置
            const fp = path.join(__dirname, 'public/upload/');
            if (!fs.existsSync(fp)) { // 检查是否有“public/upload/”文件夹
                fs.mkdirSync(fp); // 没有就创建
            }
            console.log(`bodyparse: name:${name}; file:${util.inspect(file)}`);
        }
    }
}));

let router = new Router();

// routes
const Admin = require('./admin');
const client = require('./client');

router.use('/admin', Admin.routes(), Admin.allowedMethods());
router.use('/api', client.routes(), client.allowedMethods());
app.use(router.routes()).use(router.allowedMethods());

app.listen(config.port, () => {
    console.log('start on ' + config.port)
});
