import { useNavigate } from "react-router-dom";

export const navigateAdapter = (Component) => {
  return (props) => {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
};
