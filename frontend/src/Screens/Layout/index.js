import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TeamOutlined, UserOutlined, LogoutOutlined, BarChartOutlined, HomeOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import UserList from '../UserList';
import NewUser from '../NewUser';
import { Link, Route, Routes } from 'react-router-dom';
import TelaLogin from '../TelaLogin'
import TelaCadastro from '../TelaCadastro'
import { Context } from '../../components/Context/AuthContext'
import Reports from '../../Screens/Reports'
import Home from '../MainScreen/'
import Unauthorizaded from '../Unauthorizaded'

const { Header, Content, Footer, Sider } = Layout;
const items = [
    {
        label: 'Login',
        key: '/login',
    },
    {
        label: "Administration",
        key: 'administration',
        icon: <UserOutlined />,
        children: [
            {
                label: 'Home',
                key: 'home',
                icon: <HomeOutlined />
            },
            {
                label: "Register user",
                key: '/newuser',
                icon: <TeamOutlined />
            },
            {
                label: "List users",
                key: '/listusers',
                icon: <UserOutlined />,
            },
            {
                label: "Reports",
                key: '/reports',
                icon: <BarChartOutlined />
            }
        ]
    }
]

const App = () => {
    const { authenticated, setAuthenticated } = useContext(Context)
    // const danger = authenticated !== true;
    const navigate = useNavigate()
    const [tokenLogin, setTokenLogin] = useState(false)
    const isAuthenticated = authenticated === true;
    const danger = !isAuthenticated;
    const validate = () => {
        const token = (localStorage.getItem('token'));
        if (token) {
            setTokenLogin(true)
            setAuthenticated(true)
            // console.log(token)
            return token;
        } else {
            setAuthenticated(false)
        }
    }

    useEffect(() => {
        validate();
    }, [localStorage.getItem('token')])


    const handleLogin = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('admin_id')
        setAuthenticated(false)
        navigate('/login')

    }

    const { token: { colorBgContainer }, } = theme.useToken();
    return (
        <Layout hasSider >
            <Sider style={{
                overflow: 'auto',
                height: '100vh',
                position: 'fixed',
                left: 0, top: 0,
                bottom: 0,
                width: '250px'
            }}>
                <div
                    style={{
                        height: 32,
                        margin: 16,
                        background: 'rgba(255, 255, 255, 0.2)',
                    }} />

                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['/login']}
                >
                    {isAuthenticated ? null : (
                        <Menu.Item key="/login" icon={<UserOutlined />}>
                            <Link to="/login">Login</Link>
                        </Menu.Item>
                    )}
                    <Menu.SubMenu
                        key={items[1].key}
                        title={items[1].label}
                        icon={items[1].icon}>
                        {items[1].children &&
                            items[1].children.map((child) => (
                                <Menu.Item
                                    key={child.key}
                                    icon={child.icon}
                                    danger={danger}>
                                    <Link to={child.key}> {child.label} </Link>
                                </Menu.Item>
                            ))}
                    </Menu.SubMenu>

                    {authenticated === true ?
                        <Menu.Item
                            key='/logout'
                            icon={<LogoutOutlined />}
                            onClick={handleLogin}
                            style={{ position: 'absolute', bottom: 0, right: 0 }}>
                            <Link to='/logout'> Logout </Link>
                        </Menu.Item>
                        :
                        <Menu.Item
                            key='/TelaCadastro'
                            icon={<UserOutlined />}
                            style={{ position: 'absolute', bottom: 0, right: 0 }}>
                            <Link to='/TelaCadastro'> Don't have account </Link>
                        </Menu.Item>
                    }

                </Menu>
            </Sider>
            <Layout className="site-layout" style={{ marginLeft: 200, }}>
                {/* <Header style={{ padding: 0, background: colorBgContainer, }} /> */}
                <Content style={{ margin: '24px 16px 0', overflow: 'initial', }}>
                    <div style={{ padding: 18, textAlign: 'center', background: colorBgContainer }}>
                        <Routes>
                            <Route path='/' element={<TelaLogin />} />
                            <Route path='/login' element={<TelaLogin />} />
                            <Route path='/listusers' element={<UserList />} />
                            <Route path='/newuser' element={<NewUser />} />
                            <Route path='/TelaCadastro' element={<TelaCadastro />} />
                            <Route path='/reports' element={<Reports />} />
                            <Route path='/home' element={<Home />} />
                            <Route path='/unauthorizaded' element={<Unauthorizaded/>} />
                        </Routes>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center', height: '15px' }}>
                    Lucas Goulart @2022
                </Footer>
            </Layout>
        </Layout>
    );
};
export default App;
