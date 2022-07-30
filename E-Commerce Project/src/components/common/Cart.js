import React, { useState } from "react";
import {
  Avatar,
  Container,
  Divider,
  Grid,
  Paper,
  Typography,
  Button,
} from "@material-ui/core";
import { useHistory } from "react-router";
import axios from "axios";
import { API } from "../../env";
import { useSelector, useDispatch } from "react-redux";

const Cart = ({ products, id }) => {
  const history = useHistory();
  const [cartItemId, setCartItemId] = useState("");
  const cart = useSelector((state) => state.cart);
  console.log("cart", cart);

  const removeCartProduct = () => {
    axios
      .delete(`${API}/cart/product/`, {
        data: {
          id: id,
          total: products.price,
        },
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (response.status === 200) {
          if (response.data.error === "false") {
            alert("Successfully Deleted");
            if (cart.cart.length > 0) {
              window.localStorage.setItem("cart", cart.cart.length - 1);
            }
            window.location.reload();
          } else {
            alert("something went wrong! try again");
          }
        }
      });
  };
  return (
    <div>
      <div style={{ display: "flex", padding: 10 }}>
        <div className="image">
          <img
            src={products.image}
            style={{ margin: 10 }}
            style={{ width: 120, height: 120, borderRadius: 10, margin: 10 }}
          />
        </div>
        <div style={{ marginTop: 5 }}>
          <Typography variant="h6">{products.title}</Typography>
          <Typography variant="subtitle2">
            <span style={{ fontWeight: "bold" }}>Price :- </span>{" "}
            {products.price}
          </Typography>
          <Button
            onClick={removeCartProduct}
            style={{ backgroundColor: "red", color: "white" }}
          >
            Remove Item
          </Button>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          style={{
            backgroundColor: "#fb641b",
            color: "white",
            marginBottom: 10,
          }}
          size="large"
          onClick={() => {
            history.push("/order");
          }}
        >
          Buy Now
        </Button>
      </div>
    </div>
  );
};

export default Cart;
