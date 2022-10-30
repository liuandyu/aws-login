const utils = require('../utils/utils');
const auth = require('../utils/auth');

function verify(requestBody) {
    if(!requestBody.user || !requestBody.user.username || !requestBody.toekn) {
        utils.buildResponse(401, {
            verified: false,
            message: 'incorrect request body'
        })
    }

    const user = requestBody.user;
    const token = requestBody.token;
    const verification = auth.verifyToken(user.username, token);

    if(!verification.verified) {
        return utils.buildResponse(401, verification);
    }

    return utils.buildResponse(200, {
        verified: true,
        message: 'success',
        user: user,
        token: token
    })
}

module.exports.verify = verify;