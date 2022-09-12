import { Grid } from "@mui/material";
import QuizCard from "../QuizCard/QuizCard";

const QuizItemsList = ({ isAuth, user, quizes }) => {
  return (
    <Grid container spacing={3}>
      {quizes.map((quiz, index) => (
        <Grid item xs={12} md={6} lg={3} key={quiz.id}>
          <QuizCard quiz={quiz} isAuth={isAuth} user={user} />
        </Grid>
      ))}
    </Grid>
  );
};

export default QuizItemsList;
