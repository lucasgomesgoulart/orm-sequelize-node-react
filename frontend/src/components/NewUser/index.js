import { React, useState, useRef, useEffect } from 'react'
import { Button, Form, Input, Modal, } from 'antd';
import api from '../../api'


const NewUser = () => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const regexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  const inputRef = useRef(null)

  const focusInput = () => {
    inputRef.current.focus()
  }

  useEffect(() => {
    focusInput()
  }, [])

  const onFinish = async () => {
    console.log(name.split(' ').length)
    console.log(regexp.test(email));
    if (name.split(' ').length >= 2 && regexp.test(email)) {
      Modal.confirm({
        title: 'Register?',
        okText: 'Register',
        cancelText: 'Cancel',
        onOk: async () => {
          try {
            await api.post('/users', {
              name: name,
              email: email,
              phone: phone,
              adm_user: false,
              active: true
            })
            setName('')
            setPhone('')
            setEmail('')
          } catch (error) {
            console.log(error)
          }
        }
      })
    } else {
      alert('Ops, something is wrong...')
    }
  }
  return (
    <Form onFinish={onFinish} >
      <Form.Item label='Name' >
        <Input ref={inputRef} placeholder='Exemple: Jhon Cena' name='name' onChange={(e) => { setName(e.target.value) }} value={name} />
      </Form.Item>
      <Form.Item label='Email' >
        <Input placeholder='Exemple: jhon@example.com' name='email' onChange={(e) => { setEmail(e.target.value) }} value={email} />
      </Form.Item>

      <Form.Item label='Phone'>
        <Input placeholder='Exemple: 12345678911' name='phone' onChange={(e) => { setPhone(e.target.value) }} value={phone} />
      </Form.Item>

      <Button type='primary' htmlType='submit'>Submit</Button>
    </Form >
  )
}

export default NewUser