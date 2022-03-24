import React, { Component } from "react";
import { Table, Form, Input, message, Popconfirm, Space } from "antd";
import AuthButton from "@/components/AuthButton";
import ModifyResource from "./Modify";
import { getResources, deleteResource } from "@/api/system/resource";
const { Column } = Table;
export default class Resource extends Component {
  state = {
    data: [],
    expandedRowKeys: [],
    visible: false,
    title: "add",
    record: null,
  };

  componentDidMount() {
    this.queryResources(function (data) {
      return data.map(d => d.id);
    });
  }
  onExpandedRowsChange = expandedRowKeys => {
    this.setState({ expandedRowKeys });
  };

  /**
   * 控制弹窗的方法
   * @param {Boolean} visible
   * @param {String} action 弹窗操作标识
   */
  controlModal = action => {
    this.setState({ visible: false, record: null });
    if (action === "ok") {
      this.queryResources();
    }
  };

  queryResources = async callback => {
    const { data } = await getResources();
    let expandedRowKeys = callback && callback(data);
    if (expandedRowKeys) {
      this.setState({ data, expandedRowKeys: expandedRowKeys });
    } else {
      this.setState({ data });
    }
  };

  addResource = (e, record = null) => {
    e.stopPropagation();
    this.setState({ visible: true, title: "add", record });
  };
  editReource = (e, record) => {
    e.stopPropagation();
    this.setState({ visible: true, title: "edit", record });
  };
  delReource = async (e, record) => {
    e.stopPropagation();
    try {
      const { status } = await deleteResource(record.id);
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
      <div className="resource-list">
        <div className="page-header">
          <Form.Item label="资源名称">
            <Input placeholder="请输入后按Enter搜索" style={{ width: "200px" }} />
          </Form.Item>
          <AuthButton authKey="RESOURCE_ADD" type="primary" onClick={this.addResource}>
            新增
          </AuthButton>
        </div>
        <Table
          rowKey="id"
          bordered
          expandRowByClick
          pagination={false}
          dataSource={this.state.data}
          expandedRowKeys={this.state.expandedRowKeys}
          onExpandedRowsChange={this.onExpandedRowsChange}>
          <Column title="资源名称" dataIndex="name" key="name" width={250} />
          <Column title="资源路径" dataIndex="path" key="path" width={200} />
          <Column
            title="资源类型"
            dataIndex="resourceType"
            key="resourceType"
            width={200}
            render={(text, record) => (
              <div>
                {record.resourceType === 1
                  ? "目录"
                  : record.resourceType === 2
                  ? "菜单"
                  : record.resourceType === 3
                  ? "按钮"
                  : null}
              </div>
            )}
          />
          <Column title="组件路径" dataIndex="component" key="component" width={200} />
          <Column title="按钮权限KEY" dataIndex="authKey" key="authKey" width={200} />
          <Column
            title="操作"
            key="action"
            render={(text, record) => (
              <Space size={16}>
                {record.resourceType !== 3 ? (
                  <AuthButton
                    authKey="RESOURCE_ADD"
                    type="link"
                    onClick={e => this.addResource(e, record)}>
                    新增
                  </AuthButton>
                ) : null}
                <AuthButton
                  authKey="RESOURCE_ADD"
                  type="link"
                  onClick={e => this.editReource(e, record)}>
                  编辑
                </AuthButton>
                <Popconfirm
                  placement="topLeft"
                  title={`是否删除 ${record.name}`}
                  onConfirm={e => this.delReource(e, record)}
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
          <ModifyResource
            title={title}
            visible={visible}
            record={record}
            controlModal={this.controlModal}
          />
        ) : null}
      </div>
    );
  }
}
