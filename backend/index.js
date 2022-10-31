const registerService = require('./service/register');
const loginService = require('./service/login');
const verifyService = require('./service/verify');
const utils = require('./utils/utils');

const healthPath = '/health';
const registerPath = '/register';
const loginPath = '/login';
const verifyPath = '/verify';

exports.handler = async (event) => {
    console.log('Request Evet:' , event);
    let response;

    switch(true) {
        case event.httpMethod === 'GET' && event.path === healthPath:
            response = utils.buildResponse(200);
            break;
        
        case event.httpMethod === 'POST' && event.path === loginPath:
            const loginBody = JSON.parse(event.body);
            response = await loginService.login(loginBody);
            //response = utils.buildResponse(200);
            break;

        case event.httpMethod === 'POST' && event.path === registerPath:
            const registerBody = JSON.parse(event.body);
            response = await registerService.register(registerBody);
            //response = utils.buildResponse(200);
            break;

        case event.httpMethod === 'POST' && event.path === verifyPath:
            const verifyBody = JSON.parse(event.body);
            response = verifyService.verify(verifyBody);
            //response = utils.buildResponse(200);
            break;
        case event.httpMethod === 'OPTIONS':
            response = utils.buildCORSResponse(200, 'Success');
            break;
        
        default:
            response = buildResponse(404, '404 not Found');
    }
    return response;
};



// jAyp5BfgRr4nMUxHqFmGX6xlefGnO8XYa5VIK4Jx