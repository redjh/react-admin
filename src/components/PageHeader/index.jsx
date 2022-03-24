import { Component } from "react";
import { withRouter } from "react-router-dom";
import { Button, Form, Input } from "antd";
import "./index.less";
class PageHeader extends Component {
  render() {
    return (
      <div className="page-header">
        <Form.Item label="资源名称">
          <Input placeholder="请输入资源名称" style={{ width: "150px" }} />
        </Form.Item>
        <Button type="primary"> 新增 </Button>
      </div>
    );
  }
}

export default withRouter(PageHeader);
