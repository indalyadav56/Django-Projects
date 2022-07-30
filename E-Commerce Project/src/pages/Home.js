import React from "react";
import NavBar from "../components/header/NavBar";
import { Container, CssBaseline } from "@material-ui/core";
import Slider from "../components/slider/Slider";
import TrendingProduct from "../components/TrendingProduct";
import CategoryName from "../components/CategoryName";
import MostViewProduct from "../components/MostViewProduct";
import CategoryProducts from "../components/CategoryProducts";
import BrandsName from "../components/BrandsName";

const Home = () => {
  return (
    <>
      <CssBaseline />
      <NavBar />
      <Slider />
      <Container>
        <TrendingProduct />
        <CategoryName />
        <MostViewProduct />
        <CategoryProducts />
        <BrandsName />
      </Container>
    </>
  );
};

export default Home;
