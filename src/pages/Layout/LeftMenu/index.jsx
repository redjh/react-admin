import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Menu } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { setData, getData } from "@/utils/memory";
const { SubMenu } = Menu;

class LayoutMenu extends Component {
  state = {
    openKeys: [],
  };
  componentDidMount() {
    let { openKeys } = this.state;
    if (!openKeys.length) {
      openKeys = getData("openKeys") || openKeys;
      this.setState({ openKeys });
    }
  }
  menuClick = ({ key, keyPath }) => {
    this.props.history.push(key);
  };
  onTitleClick = ({ key }) => {
    const { openKeys } = this.state;
    let index = openKeys.indexOf(key);
    if (index === -1) {
      openKeys.push(key);
    } else {
      openKeys.splice(index, 1);
    }
    this.setState({ openKeys });
    setData("openKeys", openKeys);
  };
  render() {
    let {
      defaultRoute,
      location: { pathname },
      menus,
    } = this.props;

    if (pathname !== "/") {
      defaultRoute = pathname;
    }
    console.log(menus);
    console.log("LayoutMenu ---- render");

    return (
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={[defaultRoute]}
        openKeys={this.state.openKeys}
        onClick={this.menuClick}>
        {menus.map(m => {
          if (m.children) {
            return (
              <SubMenu key={m.id} title={m.name} onTitleClick={this.onTitleClick}>
                {m.children.map(child => {
                  return <Menu.Item key={child.path}>{child.name}</Menu.Item>;
                })}
              </SubMenu>
            );
          } else {
            return (
              <Menu.Item key={m.path} icon={<UserOutlined />}>
                {m.name}
              </Menu.Item>
            );
          }
        })}
      </Menu>
    );
  }
}
export default withRouter(LayoutMenu);
