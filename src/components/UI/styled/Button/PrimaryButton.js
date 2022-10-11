import { styled } from '@mui/system'

export const PrimaryButton = styled('a')(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main,
  cursor: 'pointer',
  userSelect: 'none',
  borderBottom: '1px solid transparent',
  paddingBottom: '0.01rem',
  transition: theme.transitions.create('border-bottom-color', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  '&:hover': {
    borderBottomColor: theme.palette.primary.main,
  },
}))
