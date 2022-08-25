import React, { Component } from "react";
import classes from "./Layout.module.scss";
import MenuToggle from "../../components/Navigation/MenuToggle/MenuToggle";
import Drawer from "../../components/Navigation/Drawer/Drawer";

class Layout extends Component {
  state = {
    isMenuOpen: false,
  };
  toggleMenuHandler = () => {
    this.setState({ isMenuOpen: !this.state.isMenuOpen });
  };
  menuCloseHandler = () => {
    this.setState({ isMenuOpen: false });
  };
  render() {
    return (
      <div className={classes.Layout}>
        <Drawer
          isOpen={this.state.isMenuOpen}
          onClose={this.menuCloseHandler}
        />
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
