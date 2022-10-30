const AWS = require('aws-sdk');
const utils = require('../utils/utils');
const bcrypt = require('bcryptjs');
const auth = require('../utils/auth');

AWS.config.update({
    region: 'us-west-2'
});

const dynamodb = new AWS.DynamoDB.DocumentClient();
const userTable = 'jyu-users';

async function login(user) {
    const username = user.username;
    const password = user.password;

    if(!user || !username || !password) {
        return utils.buildResponse(401, {
            message: 'username an password are required'
        })
    }

    const dynamoUser = await getUser(username.toLowerCase().trim());

    if(!dynamoUser || !dynamoUser.username) {
        return utils.buildResponse(403, {
            message: "user does not exist"
        })
    }

    if(!bcrypt.compareSync(password, dynamoUser.password)) {
        return utils.buildResponse(403, {message: 'password is incorrect'});
    }

    const userInfo  = {
        username : dynamoUser.username,
        name: dynamoUser.name
    }

    const token = auth.generateToke(userInfo);

    const response = {
        user: userInfo,
        token: token
    }

    return utils.buildResponse(200, response);
}

async function getUser(username) {
    const params = {
        TableName: userTable,
        Key: {
            username: username
        }
    }

    return await dynamodb.get(params).promise().then(response => {
        return response.Item;
    }, error => {
        console.log('There is an error getting user:', error)
    })
}

module.exports.login = login;