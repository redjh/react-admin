import React, { Component } from "react";
import { Modal, Form, Input, TreeSelect, message } from "antd";
import { addRole, updateRole } from "@/api/system/role";
const { SHOW_PARENT } = TreeSelect;
const { TextArea } = Input;

export default class ModifyRole extends Component {
  formRef = React.createRef();
  state = {
    confirmLoading: false,
  };
  // 弹框确认
  handleOk = async () => {
    const { controlModal, record, title } = this.props;
    try {
      this.setState({ confirmLoading: true });
      let { name, authorities, desc } = await this.formRef.current.validateFields();
      authorities = authorities.map(r => r.value).join(",");
      const params = { name, authorities, desc };
      let result;
      let msg;
      if (title === "add") {
        result = await addRole(params);
        msg = "新增成功";
      } else {
        params.id = record.id;
        result = await updateRole(params);
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
    const { title, visible, record, treeData } = this.props;
    const tProps = {
      treeData,
      treeCheckable: true,
      showCheckedStrategy: SHOW_PARENT,
      treeDefaultExpandAll: true,
      treeCheckStrictly: true,
      fieldNames: { label: "name", value: "id", children: "children" },
    };

    return (
      <Modal
        title={title === "add" ? "新增角色" : "编辑角色"}
        visible={visible}
        keyboard={false}
        maskClosable={false}
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
            label="角色名称"
            name="name"
            rules={[{ required: true, message: "请输入角色名称" }]}>
            <Input />
          </Form.Item>
          <Form.Item
            label="角色权限"
            name="authorities"
            rules={[{ required: true, message: "请选择角色权限" }]}>
            <TreeSelect {...tProps} />
          </Form.Item>
          <Form.Item label="角色描述" name="desc">
            <TextArea autoSize={{ minRows: 4, maxRows: 4 }} />
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}
