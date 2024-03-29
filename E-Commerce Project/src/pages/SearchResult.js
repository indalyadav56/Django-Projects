import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NavBar from ".././components/header/NavBar";
import axios from "axios";
import { API } from "../env";
import { Container, Grid, Typography } from "@material-ui/core";
import Headline from "../components/common/Headline";
import SingleBrandName from "../components/common/SingleBrandName";
import AllProducts from "../components/common/AllProducts";

const SearchResult = () => {
  const { q } = useParams();
  const [result, setResult] = useState(null);

  useEffect(() => {
    const getSearch = async () => {
      await axios({
        url: `${API}/search/${q}/`,
        method: "GET",
      }).then((response) => {
        console.log("SearchResultPage===", response.data);
        setResult(response.data);
      });
    };
    getSearch();
  }, [q]);

  return (
    <>
      <NavBar />
      <Container>
        <Typography variant="h4">Search Result For:"{q}"</Typography>
        <Grid container direction="column">
          {result?.brand?.length !== 0 && (
            <Grid
              container
              direction="row"
              justify="center"
              alignItem="center"
              spacing={2}
            >
              <Headline title="Brand" />
              {result?.brand?.map((item, i) => (
                <Grid xs={6} sm={3} md={2} lg={2} item>
                  <SingleBrandName key={i} item={item} />
                </Grid>
              ))}
            </Grid>
          )}
          {result?.category?.length !== 0 && (
            <Grid
              container
              direction="row"
              justify="center"
              alignItem="center"
              spacing={2}
            >
              <Headline title="Categoris" />
              {result?.category?.map((item, i) => (
                <Grid xs={6} sm={3} md={2} lg={2} item>
                  <SingleBrandName key={i} item={item} />
                </Grid>
              ))}
            </Grid>
          )}
          {result?.products?.length !== 0 && (
            <Grid
              container
              direction="row"
              justify="center"
              alignItem="center"
              spacing={2}
            >
              <Headline title="Products" />
              <AllProducts products={result?.products} showall={true} />
            </Grid>
          )}
        </Grid>
      </Container>
    </>
  );
};

export default SearchResult;
