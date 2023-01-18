import { Field, Formik } from 'formik'
import React from 'react'
import './style.css'

export default function telaLogin() {

    return (
        <Formik initialValues={{ username: '', password: '' }}>
            <div className='container-login'>
                <div className='title-container'>
                    <h1>Welcome!</h1>
                </div>
                <form>
                    <div className='form-container'>
                        <Field type="text" placeholder="Username" name="username" />
                        <Field type="password" placeholder="Password" name="password" />
                    </div>
                    <div>
                        <button>Login</button>
                    </div>

                    <div>
                        <p>Create a account</p>
                    </div>
                </form>
            </div >
        </Formik>
    )
}


