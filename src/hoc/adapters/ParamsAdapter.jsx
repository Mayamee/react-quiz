import { useParams } from "react-router-dom";

export const paramsAdapter = (Component) => {
  return (props) => {
    const params = useParams();
    return <Component {...{ ...props, ...params }} />;
  };
};
