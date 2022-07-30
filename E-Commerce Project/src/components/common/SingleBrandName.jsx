import React from "react";
import { Box, Card, CardActionArea, Typography } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";

const SingleBrandName = ({ item }) => {
  const history = useHistory();
  const showcategoryproducts = () => {
    // history.push(`category-${item?.title}-${item?.id}`);
    history.push(`brand-${item?.title}-${item?.id}`);
  };
  return (
    <CardActionArea onClick={showcategoryproducts}>
      <Card
        style={{
          width: "100%",
          height: "100px",
          backgroundColor: "#6275A3",
          backgroundImage: `url(${item.logo})`,
          backgroundSize: "100% 100%",
          padding: "5px",
          color: "white",
          position: "relative",
        }}
      >
        <Box
          style={{
            alignItems: "center",
            textAlign: "center",
            display: "flex",
            display: "grid",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        >
          <Typography variant="h4">{item?.title}</Typography>
        </Box>
      </Card>
    </CardActionArea>
  );
};

export default SingleBrandName;
