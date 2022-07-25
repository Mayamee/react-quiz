import classes from "./Loader.module.scss";

const Loader = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <div className={classes.Loader}>
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
};

export default Loader;
