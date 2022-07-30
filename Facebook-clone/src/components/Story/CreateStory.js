import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Typography, Button, Avatar, IconButton } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import PopUp from "./PopUp";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { createStory, getStory } from "../../store/actions/storyAction";

const CreateStory = ({ image }) => {
  const [imageData, setImageData] = useState(null);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  const dispatch = useDispatch();

  const handleChange = async (e) => {
    const file = e.target.files[0];
    console.log(file);
    let reader = new FileReader();
    reader.onload = async function () {
      const fileTypes = ["jpg", "png", "jpeg", "PNG"];
      const fileType = file.name.split(".")[1];
      if (!fileTypes.includes(fileType)) {
        return alert(`please upload a valid file format. (${fileTypes})`);
      } else {
        setImageData(reader.result);
        setImageFile(file);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("image", imageFile);
    dispatch(createStory(formData));
    alert("Added successfully!");
    setOpenPopUp(false);
  };
  useEffect(() => {
    dispatch(getStory());
  }, []);

  return (
    <>
      <div
        style={{
          height: "70%",
          width: 220,

          // backgroundSize: "cover",
          // background: `url(${image}) no-repeat `,
          // backgroundPosition: "50% 50%",
        }}
      >
        <img src={image} style={{ width: "100%" }} />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <IconButton
          style={{
            marginTop: 15,
          }}
          onClick={() => {
            setOpenPopUp(true);
          }}
        >
          <AddCircleIcon fontSize="large" />
        </IconButton>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h6">Create a Story</Typography>
      </div>

      <PopUp
        title="Add Story"
        openPopUp={openPopUp}
        setOpenPopUp={setOpenPopUp}
      >
        <div>
          {imageData && (
            <div>
              <img
                src={imageData}
                style={{
                  width: "100%",
                }}
              />
            </div>
          )}

          <Button
            component="label"
            variant="large"
            style={{
              textTransform: "capitalize",
              backgroundColor: "purple",
              color: "white",
            }}
          >
            <input type="file" hidden onChange={handleChange} />
            Edit <span style={{ marginRight: 3 }}></span>
            <AddCircleIcon />
          </Button>
        </div>
        <br />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            style={{
              backgroundColor: "blue",
              color: "white",
              textTransform: "capitalize",
              width: 400,
            }}
            onClick={handleSubmit}
          >
            Add Story
          </Button>
        </div>
      </PopUp>
    </>
  );
};

export default CreateStory;
