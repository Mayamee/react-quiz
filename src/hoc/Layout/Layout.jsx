import { ChevronLeft, ChevronRight, Mail, Menu } from "@mui/icons-material";
import {
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

const drawerWidth = 220;

const Layout = ({ isAuth, children }) => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const handleDrawerOpen = () => setDrawerOpen(true);
  const handleDrawerClose = () => setDrawerOpen(false);
  const theme = useTheme();
  return (
    <AppWrapper id="app-wrapper">
      <AppBar drawerWidth={drawerWidth} position="fixed" open={isDrawerOpen}>
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
      <Drawer drawerWidth={drawerWidth} variant="permanent" open={isDrawerOpen}>
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
      <AppBarGutter />
      <Box sx={{ color: "#000", paddingLeft: "300px" }}>Main</Box>
    </AppWrapper>
  );
};

export default Layout;
