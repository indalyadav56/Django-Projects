import React from "react";

const ImageCard = ({ image }) => {
  return (
    <div
      style={{
        height: 250,
        width: 250,
        maxWidth: 250,
        margin: 4,
        padding: 10,
      }}
    >
      <img src={image} style={{ height: 250, width: 250, borderRadius: 10 }} />
    </div>
  );
};

export default ImageCard;
