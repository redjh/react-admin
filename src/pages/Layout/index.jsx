import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Layout } from "antd";
import "./index.less";
import LayoutHeader from "./LayoutHeader";
import LeftMenu from "./LeftMenu";
import Router from "@/components/Router";
import Logo from "@/components/Logo";
import { getToken, getAuthorities, setAuthorities } from "@/utils/memory";
import { getUserAuthorities } from "@/api/system/user";
const { Content } = Layout;

export default class AdminLayout extends Component {
  state = {
    collapsed: false,
    menus: [],
    routes: [],
  };
  async componentDidMount() {
    const authorities = getAuthorities();
    if (!authorities) {
      try {
        const { data } = await getUserAuthorities();
        if (data) {
          setAuthorities(data);
          this.setState({ menus: data.menus, routes: data.routes });
        }
      } catch (error) {}
    } else {
      this.setState({ menus: authorities.menus, routes: authorities.routes });
    }
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    console.log("AdminLayout --- render");
    if (!getToken()) {
      return <Redirect to="/login" />;
    }
    const { menus, routes, collapsed } = this.state;
    return (
      <Layout className="admin-layout">
        <Layout.Sider trigger={null} collapsible collapsed={collapsed}>
          <Logo />
          <LeftMenu menus={menus} />
        </Layout.Sider>
        <Layout>
          <LayoutHeader />
          <Content className="layout-background layout-content">
            <Router routes={routes} />
          </Content>
        </Layout>
      </Layout>
    );
  }
}
