import React, { Component } from "react";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./index.less";
import { login } from "@/api/login";
import { setToken, setUser, setAuthorities } from "@/utils/memory";

/**
 * 登录路由组件
 */
export default class Login extends Component {
  state = {
    confirmLoading: false,
  };
  onFinish = async values => {
    this.setState({ confirmLoading: true });
    try {
      const {
        status,
        message: msg,
        data: { token, menus, routes, authorities },
      } = await login(values);
      if (status === 200) {
        setToken(token);
        setAuthorities({ authorities, routes, menus });
        setUser(values.username);
        this.props.history.push("/home");
        message.success(msg);
      }
    } catch (error) {}
    this.setState({ confirmLoading: false });
  };
  render() {
    return (
      <div className="login">
        <div className="login-form">
          <div className="sys-title">XX后台管理系统</div>
          <Form onFinish={this.onFinish}>
            <Form.Item
              name="username"
              rules={[
                { min: 5, message: "长度不能小于5位" },
                { required: true, message: "请输入账号！" },
              ]}>
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="请输入账号"
              />
            </Form.Item>
            <Form.Item
              name="password"
              min={6}
              rules={[
                { min: 5, message: "长度不能小于5位" },
                { required: true, message: "请输入密码！" },
              ]}>
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="请输入密码"
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                block
                size="large"
                htmlType="submit"
                loading={this.state.confirmLoading}>
                登 录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}
