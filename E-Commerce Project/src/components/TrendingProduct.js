import { Grid } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { API } from "../env";
import Headline from "../components/common/Headline";
import SingleProduct from "./common/SingleProduct";

const TrandingProduct = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getTrandingProducts = async () => {
      await axios({
        url: `${API}/trandingproducts/`,
        method: "GET",
      })
        .then((response) => {
          setProducts(response.data);
        })
        .catch((e) => {
          console.log("TrandingProducts==", e);
        });
    };
    getTrandingProducts();
  }, []);
  return (
    <Grid container spacing={2}>
      <Headline title="Trending" subtitle="Products" />
      {products?.map((item, i) => (
        <Grid key={i} md={2} sm={4} item>
          <SingleProduct product={item?.product} />
        </Grid>
      ))}
    </Grid>
  );
};

export default TrandingProduct;
