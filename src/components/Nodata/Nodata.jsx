import { Button as MuiButton } from "@mui/material";
import classes from "./Nodata.module.scss";
import { useNavigate } from "react-router-dom";

const Nodata = ({ iconColor = "red", isShowButton = true }) => {
  const navigate = useNavigate();
  return (
    <div className={classes.Nodata}>
      <p>
        Данные не найдены
        <i
          style={{ color: iconColor }}
          className="fas fa-exclamation-triangle"
        />
      </p>

      {isShowButton ? (
        <div className="btns">
          <MuiButton variant="contained" onClick={() => navigate("/")}>
            Вернуться к списку тестов
          </MuiButton>
        </div>
      ) : null}
    </div>
  );
};

export default Nodata;
