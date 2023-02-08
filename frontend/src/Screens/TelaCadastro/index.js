import { ErrorMessage, Field, Form, Formik, } from 'formik'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import api from '../../api';
import './styles.scss'

const initialValues = { username: '', email: '', password: '', confirmPassword: '', phone: '', }

const validationSchema = Yup.object({
    username: Yup.string().required('Required').min(6, 'Username must be 6 characteres'),
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().required('Please provide a valid password').min(8, 'Password is too short - should be 8 chars minimum.').matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
})


const TelaCadastro = ({ errors }) => {

    const navigate = useNavigate()

    return (
        <>
            <h2 className='form-title'>Create Account</h2>
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
                                    toast.success(<div>Conta criada com sucesso</div>)

                                    // console.log(response.data)
                                    resetForm({})
                                    setSubmitting(false)
                                    navigate('/login')
                                    return
                                }
                            })
                            .catch(error => {
                                console.log(error.response)
                                if (error.response.status === 500) {
                                    toast.error(<div>Username already registred</div>, {
                                        position: "top-right",
                                        autoClose: 2500,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                        theme: "colored",
                                    });
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
                        <Form className='form'>
                            <div className='form-icon'>
                                <i className='fa fa-user-plus'></i>
                            </div>
                            <div className='form-inputs'>
                                <Field
                                    name='username'
                                    placeholder='Username'
                                    className='input'
                                />
                                <ErrorMessage
                                    name='username'
                                    component='div'
                                    className='error'
                                    style={{ color: 'red', fontSize: '15px', }}
                                />
                                <Field
                                    name='email'
                                    placeholder='Email'
                                    className='input'
                                />
                                <ErrorMessage
                                    name='email'
                                    component='div'
                                    className='error'
                                    style={{ color: 'red', fontSize: '15px', }}
                                />
                                <Field
                                    name='password'
                                    placeholder='Password'
                                    type='password'
                                    className='input'
                                />
                                <ErrorMessage
                                    name='password'
                                    component='div'
                                    className='error'
                                    style={{ color: 'red', fontSize: '15px', }}
                                />
                                <Field
                                    name='confirmPassword'
                                    placeholder='Confirm Password'
                                    type='password'
                                    className='input'
                                />
                            </div>
                            <div className='form-actions'>
                                <button className='buttonRegisterUser' type='submit' disabled={isSubmitting}>
                                    Register
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div >
        </>
    )
}

export default TelaCadastro