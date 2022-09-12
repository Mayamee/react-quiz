import { useTheme } from "@emotion/react";
import { Delete, Share } from "@mui/icons-material";
import { Grid, Paper, Popper } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Box } from "@mui/system";
import { useState } from "react";
import QuizCard from "../QuizCard/QuizCard";
import DropDownList from "../UI/DropDownList/DropDownList";

const QuizItemsList = ({ isAuth, user, quizes }) => {
  const config = [
    { title: "Поделиться", icon: <Share /> },
    { title: "Удалить", icon: <Delete /> },
  ];
  const theme = useTheme();
  const [anchor, setAnchor] = useState(null);
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState();
  const handleClick =
    (newPlacement) =>
    ({ currentTarget }) => {
      setAnchor(currentTarget);
      setOpen((prev) => placement !== newPlacement || !prev);
      setPlacement(newPlacement);
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
        open={open}
        anchorEl={anchor}
        placement={placement}
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
            <DropDownList config={config} />
          </Paper>
        </Box>
      </Popper>
    </>
  );
};

export default QuizItemsList;
