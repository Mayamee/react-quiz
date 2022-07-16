import React, { Component } from "react";
import classes from "./Layout.module.scss";
class Layout extends Component {
  render() {
    console.log(classes);
    return (
      <div className={classes.Layout}>
        <main>{this.props.children}</main>
      </div>
    );
  }
}
export default Layout;
