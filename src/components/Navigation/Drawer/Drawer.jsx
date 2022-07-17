import React, { Component } from "react";
import classes from "./Drawer.module.scss";
import Backdrop from "../../UI/Backdrop/Backdrop";
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
    const cls = [classes.Drawer];
    if (!this.props.isOpen) {
      cls.push(classes.closed);
    }
    return (
      <React.Fragment>
        <nav className={cls.join(" ")}>
          <ul>{this.renderLinks()}</ul>
        </nav>
        {this.props.isOpen ? (
          <Backdrop onClickHandler={this.props.onClose} />
        ) : null}
      </React.Fragment>
    );
  }
}

export default Drawer;
