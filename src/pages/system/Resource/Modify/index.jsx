import React, { Component } from "react";
import { Modal, Form, Input, Select, message, InputNumber } from "antd";
import { addResource, updateResource } from "@/api/system/resource";

export default class ModifyResource extends Component {
  formRef = React.createRef();
  state = {
    resourceType: 1,
    confirmLoading: false,
  };

  componentDidMount() {
    const { record, title } = this.props;
    if (record && title === "edit") {
      this.setState({ resourceType: record.resourceType });
    }
  }
  // 弹框确认
  handleOk = async () => {
    const { controlModal, record, title } = this.props;
    try {
      this.setState({ confirmLoading: true });
      const values = await this.formRef.current.validateFields();
      let result;
      let msg;
      if (title === "add") {
        result = await addResource({ ...values, parentId: record?.id || "-1" });
        msg = "新增成功";
      } else {
        result = await updateResource({ ...values, id: record.id });
        msg = "修改成功";
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
  // 资源类型选择事件
  resourceTypeChange = e => {
    this.setState({ resourceType: e });
  };
  render() {
    const { title, visible, record } = this.props;
    const { resourceType, confirmLoading } = this.state;
    return (
      <Modal
        title={title === "add" ? "新增资源" : "编辑资源"}
        visible={visible}
        keyboard={false}
        maskClosable={false}
        confirmLoading={confirmLoading}
        onOk={this.handleOk}
        onCancel={this.handleCancel}>
        <Form
          initialValues={title === "edit" ? record : null}
          ref={this.formRef}
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 16 }}
          layout="horizontal">
          {record && title === "add" ? (
            <Form.Item label="父节点">
              <Input value={record.name} disabled={!!record} />
            </Form.Item>
          ) : null}
          <Form.Item
            label="资源名称"
            name="name"
            rules={[{ required: true, message: "请输入资源名称" }]}>
            <Input />
          </Form.Item>
          <Form.Item
            label="资源类型"
            name="resourceType"
            rules={[{ required: true, message: "请选择资源类型" }]}>
            <Select onChange={this.resourceTypeChange} disabled={title === "edit"}>
              <Select.Option value={1} disabled={!!record}>
                目录
              </Select.Option>
              <Select.Option value={2} disabled={record?.resourceType === 3}>
                菜单
              </Select.Option>
              <Select.Option value={3} disabled={!record || record.resourceType === 1}>
                按钮
              </Select.Option>
            </Select>
          </Form.Item>

          {resourceType === 3 ? (
            <Form.Item
              label="权限KEY"
              name="authKey"
              rules={[{ required: true, message: "请输入权限KEY" }]}>
              <Input />
            </Form.Item>
          ) : null}
          {resourceType !== 1 ? (
            <Form.Item
              key={`${resourceType}-path`}
              label="资源路径"
              name="path"
              rules={resourceType === 2 ? [{ required: true, message: "请输入资源访问路径" }] : []}>
              <Input />
            </Form.Item>
          ) : null}
          {resourceType !== 1 ? (
            <Form.Item
              key={`${resourceType}-component`}
              label="组件路径"
              name="component"
              rules={resourceType === 2 ? [{ required: true, message: "请输入组件路径" }] : []}>
              <Input />
            </Form.Item>
          ) : null}
          <Form.Item label="资源排序" name="sortNum">
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}
