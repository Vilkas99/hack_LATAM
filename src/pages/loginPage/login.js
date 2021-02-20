import React, { Component, useState } from "react";
import { Form, Input, Button, Tabs } from "antd";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  NumberOutlined,
} from "@ant-design/icons";
import "./login.css";
import { Redirect } from "react-router-dom";
import { useAuth  } from "../../Utils/Auth";

const { TabPane } = Tabs;


const Login = () => {
  console.log("entrnad");
   
  const { login, signUp } = useAuth();
  const [success, setSuccess] = useState(false);

  const SubmitLogin = async (values) => {
    console.log(values.username, values.password);
    login(values.username, values.password);     
    setSuccess(true);
  };

  const logout = async () => {
    console.log("logout");
    //await firebase.auth().signOut();
    
  };

  const registerUser = (values) => {
    signUp(values.email, values.password, values.name, values.code)
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  function callback(key) {
    console.log(key);
  }

  return (       
        <div className="card">
            {success && <Redirect to="/room" />}
          <div className="center">
            <img src="https://i.ibb.co/G061H2N/b-1.png" />
          </div>
          <Tabs defaultActiveKey="1" onChange={callback}>
            <TabPane tab="Sign In" key="1">
              <Form
                name="signin"
                onFinish={SubmitLogin}
                onFinishFailed={onFinishFailed}
              >
                <Form.Item
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: "Please input your username!",
                    },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Username"
                  />
                </Form.Item>

                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                >
                  <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                  >
                    Log in
                  </Button>
                </Form.Item>
              </Form>
            </TabPane>
            <TabPane tab="Sign Up" key="2">
              <Form
                name="signup"
                initialValues={{
                  remember: true,
                }}
                onFinish={registerUser}
                onFinishFailed={onFinishFailed}
              >
                <Form.Item
                  name="code"
                  rules={[
                    {
                      required: true,
                      message: "Please input your code!",
                    },
                  ]}
                >
                  <Input
                    prefix={<NumberOutlined className="site-form-item-icon" />}
                    placeholder="Code"
                  />
                </Form.Item>
                <Form.Item
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Please input your name!",
                    },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Name"
                  />
                </Form.Item>
                <Form.Item
                  name="email"
                  rules={[
                    {
                      required: true,
                      type: "email",
                      message: "Please input a valid email!",
                    },
                  ]}
                >
                  <Input
                    prefix={<MailOutlined className="site-form-item-icon" />}
                    placeholder="Email"
                  />
                </Form.Item>

                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                >
                  <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                  >
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </TabPane>
          </Tabs>
        </div>          
  );
};

export default Login;
