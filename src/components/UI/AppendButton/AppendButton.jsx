import classes from './AppendButton.module.scss'

const AppendButton = ({ children, onClick }) => {
  return (
    <button className={classes.AppendButton} type="button" onClick={onClick}>
      {children}
    </button>
  )
}

export default AppendButton
