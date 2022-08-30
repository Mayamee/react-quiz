import { Link } from "react-router-dom";
import classes from "./NotFound.module.scss";

const NotFound = () => {
  return (
    <div className={classes.NotFound}>
      <div className={classes.block}>
        <h2>
          Ой
          <i className="fas fa-circle-exclamation" />
        </h2>
        <p>Эта страница не может быть отображена</p>
        <Link to="/">
          <div className={classes.link}>К списку тестов...</div>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
