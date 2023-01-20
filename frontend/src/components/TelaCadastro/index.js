import { ErrorMessage, Field, Form, Formik, } from 'formik'
import React from 'react'
import * as Yup from 'yup';
import api from '../../api';


const initialValues = { username: '', email: '', password: '', confirmPassword: '', phone: '', }
const validationSchema = Yup.object({
    username: Yup.string().required('Required').min(6, 'Username must be 6 characteres'),
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().required('Please provide a valid password').min(8, 'Password is too short - should be 8 chars minimum.').matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
})

const telaLogin = ({ errors }) => {

    return (
        <div className='container' >
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={async (values, { setSubmitting, resetForm }) => {

                    await api.post('/register', {
                        admin_username: values.username,
                        admin_password: values.password,
                        admin_email: values.email,
                    })
                        .then(response => {
                            console.log(response)
                            if (response.status === 201) {
                                console.log(response.data)
                                resetForm({})
                                setSubmitting(false)
                                return
                            }
                        })
                        .catch(error => {
                            console.log(error.response)
                            if (error.response.status === 500) {
                                alert('Email or username already exist')
                                resetForm({})
                                setSubmitting(false)
                                return
                            } else {
                                console.log(error)
                            }
                            setSubmitting(false)
                        })
                }}
            >

                {({ isSubmitting, errors }) => (
                    <Form>
                        <div className='container-form'>

                            <Field name="username" placeholder="Username" />
                            <ErrorMessage name="username" component="div" style={{ color: 'red', fontSize: '18px', marginLeft: '20px' }} />

                            <Field name="email" placeholder="Email" />
                            <ErrorMessage name="email" component="div" style={{ color: 'red', fontSize: '18px', marginLeft: '20px' }} />

                            <Field name="password" placeholder="password" type="password" />
                            <ErrorMessage name="password" component="div" style={{ color: 'red', fontSize: '18px', marginLeft: '20px' }} />
                            <Field name="confirmPassword" placeholder="Confirm your password" type="password" />

                        </div>
                        <div>
                            <button type='submit' disabled={isSubmitting}>Register</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div >
    )
}

export default telaLogin