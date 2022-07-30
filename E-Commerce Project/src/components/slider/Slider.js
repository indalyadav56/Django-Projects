import axios from "axios";
import React, { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import SliderItem from "../common/SliderItem";
import { API } from "../../env";

const Slider = () => {
  const [slides, setSlides] = useState(null);
  useEffect(() => {
    const getSlider = async () => {
      await axios({
        url: `${API}/sliders/`,
        method: "GET",
      }).then((response) => {
        setSlides(response.data);
      });
    };
    getSlider();
  }, []);
  return (
    <Carousel interval="5000" stopAutoPlayOnHover="true">
      {slides?.map((item, i) => (
        <SliderItem key={i} item={item} />
      ))}
    </Carousel>
  );
};

export default Slider;
