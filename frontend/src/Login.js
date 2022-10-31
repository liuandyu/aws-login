import React, { useState } from 'react';
import axios from 'axios';
import { setUserSession } from './service/AuthService';

const loginUrl = 'https://m0z4y5aa2g.execute-api.us-west-2.amazonaws.com/prod/login';

const Login = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(null);

    const submitHandler = (event) => {
        event.preventDefault();
        
        if(username.trim() === '' || password.trim() === ''){
            setMessage('All fields are required');
            return;
        }
        setMessage(null);
        console.log("submit button is pressed");
        const requestConfig = {
            headers: {
                'x-api-key': 'jAyp5BfgRr4nMUxHqFmGX6xlefGnO8XYa5VIK4Jx',
            }
        }
        const requestBody = {
            username: username,
            password: password
        }

        axios.post(loginUrl, requestBody, requestConfig).then((response)=> {
            setUserSession(response.data.user, response.data.token);
            props.history.push('/premium-content');
        }).catch((error) => {
            if(error.response.status === 401 || error.response.status === 403) {
                setMessage(error.response.data.message);
            } else {
                setMessage('sorry... the backend server is down.')
            }
        }) 
    }

    return (
        <div>
        <form onSubmit={submitHandler}>
        <h5>Login</h5>
        Username: <input type="text" value={username} onChange={event => setUsername(event.target.value)} /> <br />
        Password: <input type="password" value={password} onChange={event => setPassword(event.target.value)} /> <br />
        <input type="submit" value="Login" />
        </form>
        {message && <p className="message">{message}</p>}
        </div>
    )
}

export default Login;