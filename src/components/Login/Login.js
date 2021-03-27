import GTranslateIcon from '@material-ui/icons/GTranslate';
import React, { useContext, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { userContext } from '../../App';
import { getTokenId, googleSignIn } from './authManager';
import './Login.css';

const Login = () => {

    const [, setUser] = useContext(userContext);

    const [loginError, setLoginError] =useState('');

    const history = useHistory();
    const location = useLocation();

    const { from } = location.state || { from: { pathname: "/" } };

    const getToken = () => {
        getTokenId()
        .then(idToken=>{
            sessionStorage.setItem('userToken', idToken);
            history.replace(from);
        })
    }

    const updateState = res => {
        if (res.email) {
            setUser(res);
            getToken();
        }
        else{
            setLoginError(res.message);
        }
    }

    const SignInWithProvider = (provider) => {
        provider()
        .then(res => {
            updateState(res);
        })
    }

    return (
        <div className='icons'>
            <GTranslateIcon onClick={() =>SignInWithProvider(googleSignIn)} color="primary" fontSize="large" />
            <p>{loginError}</p>
        </div>
    );
};

export default Login;