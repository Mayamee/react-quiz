import { styled } from '@mui/system'

export default styled('footer', {
  shouldForwardProp: (prop) => prop !== 'open' && prop !== 'drawerWidth' && prop !== 'sx',
})(({ theme, open, drawerWidth }) => ({
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  ...(!open && {
    marginLeft: `calc(${theme.spacing(7)} + 1px)`,
    width: `calc(100% - (${theme.spacing(7)} + 1px))`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    [theme.breakpoints.up('sm')]: {
      marginLeft: `calc(${theme.spacing(8)} + 1px)`,
      width: `calc(100% - (${theme.spacing(8)} + 1px))`,
    },
  }),
}))
