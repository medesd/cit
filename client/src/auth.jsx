import React from "react";
import {Form, Input, notification} from 'antd';
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import Button from "antd-button-color";
import axios from "axios";
import image from './assets/login.png';

const Auth = () => {
    const onFinish = async values => {
        await axios.create().post('/auth/signin', values).then(s => {
            localStorage.setItem('token', s.data.token);
            localStorage.setItem('type', s.data.type);
            window.location.reload();
        }).catch(() => {
            openNotification();
        });
    };

    const openNotification = () => {
        notification.open({
            message: "Nom d'utilisateur ou mot de passe est incorrect"
        });
    };

    return (
        <div className="container">
            <div style={{height: document.body.clientHeight + "px"}}
                 className="row align-items-center justify-content-center">
                <div className="col-xs p-4 border text-center">
                    <img className="img-fluid mb-3" style={{maxWidth: "200xp", maxHeight: "200px"}} src={image} alt=""/>

                    <Form
                        name="normal_login"
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="username"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon"/>}
                                   placeholder="Nom d'utilisateur"/>
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon"/>}
                                type="password"
                                placeholder="Mot de passe"
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Log in
                            </Button>
                        </Form.Item>
                    </Form>

                </div>
            </div>
        </div>

    );
}

export default Auth;
