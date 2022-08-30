import React, { Component } from "react";
import classes from "./Drawer.module.scss";
import Backdrop from "../../UI/Backdrop/Backdrop";
import { NavLink } from "react-router-dom";

class Drawer extends Component {
  handleClick = () => {
    this.props.onClose();
  };
  renderLinks() {
    return this.props.links.map((link, index) => {
      return (
        <li key={index}>
          <NavLink
            to={link.to}
            className={({ isActive }) => (isActive ? classes.active : "")}
            onClick={this.handleClick}
          >
            {link.label}
          </NavLink>
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
