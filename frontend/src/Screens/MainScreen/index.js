import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import CardDash from '../../components/Card';
import { Context } from '../../components/Context/AuthContext';

const MainScreen = () => {
    const { authenticated } = useContext(Context);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        user: null,
        countUsers: null,
        lastUser: null,
        deletedUser: null,
    });

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const admin_id = localStorage.getItem('admin_id');
                const { data: adminFound } = await api.get(`/getAdmin/${admin_id}`);
                const { data: users } = await api.get('/users');
                const { data: countDeletedUsers } = await api.get('/getCountDeletedUsers');
                console.log(data)
                setData({
                    user: adminFound.adminFound.admin_username,
                    countUsers: users.length,
                    lastUser: users[users.length - 1],
                    deletedUser: countDeletedUsers.countUsersDeleted,
                });
                setLoading(false);
            } catch (error) {
                console.log(error);
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
                Welcome, <span style={{ color: 'red' }}>{data.user ? data.user.charAt(0).toUpperCase() + data.user.slice(1) : ''}</span>
            </h1>

            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <CardDash
                    CardTitle={
                        loading ? 'Loading...' : (
                            <>
                                Total registered users:
                                {' '}
                                <span style={{ color: 'red' }}>{data.countUsers}</span>
                            </>
                        )
                    }
                />

                <CardDash
                    CardTitle={
                        loading ? 'Loading...' : (
                            <>
                                Total deleted users:
                                {' '}
                                <span style={{ color: 'red' }}>{data.deletedUser}</span>
                            </>
                        )
                    }
                />

                <CardDash
                    CardTitle={
                        loading ? 'Loading...' : (
                            <>
                                Last user registred:
                                {' '}
                                <span style={{ color: 'red' }}>{data.lastUser.name}</span>
                            </>
                        )
                    }
                />
            </div>
        </>
    );
};

export default MainScreen;
