function toString(value) {
    return Object.prototype.toString.call(value);
}

class Validate {
    constructor(value) {
        this.value = value;
    }

    test(regexp) {
        if (toString(regexp) === '[object RegExp]') {
            return this.value.test(regexp);
        } else {
            return this.value === regexp;
        }
    }

    required(status) {
        return status ? !!this.value : true;
    }

    length({min = 0, max}) {
        min = parseInt(min);
        max = parseInt(max);
        // 没有传最大值
        return max.toString() === 'NaN'
            ? this.value.length >= min
            : this.value.length >= min && this.value.length <= max;
    }
}


exports.responseData = async function (ctx, next) {
    ctx.success = function (data, code) {
        ctx.body = {
            code: code || 200,
            message: 'success',
            data: data,
            time: Date.now(),
        }
    };

    ctx.fail = function (err) {
        ctx.body = Object.assign({
            time: Date.now(),
        }, err);
    };

    await next();
};

exports.errorHandler = async function (ctx, next) {
    try {
        await next();
    } catch (err) {
        ctx.fail(err);
    }
};

exports.validateQuery = async function (ctx, next) {
    ctx.validateQuery = function (params) {
        const query = ctx.request.query;
        const status = Object.keys(params).every(key => {
            const value = query[key];
            const validate = new Validate(value);
            return Object.keys(params[key]).every(validateKey => {
                return validate[validateKey](params[key][validateKey]);
            })
        });
        if (!status) throw {code: -1, message: 'query传入的参数错误'};
    };

    await next();
};
