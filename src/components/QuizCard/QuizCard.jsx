import { MoreVert } from '@mui/icons-material'
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  IconButton,
  Typography,
} from '@mui/material'
import { Link } from 'react-router-dom'
import { BACKEND_URL } from '../../vars'

const QuizCard = ({ quiz, user, onActionClick }) => {
  return (
    <Card
      sx={{
        '& a': {
          textDecoration: 'none',
          color: 'inherit',
        },
      }}
    >
      <Link to={`/quiz/${quiz.id}`}>
        <CardMedia
          component="img"
          height="200"
          image={quiz.logoPath ? `${BACKEND_URL}/${quiz.logoPath}` : 'img/template.png'}
        />
        <CardContent>
          <Typography variant="h6" component="div">
            {quiz.title}
          </Typography>
        </CardContent>
      </Link>
      <Divider variant="middle" />
      <CardHeader
        avatar={<Avatar>{quiz.ownerName[0].toUpperCase()}</Avatar>}
        title={quiz.ownerName}
        action={
          <IconButton
            aria-label="settings"
            id="popper-button"
            onClick={onActionClick(quiz.ownerId === user.id, quiz.id)}
          >
            <MoreVert />
          </IconButton>
        }
      />
    </Card>
  )
}

export default QuizCard
