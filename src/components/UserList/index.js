import React, { useEffect, useState } from 'react'
import { Table } from 'antd'
import api from '../../api'

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
    render: (text) => text ? "Sim" : "Não"
  },
  {
    title: 'User adm',
    dataIndex: 'adm_user',
    key: 'adm_user',
    render: (text) => text ? "Sim" : "Não"
  },
  {
    title: 'Created At',
    dataIndex: 'createdAt',
    key: 'createdat'
  },
  {
    title: 'Updated At',
    dataIndex: 'updatedAt',
    key: 'updatedat'
  },
  {

  },
  {

  }

]


const UserList = () => {
  const [dataSource, setDataSource] = useState([])
  console.log(dataSource)

  const findAllUsers = () => {
    api.get(`/users`).then((response) => {
      // console.log(response)
      setDataSource(response.data)
    })
  }

  useEffect(() => {
    findAllUsers()
  }, [])

  return (
    <div>
      <Table columns={columns} dataSource={dataSource} rowKey={record => record.id}>
      </Table>
    </div>
  )
}

export default UserList