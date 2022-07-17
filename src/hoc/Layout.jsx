import React, { Component } from "react";
import classes from "./Layout.module.scss";
import MenuToggle from "../components/Navigation/MenuToggle/MenuToggle";

class Layout extends Component {
  state = {
    isMenuOpen: false,
  };
  toggleMenuHandler = () => {
    this.setState({ isMenuOpen: !this.state.isMenuOpen });
  };
  render() {
    return (
      <div className={classes.Layout}>
        <MenuToggle
          onToggle={this.toggleMenuHandler}
          isOpen={this.state.isMenuOpen}
        />
        <main>{this.props.children}</main>
      </div>
    );
  }
}
export default Layout;
