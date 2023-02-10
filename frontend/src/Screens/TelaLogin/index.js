import { Field, Form, Formik } from 'formik'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './style.scss'
import api from '../../api'
import { Context } from '../../components/Context/AuthContext'
import logo from './assets/logo-circular.png';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import FooterCardLogin from '../../components/FooterCardLogin';

const TelaLogin = () => {

    const navigate = useNavigate()
    const { authenticated, setAuthenticated, admin_id, setAdmin_id } = useContext(Context)

    const alertUser = () => {
        toast.warning('Functionality temporarily unavailable')
    }

    return (
        <Formik className='form-login'
            initialValues={{ admin_username: '', admin_password: '' }}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
                try {
                    const response = await api.post('/login', {
                        admin_username: values.admin_username,
                        admin_password: values.admin_password,
                    });
                    if (response.status === 200) {
                        localStorage.setItem('token', response.data.userLogged.token);
                        localStorage.setItem('admin_id', response.data.userLogged.admin_id);
                        // navigate('/home');
                        setAuthenticated(true);
                        toast.success("Logged in Successfully!");
                        resetForm();
                    }
                } catch (err) {
                    console.log(err);
                    resetForm();
                    toast.error(<div>Wrong username or password</div>, {
                        position: "top-right",
                        autoClose: 2500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                }
            }}
        >


            <div className='container-login'>

                <Form className='formm'>
                    <img src={logo} alt='logo' style={{ width: '20%' }} />
                    <h1>Welcome!</h1>
                    <div className='form-container'>
                        <Field type="text" placeholder="Username" name="admin_username" className='inputForm' />
                        <Field type="password" placeholder="Password" name="admin_password" className='inputForm' />
                    </div>
                    <div>
                        <button type='submit' className='buttonSubimt'>Login</button>
                    </div>

                    <div>
                        <p
                            style={{
                                cursor: 'pointer',
                                paddingTop: '15px'

                            }}
                            onClick={() => { navigate('/TelaCadastro') }}
                        >
                            Create a account
                        </p>
                    </div>
                    <FooterCardLogin alertUser={alertUser} />
                </Form>
            </div >
        </Formik >
    )
}

export default TelaLogin