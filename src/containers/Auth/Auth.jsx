import { useEffect, useState } from "react";
import {
  email as emailRule,
  maxLength,
  minLength,
  onlyEnglishEmail,
  required as requiredRule,
} from "../../validation/ruleCreator";
import { connect } from "react-redux";
import { authLogin, authRegister } from "../../store/actions/authorization";
import { Box } from "@mui/system";
import { LoadingButton } from "@mui/lab";
import PageContainer from "../../components/UI/styled/PageContainer/PageContainer";
import ThreeLinesLoader from "../../components/UI/ThreeLinesLoader/ThreeLinesLoader";
import FixedFullPage from "../../components/UI/styled/FixedFullPage/FixedFullPage";
import FixedFullPageBody from "../../components/UI/styled/FixedFullPage/FixedFullPageBody";
import FixedFullPageBackground from "../../components/UI/styled/FixedFullPage/FixedFullPageBackground";
import { Paper, TextField, Typography, useTheme } from "@mui/material";
import {
  FormBody,
  FormBox,
} from "../../components/UI/styled/FormElements/FormBody";
import { Send } from "@mui/icons-material";
import debounce from "../../helpers/debounce";
import { PrimaryButton } from "../../components/UI/styled/Button/PrimaryButton";
import { validate } from "../../validation/validate";

const Auth = ({ login, register, msg }) => {
  const theme = useTheme();
  const [isLogin, setIsLogin] = useState(false);
  const [isFormValid, setFormValid] = useState(false);
  const [formControls, setFormControls] = useState({
    email: { value: "", isValid: false },
    username: { value: "", isValid: false },
    password: { value: "", isValid: false },
  });
  const validationRules = {
    email: [requiredRule(), emailRule(), onlyEnglishEmail()],
    userName: [requiredRule(), minLength(3), maxLength(30)],
    password: [requiredRule(), minLength(6), maxLength(30)],
  };
  useEffect(() => {
    console.log("formControls", formControls);
  }, [
    formControls.email.isValid,
    formControls.username.isValid,
    formControls.password.isValid,
  ]);
  const emailHandler = ({ target: { value } }) =>
    setFormControls((prev) => ({
      ...prev,
      email: {
        value,
        isValid: validate(validationRules.email, value),
      },
    }));
  const userNameHandler = ({ target: { value } }) =>
    setFormControls((prev) => ({
      ...prev,
      username: {
        value,
        isValid: validate(validationRules.userName, value),
      },
    }));
  const passwordHandler = ({ target: { value } }) =>
    setFormControls((prev) => ({
      ...prev,
      password: {
        value,
        isValid: validate(validationRules.password, value),
      },
    }));
  const submitHandler = debounce((e) => {
    console.log("debounce");
  }, 1000);
  return (
    <>
      <FixedFullPage bgColor="#fff" id="app-auth-wrapper">
        <FixedFullPageBackground
          sx={{
            display: "flex",
          }}
        >
          <Box
            sx={{
              backgroundColor: "#ECBC76",
              flexBasis: "50%",
            }}
          />
          <Box
            sx={{
              backgroundColor: "#FFFEF9",
              flexBasis: "50%",
            }}
          />
        </FixedFullPageBackground>
        <FixedFullPageBody
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Paper
            elevation={10}
            sx={{
              padding: `${theme.spacing(6.25)} ${theme.spacing(5)}`,
              borderRadius: "10px",
            }}
          >
            <Box
              sx={{
                width: 560,
              }}
            >
              <Box
                id="app-auth-title"
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  gap: "20px",
                  marginBottom: theme.spacing(5.625),
                }}
              >
                <Box sx={{ flexBasis: "60%" }}>
                  <Typography
                    component="h1"
                    variant="h6"
                    sx={{
                      marginBottom: "10px",
                    }}
                  >
                    Добро пожаловать в Quiz
                  </Typography>
                  <Typography component="h2" variant="h4">
                    {isLogin ? "Регистрация" : "Войти"}
                  </Typography>
                </Box>
                <Box sx={{ flexBasis: "40%" }}>
                  <Typography component="p" variant="body2">
                    {isLogin ? "Уже" : "Еще не"} зарегистрированы?
                  </Typography>
                  <PrimaryButton
                    href="#void"
                    onClick={(e) => {
                      setIsLogin(!isLogin);
                    }}
                  >
                    {isLogin ? "Войти" : "Зарегистрироваться"}
                  </PrimaryButton>
                </Box>
              </Box>
              <Box>
                <form
                  noValidate
                  autoComplete="off"
                  onSubmit={(e) => {
                    e.preventDefault();
                    submitHandler(e);
                  }}
                >
                  <FormBody>
                    <FormBox
                      quantity={isLogin ? 1 : 2}
                      gutterBottom={theme.spacing(2.5)}
                      gap={theme.spacing(1.5)}
                      sx={{
                        maxWidth: isLogin ? "100%" : 400,
                      }}
                    >
                      <TextField
                        onChange={emailHandler}
                        value={formControls.email.value}
                        className="gap-input"
                        color="primary"
                        label="Email"
                        type="email"
                        variant="outlined"
                        fullWidth
                        required
                        error={false}
                      />

                      {isLogin && (
                        <TextField
                          onChange={userNameHandler}
                          value={formControls.username.value}
                          className="gap-input"
                          color="primary"
                          label="Username"
                          variant="outlined"
                          fullWidth
                          required
                          error={false}
                        />
                      )}
                    </FormBox>
                    <FormBox
                      gutterBottom={theme.spacing(2.5)}
                      sx={{
                        maxWidth: isLogin ? "100%" : 400,
                      }}
                    >
                      <TextField
                        onChange={passwordHandler}
                        value={formControls.password.value}
                        className="gap-input"
                        color="primary"
                        label="Password"
                        variant="outlined"
                        type="password"
                        fullWidth
                        required
                        error={false}
                      />
                    </FormBox>
                    <FormBox>
                      <LoadingButton
                        sx={{
                          maxWidth: isLogin ? "100%" : 160,
                        }}
                        size="large"
                        color="primary"
                        type="submit"
                        endIcon={isLogin && <Send />}
                        disabled={false}
                        loading={false}
                        loadingPosition="center"
                        variant="contained"
                      >
                        Отправить
                      </LoadingButton>
                    </FormBox>
                  </FormBody>
                </form>
              </Box>
            </Box>
          </Paper>
        </FixedFullPageBody>
      </FixedFullPage>
      <PageContainer
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
        }}
      >
        <ThreeLinesLoader />
      </PageContainer>
    </>
  );
};

const mapStateToProps = (state) => ({
  msg: state.auth.msg,
});

const mapDispatchToProps = (dispatch) => ({
  login: (email, password) => dispatch(authLogin(email, password)),
  register: (email, password) => dispatch(authRegister(email, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
