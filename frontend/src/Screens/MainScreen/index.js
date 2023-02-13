import React, { useContext, useEffect, useState } from 'react'
import api from '../../api'
import CardDash from '../../components/Card';
import { Context } from '../../components/Context/AuthContext'
import { useNavigate } from 'react-router-dom'

const MainScreen = () => {

    const { countUsersDeleted, authenticated } = useContext(Context)
    const navigate = useNavigate()
    const [dataUser, setDataUser] = useState();
    const [loading, setLoading] = useState(false)
    const [infoUser, setInfoUser] = useState({})
    const [lastUser, setLastUser] = useState(null)

    useEffect(() => {
        getDataUser()
        getUsersInfo()
    }, [])

    const getDataUser = async () => {
        const admin_id = localStorage.getItem('admin_id')
        setLoading(true)
        try {
            const data = await api.get(`/getAdmin/${admin_id}`)
            setDataUser(data.data.adminFound.admin_username)
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }
    async function getUsersInfo() {
        try {
            const response = await api.get(`/users`)
            setInfoUser(response.data.length)
            setLastUser(response.data[response.data.length - 1])
        } catch (error) {
            console.log(error)
        }
    }




    return (
        <>
            {authenticated ?
                <>
                    <h1 style={{
                        fontSize: '30px',
                        paddingBottom: '40px',
                        borderBottom: '1px solid black'
                    }}>
                        {`Welcome, ${dataUser ? dataUser.charAt(0).toUpperCase() + dataUser.slice(1) : ''}`}
                    </h1>

                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-around',
                    }}>
                        <CardDash CardTitle={infoUser ? `Total registered users: ${infoUser}` : 'Sem informação de usuários'} />
                        <CardDash CardTitle={lastUser ? `Total deleted users: ${countUsersDeleted}` : 'Loading...'} />
                        <CardDash CardTitle={lastUser ? `Last user registred: ${lastUser.name}` : 'Loading...'} />
                    </div>
                </> : navigate('/unauthorizaded')}
        </>
    );
};

export default MainScreen;
