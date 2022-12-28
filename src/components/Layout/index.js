import React from 'react';
import { TeamOutlined, UserOutlined, } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import UserList from '../UserList';

const { Header, Content, Footer, Sider } = Layout;

// const items = [UserOutlined, TeamOutlined,].map((icon, index) => ({
//     key: String(index + 1),
//     icon: React.createElement(icon),
//     label: `nav ${index + 1}`,
// }));


const items = [
    {
        label: "Listar usuários",
        key: '/listusers',
        icon: <UserOutlined />
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
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['/listusers']} items={items} />
            </Sider>
            <Layout className="site-layout" style={{ marginLeft: 200, }}>
                <Header style={{ padding: 0, background: colorBgContainer, }} />
                <Content style={{ margin: '24px 16px 0', overflow: 'initial', }}>
                    <div style={{ padding: 24, textAlign: 'center', background: colorBgContainer }}>
                        <UserList />

                    </div>
                </Content>
                <Footer style={{ textAlign: 'center', }}>
                    Ant Design ©2018 Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    );
};
export default App;
