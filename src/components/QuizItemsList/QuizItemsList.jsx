import { useTheme } from "@emotion/react";
import { Delete, Share } from "@mui/icons-material";
import { Grid, Paper, Popper } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Box } from "@mui/system";
import { useEffect } from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { hasIdFromParents } from "../../helpers/DOMHelpers";
import QuizCard from "../QuizCard/QuizCard";
import DropDownList from "../UI/DropDownList/DropDownList";

const QuizItemsList = ({ isAuth, user, quizes }) => {
  const theme = useTheme();
  const [quizID, setQuizID] = useState(null);
  const [anchor, setAnchor] = useState(null);
  const [open, setOpen] = useState(false);
  const config = [
    {
      title: "Поделиться",
      icon: <Share />,
      onClickHandler: (quizId) => {
        navigator.clipboard.writeText(`http://localhost:8081/quiz/${quizId}`);
        setOpen(false);
      },
    },
  ];
  const isAuthConfig = [
    ...config,
    {
      title: "Удалить",
      icon: <Delete />,
      onClickHandler: () => {
        console.log("Deleted");
        setOpen(false);
      },
    },
  ];
  const [btnConfig, setBtnConfig] = useState(config);

  useEffect(() => {
    const handleClickOutside = ({ target }) => {
      if (
        !hasIdFromParents(target, "popper-button") &&
        !hasIdFromParents(target, "popper")
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleClick =
    (isOwner, quizId) =>
    ({ currentTarget }) => {
      setQuizID(quizId);
      if (isOwner) {
        setBtnConfig(isAuthConfig);
      } else {
        setBtnConfig(config);
      }
      setAnchor(currentTarget);
      if (anchor !== currentTarget) {
        setOpen(true);
      } else {
        setOpen((openState) => !openState);
      }
    };

  return (
    <>
      <Grid container spacing={3}>
        {quizes.map((quiz, index) => (
          <Grid item xs={12} md={6} lg={3} key={quiz.id}>
            <QuizCard
              quiz={quiz}
              isAuth={isAuth}
              user={user}
              onActionClick={handleClick}
            />
          </Grid>
        ))}
      </Grid>
      <Popper
        id={"popper"}
        open={open}
        anchorEl={anchor}
        placement="right"
        disablePortal={false}
        modifiers={[
          {
            name: "flip",
            enabled: true,
            options: {
              altBoundary: false,
              rootBoundary: "viewport",
              padding: 8,
            },
          },
          {
            name: "preventOverflow",
            enabled: false,
            options: {
              altAxis: false,
              altBoundary: false,
              tether: false,
              rootBoundary: "document",
              padding: 8,
            },
          },
        ]}
      >
        <Box sx={{ padding: `0px ${theme.spacing(1)}` }}>
          <Paper sx={{ background: grey[900], "& *": { color: grey[300] } }}>
            <DropDownList config={btnConfig} quizId={quizID} />
          </Paper>
        </Box>
      </Popper>
    </>
  );
};

export default connect(null, null)(QuizItemsList);
