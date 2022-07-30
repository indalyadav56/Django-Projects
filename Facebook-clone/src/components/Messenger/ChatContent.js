import { Avatar, Container, IconButton, Typography } from "@material-ui/core";
import React, { useState } from "react";
import styled from "styled-components";

const MainDiv = styled(Container)`
  color: white;
`;

const UserContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;
const MessageDiv = styled.div`
  display: flex;
  flex-direction: column;
  .chat__message_reciever {
    background-color: #3e4042;
    border-radius: 5px;
    padding: 10px;
    font-size: 16px;
    width: fit-content;
    margin: 5px;
    position: relative;
  }
  .chat__message_sender {
    background-color: #3e4042;
    border-radius: 5px;
    font-size: 16px;
    display: flex;
    width: fit-content;
    right: 0;
    padding: 10px;
    margin-top: 15px;
    margin-left: auto;
    margin-bottom: 15px;
  }
`;

const ChatContent = () => {
  const [state, setState] = useState([
    {
      message_reciever: null,
      message_sender: null,
    },
    {
      message_reciever: null,
      message_sender: null,
    },
    {
      message_reciever: null,
      message_sender: null,
    },
    {
      message_reciever: null,
      message_sender: null,
    },
    {
      message_reciever: null,
      message_sender: null,
    },
    {
      message_reciever: null,
      message_sender: null,
    },
    {
      message_reciever: null,
      message_sender: null,
    },
  ]);
  return (
    <MainDiv>
      <UserContentDiv>
        <IconButton>
          <Avatar
            style={{
              height: 60,
              width: 60,
            }}
          />
        </IconButton>
        <Typography component="p">Indal Kumar</Typography>
      </UserContentDiv>

      {state.map((item) => (
        <MessageDiv>
          <div className="chat__message_reciever">
            <p>Lorem ipsum ds, dolorum?</p>
          </div>

          <div className="chat__message_sender">
            <p>Lorem ipsum dolor sit amet.</p>
          </div>
        </MessageDiv>
      ))}
    </MainDiv>
  );
};

export default ChatContent;
