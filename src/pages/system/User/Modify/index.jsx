import React, { Component } from "react";
import { Modal, Form, Input, Select, message } from "antd";
import { addUser, updateUser } from "@/api/system/user";
const { TextArea } = Input;

export default class ModifyUser extends Component {
  formRef = React.createRef();
  state = {
    confirmLoading: false,
  };
  // 弹框确认
  handleOk = async () => {
    const { controlModal, record, title } = this.props;
    try {
      this.setState({ confirmLoading: true });
      let values = await this.formRef.current.validateFields();
      let result;
      let msg;
      if (title === "add") {
        result = await addUser(values);
        msg = "新增成功";
      } else {
        result = await updateUser({ ...values, id: record.id });
        msg = "更新成功";
      }
      if (result?.status === 200) {
        message.success(msg);
        controlModal("ok");
      }
      this.setState({ confirmLoading: false });
    } catch (error) {
      console.log(error);
      this.setState({ confirmLoading: false });
    }
  };
  // 弹框取消
  handleCancel = () => {
    const { controlModal } = this.props;
    controlModal("cancel");
  };
  render() {
    const { title, visible, record, roleList } = this.props;
    return (
      <Modal
        title={title === "add" ? "新增用户" : "编辑用户"}
        keyboard={false}
        maskClosable={false}
        visible={visible}
        confirmLoading={this.state.confirmLoading}
        onOk={this.handleOk}
        onCancel={this.handleCancel}>
        <Form
          initialValues={title === "edit" ? record : null}
          ref={this.formRef}
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 16 }}
          layout="horizontal">
          <Form.Item
            label="用户名"
            name="username"
            rules={[
              { min: 5, message: "长度不能小于5位" },
              { required: true, message: "请输入用户名" },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[
              { min: 5, message: "长度不能小于5位" },
              { required: true, message: "请输入密码" },
            ]}>
            <Input type="password" />
          </Form.Item>
          <Form.Item label="性别" name="gender" rules={[{ required: true, message: "请选择性别" }]}>
            <Select>
              <Select.Option value={0}>男</Select.Option>
              <Select.Option value={1}>女</Select.Option>
              <Select.Option value={-1}>保密</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="角色" name="roleId" rules={[{ required: true, message: "请选择角色" }]}>
            <Select>
              {roleList.map(role => {
                return (
                  <Select.Option key={role.id} value={role.id}>
                    {role.name}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item label="邮箱" name="email">
            <Input />
          </Form.Item>
          <Form.Item label="描述" name="desc">
            <TextArea autoSize={{ minRows: 4, maxRows: 4 }} />
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}
