import { Container, Grid, Typography } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AllProducts from "../components/common/AllProducts";
import { API } from "../env";
import NavBar from "../components/header/NavBar";

const SingleBrandsProducts = () => {
  const { id } = useParams();
  const [brand, setBrand] = useState(null);
  useEffect(() => {
    const getSingleBrand = async () => {
      await axios({
        url: `${API}/singlebrands/${id}/`,
        method: "GET",
      }).then((response) => {
        setBrand(response.data[0]);
      });
    };
    getSingleBrand();
  }, []);
  return (
    <>
      <NavBar />
      <Container>
        <Grid container direction="column" alignItems="center">
          <Typography variant="h3">{brand?.title}</Typography>
          <Typography variant="p">{brand?.details}</Typography>
          <img
            style={{ width: "100%", padding: "10px" }}
            alt={brand?.title}
            src={brand?.logo}
          />
          <AllProducts products={brand?.products} showall={true} />
        </Grid>
      </Container>
    </>
  );
};

export default SingleBrandsProducts;
