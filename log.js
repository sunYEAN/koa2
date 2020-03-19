module.exports = {
    log: async (ctx, next) => {
        await next();
        console.log()
    }
}
