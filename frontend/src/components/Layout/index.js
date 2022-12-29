import React from 'react';
import { TeamOutlined, UserOutlined, } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import UserList from '../UserList';
import NewUser from '../NewUser';
import { Link, Route, Routes } from 'react-router-dom';
const { Header, Content, Footer, Sider } = Layout;

const items = [
    {
        label: "Listar usuários",
        key: '/listusers',
        icon: <UserOutlined />,
    },
    {
        label: "Cadastrar",
        key: '/newuser',
        icon: <TeamOutlined />
    }
]

const App = () => {
    const { token: { colorBgContainer }, } = theme.useToken();
    return (
        <Layout hasSider>
            <Sider style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0, }}>
                <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)', }} />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['/listusers']}>
                    {items.map(item => (
                        <Menu.Item key={item.key} icon={item.icon}>
                            <Link to={item.key}>{item.label}</Link>
                        </Menu.Item>
                    ))}
                </Menu>
            </Sider>
            <Layout className="site-layout" style={{ marginLeft: 200, }}>
                <Header style={{ padding: 0, background: colorBgContainer, }} />
                <Content style={{ margin: '24px 16px 0', overflow: 'initial', }}>
                    <div style={{ padding: 24, textAlign: 'center', background: colorBgContainer }}>
                        <Routes>
                            <Route path='/listusers' element={<UserList />} />
                            <Route path='/newuser' element={<NewUser />} />
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
