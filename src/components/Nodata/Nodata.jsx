import { Link } from "react-router-dom";
import Button from "../UI/Button/Button";
import classes from "./Nodata.module.scss";

const Nodata = ({ iconColor = "red", isShowButton = true }) => {
  return (
    <div className={classes.Nodata}>
      <h2>
        Данные не найдены
        <i
          style={{ color: iconColor }}
          className="fas fa-exclamation-triangle"
        />
      </h2>

      {isShowButton ? (
        <div className="btns">
          <Link to="/">
            <Button btnType="success">Вернуться к списку тестов</Button>
          </Link>
        </div>
      ) : null}
    </div>
  );
};

export default Nodata;
