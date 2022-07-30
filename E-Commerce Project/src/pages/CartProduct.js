import {
  Avatar,
  Container,
  Divider,
  Grid,
  Paper,
  Typography,
  Button,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import NavBar from "../components/header/NavBar";
import axios from "axios";
import { API } from "../env";
import Cart from "../components/common/Cart";

const CartProduct = () => {
  const [cartProduct, setCartProduct] = useState([]);
  const [cartPrice, setCartprice] = useState("");
  const [cartQuantity, setCartQuantity] = useState("");
  const history = useHistory();
  useEffect(() => {
    const getCarProduct = async () => {
      await axios
        .get(`${API}/cart/product/`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          if (response.status === 200) {
            setCartprice(response.data[0]?.cart.total);
            setCartQuantity(response.data[0]?.quantity);
            setCartProduct(response.data);
          }
        });
    };
    if (window.localStorage.getItem("token")) {
      getCarProduct();
    } else {
      return history.push("/login");
    }
  }, []);

  return (
    <>
      <NavBar />
      <Container>
        <Grid container spacing={3}>
          <Grid item md={8} xs={12}>
            <Paper style={{ marginTop: 10, padding: 10 }}>
              <Typography variant="h5">My Cart</Typography>
              <Divider />
              {cartProduct.map((item) => {
                return (
                  <div>
                    {item.product.map((pr) => {
                      console.log("item-", item);

                      return (
                        <div>
                          <Cart products={pr} id={item.id} />
                          <Divider />
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </Paper>
          </Grid>

          {/* price details */}
          <Grid item md={4} xs={12}>
            <Paper style={{ marginTop: 10, padding: 10 }}>
              <Typography variant="h5">Price Details</Typography>
              <Divider />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: 5,
                  marginBottom: 5,
                }}
              >
                <div>
                  <Typography>Quantity : - </Typography>
                </div>
                <div>
                  <Typography>{cartQuantity}</Typography>
                </div>
              </div>
              <Divider />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <Typography variant="h6">Total : - </Typography>
                </div>
                <div>
                  <Typography variant="h6">{cartPrice}</Typography>
                </div>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default CartProduct;
