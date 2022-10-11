import {
  AddCircleOutline,
  ChevronLeft,
  ChevronRight,
  GitHub,
  Login,
  Menu,
  People,
  Quiz,
  Telegram,
} from '@mui/icons-material'
import {
  Avatar,
  Button,
  ButtonGroup,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Toolbar,
  Typography,
  Menu as MuiMenu,
  Divider,
} from '@mui/material'
import { grey, indigo } from '@mui/material/colors'
import { useTheme } from '@mui/material/styles'
import { Box } from '@mui/system'
import { useEffect } from 'react'
import { useState } from 'react'
import { connect } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import AppBar from '../../components/UI/styled/AppBar/AppBar'
import AppBarGutter from '../../components/UI/styled/AppBar/AppBarGutter'
import AppWrapper from '../../components/UI/styled/AppWrapper/AppWrapper'
import Drawer from '../../components/UI/styled/Drawer/Drawer'
import DrawerHeader from '../../components/UI/styled/Drawer/DrawerHeader'
import Footer from '../../components/UI/styled/Footer/Footer'
import Auth from '../../containers/Auth/Auth'
import { makeLinkToDrawer } from '../../helpers/makeLinksToDrawer'
import { authLogout } from '../../store/actions/authorization'

const drawerWidth = 220

const Layout = ({ isAuth, user, children, logout }) => {
  const navigate = useNavigate()
  const [isDrawerOpen, setDrawerOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [anchor, setAnchor] = useState(null)
  const isMenuOpen = Boolean(anchor)
  const location = useLocation()
  const handleDrawerOpen = () => setDrawerOpen(true)
  const handleDrawerClose = () => setDrawerOpen(false)
  const theme = useTheme()

  let links = [
    makeLinkToDrawer('/my', 'Мои тесты', <People />),
    makeLinkToDrawer('/', 'Список тестов', <Quiz />),
    makeLinkToDrawer('/create', 'Создать', <AddCircleOutline />),
  ]
  useEffect(() => {
    const link = links.find((link) => link.to === location.pathname)
    setTitle(link ? link.label : '')
  }, [location.pathname])
  const renderLinks = (links) => {
    return links.map((link, index) => (
      <ListItem
        key={`${link.to}-${index}`}
        disablePadding
        sx={{
          display: 'block',
          '& a': {
            textDecoration: 'none',
            color: 'inherit',
          },
          background: link.to === location.pathname ? grey[300] : null,
        }}
      >
        <Link to={link.to}>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: isDrawerOpen ? 'initial' : 'center',
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: isDrawerOpen ? 3 : 'auto',
                justifyContent: 'center',
              }}
            >
              {link.icon}
            </ListItemIcon>
            <ListItemText primary={link.label} sx={{ opacity: isDrawerOpen ? 1 : 0 }} />
          </ListItemButton>
        </Link>
      </ListItem>
    ))
  }
  const logoutHandler = () => {
    logout()
    navigate('/')
  }

  return (
    <AppWrapper id="app-wrapper" sx={{ display: 'flex', flexDirection: 'column' }}>
      {!isAuth && <Auth />}
      {isAuth && (
        <>
          <Box
            component="div"
            sx={{
              display: 'flex',
              flexGrow: 1,
            }}
          >
            <AppBar elevation={1} drawerWidth={drawerWidth} position="fixed" open={isDrawerOpen}>
              <Toolbar>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                  sx={{
                    marginRight: 5,
                    ...(isDrawerOpen && { display: 'none' }),
                  }}
                >
                  <Menu color="#fff" />
                </IconButton>
                <Typography
                  noWrap
                  variant="h6"
                  component="div"
                  sx={{
                    flexGrow: 1,
                  }}
                >
                  {title}
                </Typography>
                <Box
                  component="div"
                  id="app-avatar"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    gap: 1.2,
                  }}
                >
                  <Typography>{user.username}</Typography>
                  <IconButton onClick={({ currentTarget }) => setAnchor(currentTarget)}>
                    <Avatar sx={{ background: indigo[600] }}>{user.email[0].toUpperCase()}</Avatar>
                  </IconButton>
                  <MuiMenu
                    anchorEl={anchor}
                    id="account-menu"
                    open={isMenuOpen}
                    onClose={() => setAnchor(null)}
                    onClick={() => setAnchor(null)}
                    PaperProps={{
                      elevation: 0,
                      sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                      },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                  >
                    <MenuItem>{user.email}</MenuItem>
                    <Divider />
                    <MenuItem
                      sx={{
                        padding: 0,
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          padding: `${theme.spacing(1)} ${theme.spacing(1.5)}`,
                          gap: 1.2,
                        }}
                        onClick={logoutHandler}
                      >
                        <Login />
                        Выйти
                      </Box>
                    </MenuItem>
                  </MuiMenu>
                </Box>
              </Toolbar>
            </AppBar>
            <Drawer drawerWidth={drawerWidth} variant="permanent" open={isDrawerOpen}>
              <DrawerHeader>
                <IconButton onClick={handleDrawerClose}>
                  {theme.direction === 'rtl' ? <ChevronLeft /> : <ChevronRight />}
                </IconButton>
              </DrawerHeader>
              <List>{renderLinks(links)}</List>
            </Drawer>
            <Box component="div" sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
              <AppBarGutter id="app-bar-gutter" />
              <Box component="main" id="main-wrapper" sx={{ flexGrow: 1, display: 'flex' }}>
                {children}
              </Box>
            </Box>
          </Box>
          <Footer
            open={isDrawerOpen}
            drawerWidth={drawerWidth}
            sx={{
              borderTop: '1px solid #ddd',
              flexBasis: '30px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <ButtonGroup sx={{ color: '#1191fa' }} variant="text">
              <Button color="inherit" href="https://github.com/Mayamee" target="_blank">
                <GitHub />
              </Button>
              <Button color="inherit" href="https://t.me/ymmwmm" target="_blank">
                <Telegram />
              </Button>
            </ButtonGroup>
          </Footer>
        </>
      )}
    </AppWrapper>
  )
}

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuthentificated,
  user: state.auth.user,
})
const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(authLogout()),
})
export default connect(mapStateToProps, mapDispatchToProps)(Layout)
