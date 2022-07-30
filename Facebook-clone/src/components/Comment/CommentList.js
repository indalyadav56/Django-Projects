import { Typography } from "@material-ui/core";
import React from "react";

const CommentList = ({ comment }) => {
  return (
    <div>
      <Typography>{comment}</Typography>
    </div>
  );
};

export default CommentList;
