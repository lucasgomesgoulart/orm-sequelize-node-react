import { Card } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../components/Context/AuthContext'
import api from '../../api'

const MainScreen = () => {

    const [dataUser, setDataUser] = useState({});
    const [loading, setLoading] = useState(false)

    const admin_id = localStorage.getItem('admin_id')


    useEffect(() => {
        getDataUser()
    }, [])


    const getDataUser = async () => {
        setLoading(true)
        try {
            const data = await api.get(`/getAdmin/${admin_id}`)
            console.log(data.data.adminFound)
            setDataUser(data.data.adminFound)
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    return (
        <>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <h1>{`Welcome, ${dataUser.admin_username ? dataUser.admin_username.charAt(0).toUpperCase() + dataUser.admin_username.slice(1) : ''}`}</h1>
            )}
        </>
    );
};

export default MainScreen;
