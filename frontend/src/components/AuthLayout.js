import React from 'react';
import './AuthLayout.css';

function AuthLayout({ children }) {
    return (
        <div className="auth-page-wrapper">
            <header className="auth-header">
                <div className='brand-logo-fixed'>
                    <img src="/images/Uvnetware.png" alt="NetWare Logo" />
                </div>
            </header>
            <main className="auth-main-content">
                <div className='auth-form-card'>
                    {children}
                </div>
            </main>
        </div>
    );
}

export default AuthLayout;
