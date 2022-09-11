import { MoreVert } from "@mui/icons-material";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

const QuizCard = ({ quiz, isAuth, user }) => {
  return (
    <Card
      sx={{
        "& a": {
          textDecoration: "none",
          color: "inherit",
        },
      }}
    >
      <Link to={`/quiz/${quiz.id}`}>
        <CardMedia component="img" height="200" image="img/template.png" />
        <CardContent>
          <Typography variant="h6" component="div">
            {quiz.title}
          </Typography>
        </CardContent>
      </Link>

      {isAuth && (
        <>
          <Divider variant="middle" />
          <CardHeader
            avatar={<Avatar>{quiz.ownerName[0].toUpperCase()}</Avatar>}
            title={quiz.ownerName}
            action={
              user.id === quiz.ownerId ? (
                <Tooltip title="Действия" arrow>
                  <IconButton aria-label="delete">
                    <MoreVert />
                  </IconButton>
                </Tooltip>
              ) : null
            }
          />
        </>
      )}
    </Card>
  );
};

export default QuizCard;
