import React from 'react';
import { getUser, resetUserSession } from './service/AuthService';


const PremiumContent = (props) => {
    const user = getUser();
    const name = user !== 'undefined' && user ? user.name : '';
    const logoutHandler = () => {
        resetUserSession();
        props.history.push('/login');
    }
    return (
        <div>
        <p>
            Hello <strong>{name}</strong> ! You have been logged in!!! Welcome to the premium content. <br />
            This is the premium content page, which is available for logged in users.
        </p>
        <input type="button" value="Logout" onClick={logoutHandler} />
        </div>
    )
}

export default PremiumContent;