import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import CardDash from '../../components/Card';
import { Context } from '../../components/Context/AuthContext';

const MainScreen = () => {
    const { authenticated } = useContext(Context);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const admin_id = localStorage.getItem('admin_id');
                const [adminFound, users, countDeletedUsers] = await Promise.all([
                    api.get(`/getAdmin/${admin_id}`).then(res => res.data),
                    api.get('/users').then(res => res.data),
                    api.get('/getCountDeletedUsers').then(res => res.data),
                ]);
                setData({
                    user: adminFound.adminFound.admin_username,
                    countUsers: users.length,
                    lastUser: users.length > 0 ? users[users.length - 1].name : null,
                    deletedUser: countDeletedUsers.countUsersDeleted,
                });
                setLoading(false);
            } catch (error) {
                console.log(error);
                setError('An error occurred while fetching data.');
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    if (!authenticated) {
        navigate('/unauthorizaded');
        return null;
    }

    return (
        <>
            <h1 style={{ fontSize: '30px', paddingBottom: '40px', borderBottom: '1px solid black' }}>
                Welcome, <span style={{ color: 'red' }}>{data && data.user ? data.user.charAt(0).toUpperCase() + data.user.slice(1) : ''}</span>
            </h1>

            {error ? (
                <p style={{ color: 'red' }}>{error}</p>
            ) : (
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <CardDash
                        CardTitle={
                            loading ? 'Loading...' : (
                                <>
                                    Total registered users:
                                    <span style={{ color: 'red' }}>
                                        <span>
                                            {' '}
                                        </span>
                                        {data.countUsers ? data.countUsers : '0'}
                                    </span>
                                </>
                            )
                        }
                    />

                    <CardDash
                        CardTitle={
                            loading ? 'Loading...' : (
                                <>
                                    Total deleted users:
                                    <span style={{ color: 'red' }}>
                                        <span>
                                            {' '}
                                        </span>
                                        {data.deletedUser ? data.deletedUser : '0'}
                                    </span>
                                </>
                            )
                        }
                    />

                    <CardDash
                        CardTitle={
                            loading ? 'Loading...' : (
                                <>
                                    Last user registred:
                                    <span style={{ color: 'red' }}>
                                        <span>
                                            {' '}
                                        </span>
                                        {data.lastUser ? data.lastUser : '...'}
                                    </span>
                                </>
                            )
                        }
                    />
                </div>
            )}
        </>
    );
};

export default MainScreen;
