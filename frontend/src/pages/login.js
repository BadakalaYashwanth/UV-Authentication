import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';

function Login() {

    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        const copyLoginInfo = { ...loginInfo };
        copyLoginInfo[name] = value;
        setLoginInfo(copyLoginInfo);
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = loginInfo;
        if (!email || !password) {
            return handleError('email and password are required')
        }
        try {
            const url = `${process.env.REACT_APP_API_URL || 'http://localhost:8080'}/auth/login`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginInfo),
            });
            const result = await response.json();
            const { success, message, error, jwtToken, name } = result;
            if (success) {
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('loggedInUser', name);
                handleSuccess(message);
                setTimeout(() => {
                    navigate('/home')
                }, 1000)
            } else if (error) {
                const details = error?.details[0].message;
                handleError(details);
            } else if (!success) {
                handleError(message);
            }
            console.log(result);
        } catch (err) {
            handleError(err);
        }
    }
    return (
        <div className="auth-page-wrapper">
            <header className="auth-header">
                <img src="/images/Uvnetware.png" alt="NetWare Logo" className="brand-logo" />
            </header>
            <main className="auth-main">
                <div className='container'>
                    <h1>Login</h1>
                    <form onSubmit={handleLogin}>
                        <div>
                            <label htmlFor='email'>Email</label>
                            <input
                                onChange={handleChange}
                                type='email'
                                name='email'
                                placeholder='Enter your email'
                                value={loginInfo.email}
                                autoFocus
                            />
                        </div>
                        <div>
                            <label htmlFor='password'>Password</label>
                            <input
                                onChange={handleChange}
                                type='password'
                                name='password'
                                placeholder='Enter your password'
                                value={loginInfo.password}
                            />
                        </div>
                        <button type='submit'>Login</button>
                        <span>Don't have an account ?
                            <Link to="/signup"> Signup</Link>
                        </span>
                    </form>
                    <ToastContainer />
                </div>
            </main>
        </div>
    )
}

export default Login