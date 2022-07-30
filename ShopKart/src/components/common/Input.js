import { TextField } from "@material-ui/core";

const Input = (props) => {
  const { children } = props;
  return <TextField {...props}>{children}</TextField>;
};

export default Input;
