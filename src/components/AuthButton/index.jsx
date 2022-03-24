import { Button } from "antd";
import React, { Component } from "react";

import { getAuthorities } from "@/utils/memory";

export default class AuthButton extends Component {
  state = {
    authorities: [],
  };
  componentDidMount() {
    const authorities = getAuthorities()?.authorities || [];
    this.setState({ authorities });
  }
  render() {
    const { authKey, type } = this.props;
    let _props = { ...this.props };
    delete _props.authKey;
    let style = type === "link" ? { paddingLeft: 0, paddingRight: 0 } : null;
    if (this.state.authorities.includes(authKey)) {
      return <Button {..._props} style={style} />;
    }
    return null;
  }
}
