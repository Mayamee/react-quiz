import { connect } from "react-redux";
import classes from "./Logout.module.scss";
const Logout = () => {
  return <div className={classes.Logout}>Logout</div>;
};

export default connect(null, null)(Logout);
//TODO подумай можно ли без этого компонента обойтись
