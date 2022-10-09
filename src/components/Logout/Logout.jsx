import { connect } from "react-redux";
import { useEffect } from "react";
import { authLogout } from "../../store/actions/authorization";
import { Navigate } from "react-router-dom";
import ThreeLinesLoader from "../UI/ThreeLinesLoader/ThreeLinesLoader";
import PageContainer from "../UI/styled/PageContainer/PageContainer";
const Logout = ({ logout, isAuth }) => {
  useEffect(() => {
    logout();
  }, []);
  return (
    <PageContainer
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {isAuth ? <ThreeLinesLoader /> : <Navigate to="/" />}
    </PageContainer>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuthentificated,
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(authLogout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
