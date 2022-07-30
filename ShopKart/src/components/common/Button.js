import { Button as MyButton, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  button: {
    textTransform: "capitalize",
    marginTop: theme.spacing(2),
  },
}));

const Button = ({ children, ...props }) => {
  const classes = useStyles();
  return (
    <MyButton className={classes.button} variant="contained" {...props}>
      {children}
    </MyButton>
  );
};

export default Button;
