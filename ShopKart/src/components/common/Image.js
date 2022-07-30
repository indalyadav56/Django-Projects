import styled from "styled-components";

const Img = styled.img`
  height: 100%;
  width: 100%;
  padding: 0.6rem;
`;

const Image = ({ src }) => {
  return <Img src={src} />;
};

export default Image;
