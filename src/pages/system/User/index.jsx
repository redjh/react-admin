import React, { Component } from "react";
import { Table, Form, Input, message, Popconfirm, Space } from "antd";
import AuthButton from "@/components/AuthButton";
import ModifyUser from "./Modify";
import { getUsers, deleteUser } from "@/api/system/user";
import { getRoles } from "@/api/system/role";

const dayjs = require("dayjs");
const { Column } = Table;
export default class User extends Component {
  state = {
    data: [],
    visible: false,
    title: "add",
    record: null,
  };

  componentDidMount() {
    this.queryUsers();
    getRoles().then(res => {
      this.roleList = res.data;
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
      this.queryUsers();
    }
  };

  queryUsers = async () => {
    try {
      const { data } = await getUsers();
      this.setState({ data });
    } catch (error) {}
  };

  addUser = (e, record = null) => {
    e.stopPropagation();
    this.setState({ visible: true, title: "add", record });
  };
  editUser = (e, record) => {
    e.stopPropagation();
    this.setState({ visible: true, title: "edit", record });
  };
  delUser = async (e, record) => {
    e.stopPropagation();
    try {
      const { status } = await deleteUser(record.id);
      if (status === 200) {
        message.success("删除成功");
        this.queryResources();
      } else {
        message.success("删除失败");
      }
    } catch (error) {}
  };

  render() {
    const { title, visible, record } = this.state;
    return (
      <div className="user-list">
        <div className="page-header">
          <Form.Item label="用户名称">
            <Input placeholder="请输入后按Enter搜索" style={{ width: "200px" }} />
          </Form.Item>
          <AuthButton authKey="RESOURCE_ADD" type="primary" onClick={this.addUser}>
            新增
          </AuthButton>
        </div>
        <Table
          rowKey="id"
          bordered
          expandRowByClick
          pagination={false}
          dataSource={this.state.data}>
          <Column title="用户名" dataIndex="username" key="username" />
          <Column
            title="性别"
            dataIndex="gender"
            key="gender"
            render={(text, record) => (text === 0 ? "男" : text === 1 ? "女" : "保密")}
          />
          <Column title="邮箱" dataIndex="email" key="email" />
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
                  onClick={e => this.editUser(e, record)}>
                  编辑
                </AuthButton>
                <Popconfirm
                  placement="topLeft"
                  title={`是否删除 ${record.username}`}
                  onConfirm={e => this.delUser(e, record)}
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
          <ModifyUser
            title={title}
            visible={visible}
            record={record}
            roleList={this.roleList}
            controlModal={this.controlModal}
          />
        ) : null}
      </div>
    );
  }
}
