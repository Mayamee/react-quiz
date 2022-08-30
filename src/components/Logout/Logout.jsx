import { connect } from "react-redux";
import classes from "./Logout.module.scss";
import Loader from "../UI/Loader/Loader";
import { useEffect } from "react";
import { authLogout } from "../../store/actions/authorization";
import { Navigate } from "react-router-dom";
const Logout = ({ logout, isAuth }) => {
  useEffect(() => {
    logout();
  }, []);
  return (
    <div className={classes.Logout}>
      {isAuth ? <Loader /> : <Navigate to="/" />}
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuthentificated,
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(authLogout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
