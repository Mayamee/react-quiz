import { useTheme } from "@emotion/react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

const DropDownList = ({ config }) => {
  const theme = useTheme();
  return (
    <List disablePadding>
      {config.map((item, index) => (
        <ListItem disablePadding key={`${item.title}-${index}`}>
          <ListItemButton>
            <ListItemIcon
              sx={{
                minWidth: theme.spacing(4),
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.title} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default DropDownList;