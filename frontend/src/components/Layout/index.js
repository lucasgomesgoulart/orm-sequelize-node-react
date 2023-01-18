import React from 'react';
import { TeamOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import UserList from '../UserList';
import NewUser from '../NewUser';
import { Link, Route, Routes } from 'react-router-dom';
import TelaLogin from '../TelaLogin'
import TelaCadastro from '../TelaCadastro'


const { Header, Content, Footer, Sider } = Layout;
const items = [
    {
        label: 'Login',
        key: '/login',
    },
    {
        label: "Administração",
        key: 'administration',
        icon: <UserOutlined />,
        children: [
            {
                label: "Cadastrar usuários",
                key: '/newuser',
                icon: <TeamOutlined />
            },
            {
                label: "Listar usuários",
                key: '/listusers',
                icon: <UserOutlined />,
            },
        ]
    }
]

const App = () => {
    const { token: { colorBgContainer }, } = theme.useToken();
    return (
        <Layout hasSider>
            <Sider style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0, }}>
                <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)', }} />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['/login']}>
                    <Menu.Item key='/login' icon={<UserOutlined />}>
                        <Link to='/login'>Login</Link>
                    </Menu.Item>
                    <Menu.SubMenu key={items[1].key} title={items[1].label} icon={items[1].icon}>
                        {items[1].children && items[1].children.map(child => (
                            <Menu.Item key={child.key} icon={child.icon}>
                                <Link to={child.key}>{child.label}</Link>
                            </Menu.Item>
                        ))}
                    </Menu.SubMenu>
                    <Menu.Item key='/TelaCadastro' icon={<UserOutlined />} style={{ marginTop: '520px' }}>
                        <Link to='/TelaCadastro'>Dont have accout?</Link>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout" style={{ marginLeft: 200, }}>
                <Header style={{ padding: 0, background: colorBgContainer, }} />
                <Content style={{ margin: '24px 16px 0', overflow: 'initial', }}>
                    <div style={{ padding: 24, textAlign: 'center', background: colorBgContainer }}>
                        <Routes>
                            <Route path='/' element={<TelaLogin />} />
                            <Route path='/login' element={<TelaLogin />} />
                            <Route path='/listusers' element={<UserList />} />
                            <Route path='/newuser' element={<NewUser />} />
                            <Route path='/telaCadastro' element={<TelaCadastro />} />
                        </Routes>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center', }}>
                    Lucas Goulart @2022
                </Footer>
            </Layout>
        </Layout>
    );
};
export default App;
