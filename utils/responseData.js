module.exports = function () {
    return async function (ctx, next) {
        ctx.success = function (data, code) {
            ctx.body = {
                code: code || 200,
                message: 'success',
                data: data,
                time: Date.now(),
            }
        };

        ctx.fail = function (message, code) {
            ctx.body = {
                code : code || 200,
                message : message || 'success',
                time: Date.now(),
            }
        };

        await next();
    }
};
