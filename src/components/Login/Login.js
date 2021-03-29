import React, { useContext, useState } from 'react';

import { UseContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import {
    createUserWithEmailAndPassword,
    handleFbSignIn,
    handleGoogleSignIn,
    handleSignOut,
    initializeLoginFramework,
    signInWithEmailAndPassword,
} from './LoginManager';

const Login = () => {
    const [newUser, setNewUser] = useState(false);

    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        password: '',
        photo: '',
        error: '',
        success: false,
    });

    initializeLoginFramework();

    const [loggendInUser, setLoggendInUser] = useContext(UseContext);
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: '/' } };

    const googleSignIn = () => {
        handleGoogleSignIn().then((res) => {
            handleResponse(res, true);
        });
    };

    const fbSignIn = () => {
        handleFbSignIn().then((res) => {
            handleResponse(res, true);
        });
    };

    const { isSignedIn, name, email, photo, success, error } = user;

    const handleBlur = (e) => {
        let isFromValid;

        if (e.target.name === 'name') {
            isFromValid = e.target.value;
        }

        if (e.target.name === 'email') {
            isFromValid = /\S+@\S+\.\S+/.test(e.target.value);
        }

        if (e.target.name === 'password') {
            const isPasswordValidByLength = e.target.value.length > 5;
            const isPasswordValid = /\d{1}/.test(e.target.value);
            isFromValid = isPasswordValidByLength && isPasswordValid;
        }

        if (isFromValid) {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newUser && user.email && user.password) {
            createUserWithEmailAndPassword(
                user.name,
                user.email,
                user.password
            ).then((res) => {
                handleResponse(res, true);
            });
        }

        if (!newUser && user.email && user.password) {
            signInWithEmailAndPassword(user.email, user.password).then(
                (res) => {
                    handleResponse(res, true);
                }
            );
        }
    };

    const signOut = () => {
        handleSignOut().then((res) => {
            handleResponse(res, false);
        });
    };

    const handleResponse = (res, redirect) => {
        setUser(res);
        setLoggendInUser(res);
        redirect && history.replace(from);
    };

    return (
        <div className="container" style={{ textAlign: 'center' }}>
            <button
                type="button"
                className="btn"
                onClick={isSignedIn ? signOut : googleSignIn}
            >
                {isSignedIn ? 'Sign Out' : 'Sign in'}
            </button>
            <br />
            <br />
            <button type="button" className="btn" onClick={fbSignIn}>
                Sign in Facebook
            </button>
            {isSignedIn && (
                <div>
                    <h1>Welcome to {name}</h1>
                    <p>Your Email: {email}</p>
                    <img src={photo} alt={name} />
                </div>
            )}

            <br />
            <br />

            <form className="From" onSubmit={handleSubmit}>
                <input
                    type="checkbox"
                    onChange={() => setNewUser(!newUser)}
                    name="newUser"
                />
                <label htmlFor="newUser">New user sign up</label>
                <br />
                {newUser && (
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter Your Name"
                        onBlur={handleBlur}
                        required
                    />
                )}
                <br />
                <input
                    type="email"
                    name="email"
                    placeholder="Enter Your Email"
                    onBlur={handleBlur}
                    required
                />
                <br />
                <input
                    type="password"
                    name="password"
                    placeholder="Enter Your Password"
                    onBlur={handleBlur}
                    required
                />
                <br />
                <input type="submit" className="btn" value="Submit" />
            </form>
            <p style={{ color: 'red' }}>{error}</p>
            {success && (
                <p style={{ color: 'green' }}>
                    User {newUser ? 'Created' : 'Login'} Successfully!
                </p>
            )}
        </div>
    );
};

export default Login;
