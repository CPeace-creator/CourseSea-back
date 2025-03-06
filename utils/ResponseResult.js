const ResponseResult = {
    success(data) {
        return {
            success: true,
            code: 200,
            data: data
        };
    },

    error(code = 500, message) {
        return {
            success: false,
            code: code,
            message: message
        };
    },

    send(res, result) {
        return res.status(result.code).json(result);
    }
};

module.exports = ResponseResult;
