import { useState } from "react";
import {
  makeLinkToDrawer,
  removeLinksFromDrawer,
} from "../../helpers/makeLinksToDrawer";
import Drawer from "../Navigation/Drawer/Drawer";
import MenuToggle from "../Navigation/MenuToggle/MenuToggle";
import classes from "./NavBar.module.scss";

const NavBar = ({ isAuth }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  let links = [
    makeLinkToDrawer("/", "Список тестов"),
    makeLinkToDrawer("auth", "Авторизация"),
    makeLinkToDrawer("quiz-creator", "Создать тест"),
  ];
  if (isAuth) {
    links = removeLinksFromDrawer("auth", links);
    links.push(makeLinkToDrawer("logout", "Выйти"));
  }
  return (
    <div className={classes.NavBar}>
      <Drawer
        links={links}
        isOpen={isMenuOpen}
        onClose={() => setMenuOpen(false)}
      />
      <MenuToggle
        onToggle={() => setMenuOpen(!isMenuOpen)}
        isOpen={isMenuOpen}
      />
    </div>
  );
};

export default NavBar;
