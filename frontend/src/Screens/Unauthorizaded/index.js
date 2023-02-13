import React from 'react'
import { Link } from 'react-router-dom'

const UnauthorizedPage = () => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '80vh',
            flexDirection: 'column'
        }}>
            <h1 style={{ fontSize: '50px', color: '#ff4c4f' }}>
                Unauthorized
            </h1>
            <h2 style={{ fontSize: '30px', color: 'gray', marginBottom: '30px' }}>
                You are not authorized to access this page
            </h2>
            <Link to='/login' style={{
                marginTop: '20px',
                width: '350px',
                padding: '10px',
                backgroundColor: '#1677ff',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                fontSize: '18px',
                cursor: 'pointer',
                transition: 'all 0.3s ease-in-out',
            }}>
                Login
            </Link>
        </div >
    );
};

export default UnauthorizedPage;