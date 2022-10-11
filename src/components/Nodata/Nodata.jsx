import { Button as MuiButton, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import PaperWrapper from '../../hoc/PaperWrapper/PaperWrapper'
import { Box } from '@mui/system'
import { Warning } from '@mui/icons-material'
import { useTheme } from '@emotion/react'

const Nodata = ({ iconColor = 'red', isShowButton = true }) => {
  const navigate = useNavigate()
  const theme = useTheme()
  return (
    <PaperWrapper>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
        }}
      >
        <Typography variant="h6" component="h2">
          Данные не найдены
        </Typography>
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
      {isShowButton ? (
        <MuiButton
          variant="contained"
          sx={{
            marginTop: `${theme.spacing(2)}`,
          }}
          onClick={navigate.bind(null, '/')}
        >
          Вернуться к списку тестов
        </MuiButton>
      ) : null}
    </PaperWrapper>
  )
}

export default Nodata
