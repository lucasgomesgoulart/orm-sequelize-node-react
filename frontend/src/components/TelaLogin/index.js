import { Field, Form, Formik } from 'formik'
import React, { useContext, useState } from 'react'
import './style.css'
import api from '../../api'
import { Context } from '../Context/AuthContext'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'



export default function TelaLogin() {

    const MySwal = withReactContent(Swal)

    const swall = () => {
        let timerInterval
        Swal.fire({
            timer: 500,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading()
                const b = Swal.getHtmlContainer().querySelector('b')
                timerInterval = setInterval(() => {
                    b.textContent = Swal.getTimerLeft()
                }, 100)
            },
            willClose: () => {
                clearInterval(timerInterval)
            }
        }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
                console.log('I was closed by the timer')
            }
        })
    }

    const { authenticated, setAuthenticated } = useContext(Context)

    console.log({ authenticated })

    return (
        <Formik
            initialValues={{ admin_username: '', admin_password: '' }}
            onSubmit={
                async (values, { setSubmitting, resetForm }) => {
                    try {
                        const response = await api.post('/login', {
                            admin_username: values.admin_username,
                            admin_password: values.admin_password
                        })
                        if (response.status === 200) {
                            localStorage.setItem('token', response.data.userLogged.token)
                            setAuthenticated(true)
                            swall()
                            resetForm()
                        }
                    } catch (err) {
                        console.log(err)
                        resetForm()
                        const Toast = Swal.mixin({
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 3000,
                            timerProgressBar: true,
                            didOpen: (toast) => {
                                toast.addEventListener('mouseenter', Swal.stopTimer)
                                toast.addEventListener('mouseleave', Swal.resumeTimer)
                            }
                        })

                        Toast.fire({
                            icon: 'error',
                            title: 'Wrong username or password'
                        })
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
        </Formik >
    )
}


