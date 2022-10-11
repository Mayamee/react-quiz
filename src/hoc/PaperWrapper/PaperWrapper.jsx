import { useTheme } from '@emotion/react'
import { Paper } from '@mui/material'
import { Box } from '@mui/system'
import PageContainer from '../../components/UI/styled/PageContainer/PageContainer'

const PaperWrapper = ({ children }) => {
  const theme = useTheme()
  return (
    <PageContainer
      id="not-found-container"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Paper
        elevation={4}
        sx={{
          borderRadius: `${theme.spacing(2)}`,
          padding: `${theme.spacing(4)}`,
        }}
      >
        <Box>{children}</Box>
      </Paper>
    </PageContainer>
  )
}

export default PaperWrapper
