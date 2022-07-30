import React, { useState } from "react";
import styled from "styled-components";
import ChatHeader from "./ChatHeader";
import ChatContent from "./ChatContent";
import ChatFooter from "./ChatFooter";
import { getUserData } from "../../store/actions/userAction";
import { useSelector, useDispatch } from "react-redux";

const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  bottom: 0;
  right: 4%;
  min-height: 400px;
  max-height: 400px;
  width: 400px;
  height: 400px;
  min-width: 400px;
  max-width: 400;
  z-index: 999;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  background-color: #242526;
`;

const ChatHeaderDiv = styled.div``;
const ChatBodyDiv = styled.div`
  flex: 1;
  overflow-y: scroll;
`;
const ChatFooterDiv = styled.div``;

const ChatBox = ({ id, state, setState }) => {
  const dispatch = useDispatch();
  const profileData = useSelector((state) => state.profile.profileData);

  const closeChat = () => {
    setState(false);
  };
  return (
    <>
      {state ? (
        <MainDiv>
          {/* chat header */}
          <ChatHeaderDiv>
            <ChatHeader closeChat={closeChat} />
          </ChatHeaderDiv>
          {/* chat body */}
          <ChatBodyDiv>
            <ChatContent />
          </ChatBodyDiv>
          {/* chat footer */}
          <ChatFooterDiv>
            <ChatFooter />
          </ChatFooterDiv>
        </MainDiv>
      ) : (
        ""
      )}
    </>
  );
};

export default ChatBox;
