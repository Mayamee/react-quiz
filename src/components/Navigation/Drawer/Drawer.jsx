import React, { Component } from "react";
import classes from "./Drawer.module.scss";
const links = [1, 2, 3];
class Drawer extends Component {
  state = {};
  renderLinks() {
    return links.map((link, index) => {
      return (
        <li key={index}>
          <a>Link: {link}</a>
        </li>
      );
    });
  }
  render() {
    console.log(classes);
    const cls = [classes.Drawer];
    if (!this.props.isOpen) {
      cls.push(classes.closed);
    }
    return (
      <nav className={cls.join(" ")}>
        <ul>{this.renderLinks()}</ul>
      </nav>
    );
  }
}

export default Drawer;
