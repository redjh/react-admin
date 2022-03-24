import React, { Component } from "react";
import { Table, Form, Input, message, Popconfirm, Space } from "antd";
import AuthButton from "@/components/AuthButton";
import ModifyRole from "./Modify";
import { getRoles, deleteRole } from "@/api/system/role";
import { getResources } from "@/api/system/resource";

const dayjs = require("dayjs");
const { Column } = Table;
export default class Role extends Component {
  state = {
    data: [],
    visible: false,
    title: "add",
    record: null,
  };

  componentDidMount() {
    this.queryRoles();
    getResources().then(res => {
      this.treeData = res.data;
    });
  }

  /**
   * 控制弹窗的方法
   * @param {Boolean} visible
   * @param {String} action 弹窗操作标识
   */
  controlModal = action => {
    this.setState({ visible: false, record: null });
    if (action === "ok") {
      this.queryRoles();
    }
  };

  queryRoles = async () => {
    try {
      const { data } = await getRoles();
      data.forEach(item => (item.authorities = item.authorities.split(",")));
      this.setState({ data });
    } catch (error) {}
  };

  addRole = (e, record = null) => {
    e.stopPropagation();
    this.setState({ visible: true, title: "add", record });
  };
  editRole = (e, record) => {
    e.stopPropagation();
    this.setState({ visible: true, title: "edit", record });
  };
  delRole = async (e, record) => {
    e.stopPropagation();
    try {
      const { status } = await deleteRole(record.id);
      if (status === 200) {
        message.success("删除成功");
        this.queryResources();
      } else {
        message.success("删除失败");
      }
    } catch (error) {}
  };

  render() {
    console.log("Resource --- render");

    const { title, visible, record } = this.state;

    return (
      <div className="role-list">
        <div className="page-header">
          <Form.Item label="角色名称">
            <Input placeholder="请输入后按Enter搜索" style={{ width: "200px" }} />
          </Form.Item>
          <AuthButton authKey="RESOURCE_ADD" type="primary" onClick={this.addRole}>
            新增
          </AuthButton>
        </div>
        <Table
          rowKey="id"
          bordered
          expandRowByClick
          pagination={false}
          dataSource={this.state.data}>
          <Column title="角色名称" dataIndex="name" key="name" />
          <Column title="角色描述" dataIndex="desc" key="desc" />
          <Column
            title="更新时间"
            dataIndex="createdTime"
            key="createdTime"
            render={text => <div>{dayjs(text).format("YYYY-MM-DD HH:mm:ss")}</div>}
          />
          <Column
            title="创建时间"
            dataIndex="updatedTime"
            key="updatedTime"
            render={text => <div>{dayjs(text).format("YYYY-MM-DD HH:mm:ss")}</div>}
          />
          <Column
            title="操作"
            key="action"
            render={(text, record) => (
              <Space size={16}>
                <AuthButton
                  authKey="RESOURCE_ADD"
                  type="link"
                  onClick={e => this.editRole(e, record)}>
                  编辑
                </AuthButton>
                <Popconfirm
                  placement="topLeft"
                  title={`是否删除 ${record.name}`}
                  onConfirm={e => this.delRole(e, record)}
                  okText="确定"
                  cancelText="取消">
                  <AuthButton authKey="RESOURCE_ADD" type="link" danger>
                    删除
                  </AuthButton>
                </Popconfirm>
              </Space>
            )}
          />
        </Table>
        {visible ? (
          <ModifyRole
            title={title}
            visible={visible}
            record={record}
            treeData={this.treeData}
            controlModal={this.controlModal}
          />
        ) : null}
      </div>
    );
  }
}
