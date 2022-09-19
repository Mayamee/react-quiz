import { styled } from "@mui/system";

export const FormBody = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
}));

export const FormBox = styled("div", {
  shouldForwardProp: (prop) =>
    prop !== "quantity" && prop !== "gap" && prop !== "gutterBottom",
})(({ theme, quantity, gap, gutterBottom }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: gap || 0,
  marginBottom: gutterBottom || 0,
  "& > *": {
    flex: `1 1 ${100 / (quantity || 1)}%`,
  },
}));
