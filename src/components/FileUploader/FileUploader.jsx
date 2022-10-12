import { useTheme } from '@emotion/react'
import { Box } from '@mui/system'
import { useRef } from 'react'
import { Button as MuiButton, Typography } from '@mui/material'

const acceptedTypes = ['image/png', 'image/jpg', 'image/jpeg']

const FileUploader = ({ file: fileState, onFile }) => {
  const theme = useTheme()
  const fileUploader = useRef(null)

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (acceptedTypes.includes(file.type)) {
      console.log(event.target.files[0])
      onFile(file)
    }
  }
  const handleClick = () => {
    fileUploader.current.click()
  }
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: `${theme.spacing(2)}`,
      }}
    >
      <input
        type="file"
        onChange={handleFileChange}
        accept=".png, .jpg, .jpeg"
        ref={fileUploader}
        style={{
          opacity: 0,
          visibility: 'hidden',
          width: 0,
          height: 0,
          position: 'absolute',
        }}
      />
      <MuiButton variant="contained" onClick={handleClick}>
        Загрузить логотип
      </MuiButton>
      {fileState && (
        <Typography
          sx={{
            marginLeft: `${theme.spacing(2)}`,
          }}
          component="p"
          variant="body1"
        >
          {fileState.name}
        </Typography>
      )}
    </Box>
  )
}

export default FileUploader
