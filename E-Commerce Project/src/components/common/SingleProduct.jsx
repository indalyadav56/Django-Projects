import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
import React, { useEffect } from "react";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addCartData } from "../../store/actions/action";

const SingleProduct = ({ product }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  let history = useHistory();
  const ProductDetail = () => {
    history.push(`/product-${product.title}-${product.id}`);
  };
  const handleAddToCart = () => {
    if (localStorage.getItem("token")) {
      dispatch(addCartData(product.id));
      alert("Added To Cart");
      window.localStorage.setItem("cart", cart.cart.length + 1);
    } else {
      return history.push("/login");
    }
  };
  return (
    <Card>
      <CardActionArea onClick={ProductDetail}>
        <CardMedia component="img" height="250" image={product?.image} />
      </CardActionArea>
      <CardActionArea onClick={ProductDetail}>
        <CardContent>
          <Typography align="center" variant="h6">
            {product?.title}
          </Typography>
          <Typography align="center">
            {product?.oldprice && (
              <Box
                component="span"
                style={{
                  fontWeight: "bold",
                  fontSize: "large",
                  textDecoration: "line-through",
                  color: "red",
                  padding: "5px",
                }}
              >
                {product?.oldprice}INR
              </Box>
            )}
            <Box
              component="span"
              style={{
                fontWeight: "bold",
                fontSize: "large",
                padding: "5px",
              }}
            >
              {product?.price} INR
            </Box>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions
        style={{
          justifyContent: "center",
        }}
      >
        <Button
          endIcon={<AddShoppingCartIcon />}
          variant="outlined"
          size="large"
          color="primary"
          onClick={handleAddToCart}
        >
          Add To Cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default SingleProduct;
