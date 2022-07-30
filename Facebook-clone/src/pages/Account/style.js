import styled from "styled-components";
import { Button } from "@material-ui/core";

export const Div = styled.div``;
export const Title = styled.h1`
  margin-top: 10;
  color: white;
  font-weight: bold;
  text-align: center;
`;
export const ImgWraper = styled.div`
  width: 98%;
  height: 60%;
  display: flex;
  align-items: flex-end;
`;
export const Img = styled.img`
  width: 95%;
`;

export const Form = styled.form`
  margin-top: 30px;
  padding: 8px;
`;

export const LoginButton = styled(Button)`
  background-color: #fb641b;
  color: white;
  text-transform: capitalize;
  font-size: 15px;
  &:hover {
    background-color: purple;
  }
`;
