import {
  AddCircleOutline,
  ChevronLeft,
  ChevronRight,
  GitHub,
  Login,
  Logout,
  Menu,
  Quiz,
  Radar,
  Telegram,
} from "@mui/icons-material";
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
} from "@mui/material";
import { grey, indigo, teal } from "@mui/material/colors";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/system";
import { useEffect } from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import AppBar from "../../components/UI/styled/AppBar/AppBar";
import AppBarGutter from "../../components/UI/styled/AppBar/AppBarGutter";
import AppWrapper from "../../components/UI/styled/AppWrapper/AppWrapper";
import Drawer from "../../components/UI/styled/Drawer/Drawer";
import DrawerHeader from "../../components/UI/styled/Drawer/DrawerHeader";
import Footer from "../../components/UI/styled/Footer/Footer";
import {
  makeLinkToDrawer,
  removeLinksFromDrawer,
} from "../../helpers/makeLinksToDrawer";

const drawerWidth = 220;

const Layout = ({ isAuth, user, children }) => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [anchor, setAnchor] = useState(null);
  const isMenuOpen = Boolean(anchor);
  const location = useLocation();
  const handleDrawerOpen = () => setDrawerOpen(true);
  const handleDrawerClose = () => setDrawerOpen(false);
  const theme = useTheme();
  console.log(location.pathname);
  let links = [
    makeLinkToDrawer("/my", "Мои тесты", <Radar />),
    makeLinkToDrawer("/", "Список тестов", <Quiz />),
    makeLinkToDrawer("/create", "Создать", <AddCircleOutline />),
    makeLinkToDrawer("/logout", "Выйти", <Logout />),
    makeLinkToDrawer("/auth", "Авторизация", <Login />),
  ];
  useEffect(() => {
    const link = links.find((link) => link.to === location.pathname);
    setTitle(link ? link.label : "");
  }, [location.pathname]);
  const renderLinks = (links) => {
    if (isAuth) {
      links = removeLinksFromDrawer(["/auth"], links);
    } else {
      links = removeLinksFromDrawer(["/logout", "/my"], links);
    }
    return links.map((link, index) => (
      <ListItem
        key={`${link.to}-${index}`}
        disablePadding
        sx={{
          display: "block",
          "& a": {
            textDecoration: "none",
            color: "inherit",
          },
          background: link.to === location.pathname ? grey[300] : null,
        }}
      >
        <Link to={link.to}>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: isDrawerOpen ? "initial" : "center",
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: isDrawerOpen ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              {link.icon}
            </ListItemIcon>
            <ListItemText
              primary={link.label}
              sx={{ opacity: isDrawerOpen ? 1 : 0 }}
            />
          </ListItemButton>
        </Link>
      </ListItem>
    ));
  };

  return (
    <AppWrapper
      id="app-wrapper"
      sx={{ display: "flex", flexDirection: "column" }}
    >
      <Box
        component="div"
        sx={{
          display: "flex",
          flexGrow: 1,
        }}
      >
        <AppBar
          elevation={1}
          drawerWidth={drawerWidth}
          position="fixed"
          open={isDrawerOpen}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(isDrawerOpen && { display: "none" }),
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
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                gap: 1.2,
              }}
            >
              <Typography>{isAuth ? user.email : "Гость"}</Typography>
              <IconButton
                onClick={({ currentTarget }) => setAnchor(currentTarget)}
              >
                <Avatar sx={{ background: isAuth ? indigo[600] : teal[400] }}>
                  {isAuth ? user.email[0].toUpperCase() : "Г"}
                </Avatar>
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
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem
                  sx={{
                    padding: 0,
                    "& a": {
                      textDecoration: "none",
                      color: "inherit",
                      display: "flex",
                      alignItems: "center",
                      padding: `${theme.spacing(1)} ${theme.spacing(1.5)}`,
                      gap: 1.2,
                    },
                  }}
                >
                  {isAuth ? (
                    <Link to="/logout">
                      <Login />
                      Выйти
                    </Link>
                  ) : (
                    <Link to="/auth">
                      <Login />
                      Авторизация
                    </Link>
                  )}
                </MenuItem>
              </MuiMenu>
            </Box>
          </Toolbar>
        </AppBar>
        <Drawer
          drawerWidth={drawerWidth}
          variant="permanent"
          open={isDrawerOpen}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? <ChevronLeft /> : <ChevronRight />}
            </IconButton>
          </DrawerHeader>
          <List>{renderLinks(links)}</List>
        </Drawer>
        <Box
          component="div"
          sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}
        >
          <AppBarGutter id="app-bar-gutter" />
          <Box
            component="main"
            id="main-wrapper"
            sx={{ flexGrow: 1, display: "flex" }}
          >
            {children}
          </Box>
        </Box>
      </Box>
      <Footer
        open={isDrawerOpen}
        drawerWidth={drawerWidth}
        sx={{
          borderTop: "1px solid #ddd",
          flexBasis: "30px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ButtonGroup sx={{ color: "#1191fa" }} variant="text">
          <Button
            color="inherit"
            href="https://github.com/Mayamee"
            target="_blank"
          >
            <GitHub />
          </Button>
          <Button color="inherit" href="https://t.me/Mayameee" target="_blank">
            <Telegram />
          </Button>
        </ButtonGroup>
      </Footer>
    </AppWrapper>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuthentificated,
  user: state.auth.user,
});

export default connect(mapStateToProps, null)(Layout);
