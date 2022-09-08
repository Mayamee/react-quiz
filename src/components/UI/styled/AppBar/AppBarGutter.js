import { styled } from "@mui/system";

export default styled("div")(({ theme }) => ({
  ...theme.mixins.toolbar,
}));
