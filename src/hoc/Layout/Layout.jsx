import { ChevronLeft, ChevronRight, Mail, Menu } from "@mui/icons-material";
import {
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/system";
import { useState } from "react";
import AppBar from "../../components/UI/styled/AppBar/AppBar";
import AppBarGutter from "../../components/UI/styled/AppBar/AppBarGutter";
import AppWrapper from "../../components/UI/styled/AppWrapper/AppWrapper";
import Drawer from "../../components/UI/styled/Drawer/Drawer";
import DrawerHeader from "../../components/UI/styled/Drawer/DrawerHeader";
import Footer from "../../components/UI/styled/Footer/Footer";

const drawerWidth = 220;

const Layout = ({ isAuth, children }) => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const handleDrawerOpen = () => setDrawerOpen(true);
  const handleDrawerClose = () => setDrawerOpen(false);
  const theme = useTheme();
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
            <Typography noWrap variant="h6" component="div">
              My quiz
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          drawerWidth={drawerWidth}
          variant="permanent"
          open={isDrawerOpen}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? <ChevronRight /> : <ChevronLeft />}
            </IconButton>
          </DrawerHeader>
          <List>
            <ListItem disablePadding sx={{ display: "block" }}>
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
                  <Mail />
                </ListItemIcon>
                <ListItemText
                  primary={"text"}
                  sx={{ opacity: isDrawerOpen ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>
        <Box
          component="div"
          sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}
        >
          <AppBarGutter id="app-bar-gutter" />
          <Box component="main" id="main-wrapper" sx={{ flexGrow: 1 }}>
            {children}
          </Box>
        </Box>
      </Box>
      <Footer
        open={isDrawerOpen}
        drawerWidth={drawerWidth}
        sx={{
          borderTop: "1px solid #ddd",
          flexBasis: "40px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Yam
      </Footer>
    </AppWrapper>
  );
};

export default Layout;
