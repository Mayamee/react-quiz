import NavBar from "../../components/NavBar/NavBar";
import classes from "./Layout.module.scss";

const Layout = ({ isAuth, children }) => {
  return (
    <div className={classes.Layout}>
      <NavBar isAuth={isAuth} />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
