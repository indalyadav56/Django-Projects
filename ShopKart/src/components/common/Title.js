import { Typography } from "@material-ui/core";

const Title = ({ children, ...others }) => {
  return <Typography {...others}>{children}</Typography>;
};

export default Title;
