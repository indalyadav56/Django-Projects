import styled from "styled-components";
const MainContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 70%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 1rem;
  box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%),
    0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px;

  .rightside_div {
    padding: 1.5rem;
    .container {
      margin-left: 1rem;
    }
  }
`;

const Container = ({ children }) => {
  return <MainContainer>{children}</MainContainer>;
};

export default Container;
