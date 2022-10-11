import { styled } from '@mui/system'

export default styled('div')(({ theme, bgColor }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: bgColor || theme.palette.background.default,
  zIndex: theme.zIndex.drawer + 1,
}))
