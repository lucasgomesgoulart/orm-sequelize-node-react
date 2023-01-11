import React, { useEffect, useState } from 'react'
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
          console.log(error)
        } finally {
          Toast.fire({
            icon: 'success',
            title: `${record.name}, delted!`
          })
          setLoading(false)
          findAllUsers()
        }
      }
    })
  }


  const findAllUsers = async () => {
    try {
      setLoading(true)
      const response = await api.get(`/users`)
      setDataSource(response.data)
      console.log(dataSource)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    findAllUsers()
  }, [])

  return (
    <div>
      {loading ? (
        <Spin size='large' />
      ) : (
        <Table
          columns={columns}
          dataSource={dataSource}
          rowKey={record => record.id}
          rowClassName={(record, index) => index % 2 === 0 ? 'even-row' : 'odd-row'}
        >
        </Table>
      )}
      <ModalUser value={isModalOpen} set={setIsModalOpen} record={record} findAllUsers={findAllUsers} />
    </div>
  )
}


export default UserList