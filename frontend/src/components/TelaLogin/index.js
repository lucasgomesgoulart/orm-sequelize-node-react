import { Field, Form, Formik } from 'formik'
import React from 'react'
import './style.css'
import api from '../../api'

export default function telaLogin() {

    return (
        <Formik
            initialValues={{ username: '', password: '' }}
            onSubmit={
                async (values) => {
                    try {
                        const response = await api.post('/login', {
                            admin_username: values.admin_username,
                            admin_password: values.admin_password
                        })
                        if(response.status === 200) {
                            localStorage.setItem('token', response.data.userLogged.token)
                            console.log(response.data.token)
                        }
                    } catch (err) {
                        console.log(err)
                    }
                }
            }
        >
            <div className='container-login'>
                <div className='title-container'>
                    <h1>Welcome!</h1>
                </div>
                <Form>
                    <div className='form-container'>
                        <Field type="text" placeholder="Username" name="admin_username" />
                        <Field type="password" placeholder="Password" name="admin_password" />
                    </div>
                    <div>
                        <button type='submit'>Login</button>
                    </div>

                    <div>
                        <p>Create a account</p>
                    </div>
                </Form>
            </div >
        </Formik>
    )
}


