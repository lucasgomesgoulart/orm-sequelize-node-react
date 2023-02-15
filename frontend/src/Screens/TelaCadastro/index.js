import { ErrorMessage, Field, Form, Formik, } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import api from '../../api';
import { Spin } from 'antd'
import './styles.scss'


const initialValues = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
}

const validationSchema = Yup.object({
    username: Yup.string().required('Required').min(6, 'Username must be 6 characteres'),
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().required('Please provide a valid password').min(8, 'Password is too short - should be 8 chars minimum.').matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
})


const TelaCadastro = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    return (
        <>
            <h2 className='form-title'>Create Account</h2>
            <div className='container'>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={async (values, { setSubmitting, resetForm }) => {
                        setLoading(true)
                        try {
                            const response = await api.post('/register', {
                                admin_username: values.username,
                                admin_password: values.password,
                                admin_email: values.email,
                            });
                            if (response.status === 201) {
                                toast.success(<div>Account created successfully</div>);
                                resetForm({});
                                navigate('/login');
                            }
                        } catch (error) {
                            console.log(error.response);
                            if (error.response.status === 500) {
                                toast.error(
                                    <div>Username already registered</div>,
                                    {
                                        position: "top-right",
                                        autoClose: 2500,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                        theme: "colored",
                                    }
                                );
                            } else {
                                console.log(error);
                            }
                        }
                        setLoading(false);
                        setSubmitting(false);
                    }}
                >
                    {({ isSubmitting, errors }) => (
                        <Form className='form'>
                            {loading && <Spin />}
                            <div className='form-inputs'>
                                <Field name='username' placeholder='Username' className='input' />
                                <ErrorMessage
                                    name='username'
                                    component='div'
                                    className='error'
                                    style={{ color: 'red', fontSize: '15px' }}
                                />
                                <Field name='email' placeholder='Email' className='input' />
                                <ErrorMessage
                                    name='email'
                                    component='div'
                                    className='error'
                                    style={{ color: 'red', fontSize: '15px' }}
                                />
                                <Field name='password' placeholder='Password' type='password' className='input' />
                                <ErrorMessage
                                    name='password'
                                    component='div'
                                    className='error'
                                    style={{ color: 'red', fontSize: '15px' }}
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
            </div>
        </>
    );
};


export default TelaCadastro