import React, { useState } from 'react';
import axios from 'axios';

const registerUrl = 'https://m0z4y5aa2g.execute-api.us-west-2.amazonaws.com/prod/register';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(null);

    const submitHanlder = (event) => {
        event.preventDefault();
        if(username.trim() === '' || email.trim() === ''|| name.trim() === '' || password.trim() === ''){
            setMessage('All fields are required')
        }
        setMessage(null);
        //console.log("submit button is pressed");
        const requestConfig = {
            headers: {
                'x-api-key': 'jAyp5BfgRr4nMUxHqFmGX6xlefGnO8XYa5VIK4Jx',
            }
        }
        const requestBody = {
            username: username,
            email: email,
            name: name,
            password: password
        }

        axios.post(registerUrl, requestBody, requestConfig).then(response => {
            setMessage('Registration Successful')
        }).catch(error => {
            if(error.response.status === 401) {
                setMessage(error.response.data.message);
            } else {
                setMessage("sorry ... backend server is donw!! please try again later");
            }
        })
    }

    return (
        <div>
            <form onSubmit={submitHanlder}>
            <h5>Register</h5>
            Name: <input type="text" value={name} onChange={event => setName(event.target.value)} /> <br/>
            Email: <input type="text" value={email} onChange={event => setEmail(event.target.value)} /><br/>
            Username: <input type="text" value={username} onChange={event => setUsername(event.target.value)} /><br/>
            Password: <input type="password" value={password} onChange={event => setPassword(event.target.value)} /><br/>

            <input type="submit" value="Register" />
            </form>
            {message && <p className="message">{message}</p>}
        </div>
    )
}

export default Register;