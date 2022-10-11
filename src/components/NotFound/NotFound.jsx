import { Warning } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { Typography } from '@mui/material'
import { Button as MuiButton } from '@mui/material'
import { Box } from '@mui/system'
import { useTheme } from '@emotion/react'
import PaperWrapper from '../../hoc/PaperWrapper/PaperWrapper'

const NotFound = () => {
  const navigate = useNavigate()
  const theme = useTheme()
  return (
    <PaperWrapper>
      <Box
        component="h2"
        sx={{
          display: 'flex',
          alignItems: 'center',
          margin: `${theme.spacing(1)} 0`,
        }}
      >
        <Box component="span">Ой</Box>
        <Box
          component="span"
          sx={{
            marginLeft: `${theme.spacing(1)}`,
            width: `${theme.spacing(4)}`,
            height: `${theme.spacing(4)}`,
            '& svg': {
              width: '100%',
              height: '100%',
            },
          }}
        >
          <Warning />
        </Box>
      </Box>
      <Typography variant="h6" component="p" gutterBottom={theme.spacing(2)}>
        Эта страница не может быть отображена
      </Typography>
      <MuiButton variant="contained" onClick={navigate.bind(null, '/')}>
        На главную
      </MuiButton>
    </PaperWrapper>
  )
}

export default NotFound
