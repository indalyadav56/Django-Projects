import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { API } from "../env";
import VisibilityIcon from "@material-ui/icons/Visibility";
import SendIcon from "@material-ui/icons/Send";
import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import SingeReview from "../components/common/SingleReview";
import NavBar from "../components/header/NavBar";
import { useSelector, useDispatch } from "react-redux";
import { addCartData } from "../store/actions/action";

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(false);
  const [review, setReview] = useState("");
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    const getproductdetailse = async () => {
      await axios({
        url: `${API}/singleproduct/${id}/`,
        method: "GET",
      }).then((response) => {
        setProduct(response.data[0]);
      });
    };
    getproductdetailse();
  }, []);

  useEffect(() => {
    const addproductview = async () => {
      await axios({
        url: `${API}/addproductview/`,
        method: "POST",
        data: {
          id: id,
        },
      }).then((response) => {
        // console.log("ProductDetails", response.data);
      });
    };
    addproductview();
  }, []);

  const handleChnage = (event) => {
    const value = event.target.value;

    setReview(event.target.value);
  };

  const sendReview = () => {
    if (review.length > 0) {
      if (window.localStorage.getItem("token")) {
        const formData = new FormData();
        formData.append("id", id);
        formData.append("title", review);

        axios
          .post(`${API}/add/review/`, formData, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((response) => {
            if (response.status === 200) {
              if (response.data.error === "false") {
                alert(response.data.message);
                window.location.reload();
              }
            }
          });
      } else {
        return history.push("/login");
      }
    } else {
      setError(true);
    }
  };

  const handleAddToCart = () => {
    if (localStorage.getItem("token")) {
      dispatch(addCartData(product.id));
      alert("Added To Cart");
      const data = localStorage.getItem("cart");
      window.localStorage.setItem("cart", parseInt(data) + 1);
    } else {
      return history.push("/login");
    }
  };

  return (
    <>
      <NavBar />
      <Container
        style={{
          paddingTop: "10px",
        }}
      >
        <Card>
          <Grid container>
            <Grid item xs={12} sm={12} md={5} lg={5}>
              <img
                style={{
                  width: "100%",
                  height: "auto",
                }}
                src={product?.image}
                alt={product?.title}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={7} lg={7}>
              <Grid container style={{ marginLeft: "10px" }}>
                <Grid item xs={12} md={6} lg={6}>
                  <Typography variant="h4">{product?.title}</Typography>
                  <Box>
                    {product?.category?.map((item, i) => (
                      <Button key={i}>{item?.title}</Button>
                    ))}
                  </Box>

                  <Box>
                    {product?.brand && (
                      <Button variant="outlined">
                        {product?.brand?.title}
                      </Button>
                    )}
                  </Box>

                  <Box>
                    {product?.discount > 0 && (
                      <Box
                        style={{
                          fontSize: "40px",
                        }}
                      >
                        {product?.discount}% OFF
                      </Box>
                    )}
                  </Box>
                  <Box>
                    {product?.oldprice && (
                      <Box
                        style={{
                          fontSize: "40px",
                          color: "red",
                          textDecoration: "line-through",
                          marginRight: "10px",
                        }}
                        component="span"
                      >
                        {product?.oldprice} INR
                      </Box>
                    )}
                    <Box
                      style={{
                        fontSize: "40px",
                        color: "black",
                      }}
                      component="span"
                    >
                      {product?.price} INR
                    </Box>
                    <Box style={{ margin: "10px 0px" }}>
                      <Button
                        size="large"
                        variant="outlined"
                        onClick={handleAddToCart}
                      >
                        Add To Cart
                      </Button>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <Card
                    style={{
                      padding: "10px",
                      margin: "15px 0px",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Button
                      endIcon={<VisibilityIcon />}
                      color="primary"
                      size="large"
                    >
                      {product?.view}
                    </Button>
                  </Card>
                </Grid>
                <Typography>{product?.details}</Typography>
              </Grid>
              <Typography variant="h3" align="center">
                Review
              </Typography>
              <Box p={3}>
                <TextField
                  label="Add Review.."
                  required
                  error={error}
                  onChange={handleChnage}
                  style={{ width: "100%" }}
                  variant="outlined"
                  InputProps={{
                    endAdornment: (
                      <IconButton onClick={sendReview}>
                        <SendIcon />
                      </IconButton>
                    ),
                  }}
                />
                {product?.review?.map((item, i) => (
                  <SingeReview key={i} item={item} />
                ))}
              </Box>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </>
  );
};

export default ProductDetails;
