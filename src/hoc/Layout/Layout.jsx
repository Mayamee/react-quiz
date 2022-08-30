import React, { Component } from "react";
import classes from "./Layout.module.scss";
import MenuToggle from "../../components/Navigation/MenuToggle/MenuToggle";
import Drawer from "../../components/Navigation/Drawer/Drawer";
let links = [
  {
    to: "/",
    label: "Список тестов",
  },
  {
    to: "auth",
    label: "Авторизация",
  },
  {
    to: "quiz-creator",
    label: "Создать тест",
  },
];
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
    if (this.props.isAuth) {
      links = links.filter((link, index, array) => link.to !== "auth");
    }
    return (
      <div className={classes.Layout}>
        <Drawer
          links={links}
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
