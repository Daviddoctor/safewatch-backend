const {responsesTypes} = require('./httpResponse.js');

exports.formatResponse = (statusCode, data) => {
    return {
        statusCode: statusCode,
        statusMessage: responsesTypes[statusCode].statusMessage,
        statusDescription: responsesTypes[statusCode].statusDescription,
        result: data
    }
}