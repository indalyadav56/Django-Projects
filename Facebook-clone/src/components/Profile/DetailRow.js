import React from "react";
import { Typography } from "@material-ui/core";
import styled from "styled-components";

const Div = styled.div`
  display: flex;
  align-items: center;
  margin-top: 4px;
`;

const DetailRow = ({ Icon, title }) => {
  return (
    <Div>
      <Icon style={{ marginRight: 8 }} />
      <Typography>{title}</Typography>
    </Div>
  );
};

export default DetailRow;
