import React, { useEffect, } from 'react'
import { Button, Form, Input, Modal } from 'antd'


function ModalUser({ value, set }) {

    const showModal = () => {
        set(true)
    }

    const closeModal = () => {
        // set(false)
    }

    useEffect(() => {
        if (value) {
            showModal()
        }
    }, [value])

    return (
        <div>
            <Modal
                open={value}
                onOk={() => { set(false) }}
                onCancel={() => { set(false) }}
            >
                <Form>
                    <Form.Item label='Name' >
                        <Input placeholder='Exemple: Jhon Cena' name='name' />
                    </Form.Item>
                    <Form.Item label='Email' >
                        <Input placeholder='Exemple: jhon@example.com' name='email' />
                    </Form.Item>

                    <Form.Item label='Phone'>
                        <Input placeholder='Exemple: 12345678911' name='phone' />
                    </Form.Item>

                    <Button type='primary' htmlType='submit'>Submit</Button>
                </Form >
            </Modal>

        </div>
    )
}

export default ModalUser