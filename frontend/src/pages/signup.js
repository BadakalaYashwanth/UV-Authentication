import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';

function Signup() {

    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    // Validation Regex Rules
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const validateEmail = (email) => {
        if (!email) return "Email is required.";
        if (!emailRegex.test(email)) return "Invalid email format. Please enter a valid email address";
        return "";
    };

    const validatePassword = (password) => {
        if (!password) return "Password is required.";
        if (!passwordRegex.test(password)) {
            return "Password does not meet the specified guidelines.";
        }
        return "";
    };

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignupInfo({ ...signupInfo, [name]: value });

        // Dynamically provide validation feedback as user types if field previously touched
        if (touched[name]) {
            let errorMsg = "";
            if (name === 'email') errorMsg = validateEmail(value);
            if (name === 'password') errorMsg = validatePassword(value);
            setErrors(prev => ({ ...prev, [name]: errorMsg }));
        }
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));

        let errorMsg = "";
        if (name === 'email') errorMsg = validateEmail(value);
        if (name === 'password') errorMsg = validatePassword(value);

        setErrors(prev => ({ ...prev, [name]: errorMsg }));
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        const { name, email, password } = signupInfo;

        const emailError = validateEmail(email);
        const passwordError = validatePassword(password);

        setTouched({ name: true, email: true, password: true });
        setErrors({ email: emailError, password: passwordError });

        if (!name || emailError || passwordError) {
            if (!name) handleError('Name is required');
            return;
        }
        try {
            const url = `${process.env.REACT_APP_API_URL || 'http://localhost:8080'}/auth/signup`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signupInfo)
            });
            const result = await response.json();
            const { success, message, error } = result;
            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate('/login')
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
        <>
            <div className='brand-logo'>
                <img src="/images/Uvnetware.png" alt="NetWare Logo" />
            </div>
            <div className='container'>
                <h1>Signup</h1>
                <form onSubmit={handleSignup}>
                    <div>
                        <label htmlFor='name'>Name</label>
                        <input
                            onChange={handleChange}
                            type='text'
                            name='name'
                            autoFocus
                            placeholder='Enter your name'
                            value={signupInfo.name}
                        />
                    </div>
                    <div>
                        <label htmlFor='email'>Email</label>
                        <input
                            onChange={handleChange}
                            onBlur={handleBlur}
                            type='email'
                            name='email'
                            placeholder='Enter your email'
                            value={signupInfo.email}
                            className={touched.email ? (errors.email ? 'input-error' : 'input-success') : ''}
                        />
                        {touched.email && errors.email && (
                            <p className="error-text" style={{ textAlign: "left" }}>{errors.email}</p>
                        )}
                    </div>
                    <div>
                        <label htmlFor='password'>Password</label>
                        <input
                            onChange={handleChange}
                            onBlur={handleBlur}
                            type='password'
                            name='password'
                            placeholder='Enter your password'
                            value={signupInfo.password}
                            className={touched.password ? (errors.password ? 'input-error' : 'input-success') : ''}
                        />
                        {touched.password && errors.password ? (
                            <p className="error-text" style={{ textAlign: "left" }}>{errors.password}</p>
                        ) : null}
                        {(!touched.password || errors.password) && (
                            <p className="helper-text" style={{ textAlign: "left" }}>
                                Password rules: Min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special character.
                            </p>
                        )}
                        {touched.password && !errors.password && signupInfo.password && (
                            <p className="helper-text success" style={{ textAlign: "left" }}>✓ Password secure</p>
                        )}
                    </div>
                    <button type='submit'>Signup</button>
                    <span>Already have an account ?
                        <Link to="/login"> Login</Link>
                    </span>
                </form>
                <ToastContainer />
            </div>
        </>
    )
}

export default Signup