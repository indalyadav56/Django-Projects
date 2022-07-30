import styled from "styled-components";

const OR = styled.p`
  position: relative;
  max-width: 90%;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  &::before {
    content: "";
    display: block;
    width: 150px;
    height: 2px;
    background: gray;
    left: 0;
    top: 50%;
    position: absolute;
  }
  &::after {
    content: "";
    display: block;
    width: 150px;
    height: 2px;
    background: gray;
    right: 0;
    top: 50%;
    position: absolute;
  }
`;

export default OR;
