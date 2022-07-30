import React, { useEffect, useState } from "react";
import axios from "axios";
const SamplePage = () => {
  useEffect(() => {
    const getLike = () => {
      fetch("http://127.0.0.1:8000/api/likes/2/", {
        method: "GET", // or 'PUT'
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access"),
        },
      })
        .then((res) => {
          console.log(res.json());
        })
        .then((data) => {
          console.log(data);
        });
    };

    getLike();
  }, []);
  return (
    <div>
      <h1>Hello</h1>
    </div>
  );
};

export default SamplePage;
