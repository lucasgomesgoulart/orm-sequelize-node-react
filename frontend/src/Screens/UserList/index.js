import React, { useEffect, useState, useContext } from 'react'
import { Table, Spin, Modal } from 'antd'
import api from '../../api'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { format } from 'date-fns'
import './styles.css'
import ModalUser from '../ModalUser'
import Swal from 'sweetalert2'

const UserList = () => {
  const [loading, setLoading] = useState(true)
  const [dataSource, setDataSource] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [record, setRecord] = useState({})
  const [filterInput, setFilterInput] = useState('')


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

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone'
    },
    {
      title: 'Active',
      dataIndex: 'active',
      key: 'active',
      render: (text) => text ? "Yes" : "No"
    },
    {
      title: 'User adm',
      dataIndex: 'adm_user',
      key: 'adm_user',
      render: (text) => text ? "Yes" : "No"
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdat',
      render: (text) => format(new Date(text), 'dd/MM/yyyy  -  HH:mm:ss')
    },
    {
      title: 'Updated At',
      dataIndex: 'updatedAt',
      key: 'updatedat',
      render: (text) => format(new Date(text), 'dd/MM/yyyy  -  HH:mm:ss')
    },
    {
      title: 'Actions',
      key: 'action',
      render: (record) => {
        return <>
          <EditOutlined onClick={() => openModal(record)} style={{ color: 'blue', marginRight: '25px', fontSize: 18 }} />
          <DeleteOutlined onClick={() => deleteUser(record)} style={{ color: 'red', fontSize: 18 }} />
        </>
      }
    },
  ]



  const openModal = (record) => {
    setIsModalOpen(true)
    setRecord(record)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const deleteUser = async (record) => {
    Modal.confirm({
      title: 'This action is irreversible',
      content: `Are you sure you want to delete the user: ${record.name}`,
      okText: 'Yes',
      cancelText: 'No',
      width: 500,
      onOk: async () => {
        try {
          await api.delete(`/users/${record.id}`)
        } catch (error) {
        } finally {
          Toast.fire({
            icon: 'success',
            title: `${record.name} deleted!`
          })
          setLoading(false)
          closeModal()
          findAllUsers()

        }
      }
    })
  }

  const findAllUsers = async (req) => {
    try {
      setLoading(true)
      const response = await api.get(`/users`)
      setDataSource(response.data)
      // console.log(dataSource)
    } catch (error) {
      if (error.request.status === 401) {
        Toast.fire({
          icon: 'error',
          title: `Please login first`
        })
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    findAllUsers()
  }, [])


  return (
    <>
      {loading ? (
        <div>
          <Spin size='large' />
        </div>
      ) : (
        <div style={{ alignItems: 'center' }}>
          <input
            style={{
              padding: '8px 16px',
              borderRadius: 4,
              border: '1px solid #d9d9d9',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
              outline: 'none',
              width: '100%',
              marginBottom: '20px',
            }}
            placeholder='Find user by name'
            value={filterInput}
            onChange={(e) => {
              const text = e.target.value
              setFilterInput(text)
              setDataSource(text ? dataSource.filter(item => item.name.includes(text)) : findAllUsers())
            }}
          />
          <Table
            columns={columns}
            dataSource={dataSource}
            rowKey={record => record.id}
            rowClassName={(record, index) => index % 2 === 0 ? 'even-row' : 'odd-row'}
          />
        </div>
      )}
      <ModalUser value={isModalOpen} set={setIsModalOpen} record={record} findAllUsers={findAllUsers} />
    </>
  )
}

export default UserList