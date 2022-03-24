import React, { Component } from "react";
import { Layout, Button } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { getUser } from "@/utils/memory";
import logout from "@/utils/logout";
import { logout as logoutApi } from "@/api/login";
import "./index.less";
const { Header } = Layout;
const user = getUser();

/**
 * 布局Header组件
 */
export default class LayoutHeader extends Component {
  render() {
    return (
      <Header className="layout-background" style={{ padding: 0 }}>
        {
          // React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
          //   className: "trigger",
          //   onClick: this.toggle,
          // })
        }

        <div className="header-content">
          <div>
            欢迎 <span className="username">{user}</span>
          </div>
          <Button type="link" onClick={userLogout}>
            退出
          </Button>
        </div>
      </Header>
    );
  }
}

async function userLogout() {
  try {
    const { status } = await logoutApi();
    if (status === 200) {
      logout();
    }
  } catch (error) {}
}
