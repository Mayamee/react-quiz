import { Link } from "react-router-dom";
import Button from "../UI/Button/Button";
import classes from "./Nodata.module.scss";

const Nodata = () => {
  return (
    <div className={classes.Nodata}>
      <h2>
        Данные не найдены <i className="fas fa-exclamation-triangle" />
      </h2>

      <div className="btns">
        <Link to="/">
          <Button btnType="success">Вернуться к списку тестов</Button>
        </Link>
      </div>
    </div>
  );
};

export default Nodata;
