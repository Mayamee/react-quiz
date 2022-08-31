import NavBar from "../../components/NavBar/NavBar";
import classes from "./Layout.module.scss";

const Layout = ({ isAuth }) => {
  return (
    <div className={classes.Layout}>
      <NavBar isAuth={isAuth} />
      <main>{this.props.children}</main>
    </div>
  );
};

export default Layout;
