import React from "react";
import styled from "styled-components";

const Div = styled.div`
  display: flex;
  position: fixed;
  height: 100vh;
  width: 100%;
  margin-top: 4px;
  max-width: 250px;
  background-color: red;
  @media screen and (max-width: 960px) {
    display: none;
  }
`;

const Widget = () => {
  return (
    <Div>
      <div>
        <h1>Widgets</h1>
        <h1>Widgets</h1>
        <h1>Widgets</h1>
        <h1>Widgets</h1>
      </div>
    </Div>
  );
};

export default Widget;
