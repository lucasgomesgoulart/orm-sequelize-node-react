import React, { useEffect, useState, } from 'react'
import { Button, Form, Input, Modal } from 'antd'
import api from '../../api'
const Swal = require('sweetalert2')

function ModalUser({ value, set, record, findAllUsers }) {

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


    const { name, email, phone, id } = record

    const [inputName, setInputName] = useState(name)
    const [inputPhone, setInputPhone] = useState(phone)
    const [inputEmail, setInputEmail] = useState(email)


    const showModal = () => {
        set(true)
        setInputEmail(email)
        setInputName(name)
        setInputPhone(phone)
    }

    const closeModal = () => {
        set(false)
    }

    useEffect(() => {
        if (value) {
            showModal()
        }
    }, [value])

    const handleForm = async (id) => {
        try {

            await api.put(`/users/${id}`, {
                name: inputName,
                email: inputEmail,
                phone: inputPhone
            })
            findAllUsers()
            closeModal()
        } catch (error) {
            if (error.response.status === 404) {
                Toast.fire({
                    icon: 'error',
                    title: 'User not found'
                })
            }
            if (error.response.status === 422) {
                Toast.fire({
                    icon: 'error',
                    title: 'Invalid phone number'
                })
            }
            if (error.response.status === 500) {
                Toast.fire({
                    icon: 'error',
                    title: 'Internal server error, try again later please'
                })
            }
            console.log(error)
            alert({ error })
        }
    }

    return (
        <div>
            <Modal
                open={value}
                onCancel={() => { set(false) }}
                footer={null}
                title={`Editing User: ${name}`}
                width={600}
            >
                <Form onFinish={() => { handleForm(id) }}>
                    <Form.Item label='Name' >
                        <Input placeholder='Exemple: Jhon Cena' name='name' value={inputName} onChange={(e) => { setInputName(e.target.value) }} />
                    </Form.Item>
                    <Form.Item label='Email' >
                        <Input placeholder='Exemple: jhon@example.com' name='email' value={inputEmail} onChange={(e) => { setInputEmail(e.target.value) }} />
                    </Form.Item>

                    <Form.Item label='Phone'>
                        <Input placeholder='Exemple: 12345678911' name='phone' value={inputPhone} onChange={(e) => { setInputPhone(e.target.value) }} />
                    </Form.Item>

                    <Button type='primary' htmlType='submit'>Submit</Button>
                </Form >
            </Modal>

        </div>
    )
}

export default ModalUser