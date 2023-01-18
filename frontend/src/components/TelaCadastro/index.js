import { Field, Formik } from 'formik'
import React from 'react'


export default function telaLogin() {

    return (
        <div className='container'>
            <Formik initialValues={{
                username: '',
                email: '',
                password: '',
                confirmPassword: ''
            }}>
                <form>
                    <div className='container-form'>
                        <Field name="username" placeholder="Username" />
                        <Field name="email" placeholder="Email" />
                        <Field name="password" placeholder="password" />
                        <Field name="ConfirmPassword" placeholder="Confirm your password" />
                    </div>
                    <div>
                        <button>Register</button>
                    </div>
                </form>
            </Formik>
        </div>
    )
}