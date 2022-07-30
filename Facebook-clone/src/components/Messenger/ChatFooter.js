import React from "react";
import { TextField, IconButton } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import styled from "styled-components";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";

const MainDiv = styled.div`
  display: flex;
  align-items: center;
`;

const SendButton = styled(IconButton)`
  color: white;
`;

const Input = styled.input`
  flex-grow: 1;
  color: black;
  border-radius: 50px;
  padding: 10px;
  height: 40px;
  outline: none;
  font-size: 16px;

  border: none;
  /* .MuiTextField-root {
    color: white;
  } */
`;

const ChatFooter = () => {
  return (
    <MainDiv>
      <IconButton
        style={{
          color: "green",
        }}
      >
        <InsertEmoticonIcon
          style={{
            fontSize: 28,
          }}
        />
      </IconButton>
      <Input />
      <div>
        <SendButton>
          <SendIcon />
        </SendButton>
      </div>
    </MainDiv>
  );
};

export default ChatFooter;
