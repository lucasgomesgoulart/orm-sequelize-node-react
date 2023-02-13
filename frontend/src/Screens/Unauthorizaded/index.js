import React from 'react'
import { Link } from 'react-router-dom'

const UnauthorizedPage = () => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            flexDirection: 'column'
        }}>
            <h1 style={{
                fontSize: '50px',
                color: 'red'
            }}
            >
                Unauthorized
            </h1>
            <h2 style={{
                fontSize: '30px',
                color: 'gray',
                marginBottom: '30px'
            }}
            >
                You are not authorized to access this page
            </h2>
            <Link to='/login' style={{
                backgroundColor: 'blue',
                color: 'white',
                padding: '10px 20px',
                borderRadius: '5px',
                textDecoration: 'none'
            }}
            >
                Login
            </Link>
        </div>
    );
};

export default UnauthorizedPage;