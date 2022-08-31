import NavBar from "../../components/NavBar/NavBar";
import classes from "./Layout.module.scss";

const Layout = () => {
  return (
    <div className={classes.Layout}>
      <NavBar isAuth={this.props.isAuth} />
      <main>{this.props.children}</main>
    </div>
  );
};

export default Layout;
