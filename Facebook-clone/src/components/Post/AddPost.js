import React, { useState, useEffect } from "react";
import {
  TextField,
  Paper,
  Typography,
  Avatar,
  Button,
  IconButton,
} from "@material-ui/core";
import styled from "styled-components";
import VideoCallIcon from "@material-ui/icons/VideoCall";
import PhotoIcon from "@material-ui/icons/Photo";
import { useHistory } from "react-router";
import ImageIcon from "@material-ui/icons/Image";
import { useSelector, useDispatch } from "react-redux";
import { getPost, createPost } from "../../store/actions/postAction";

const Div = styled.div``;
const AddPostButton = styled(Button)`
  background-color: blue;
  color: white;
  &:hover {
    background-color: green;
  }
`;
const Img = styled.img`
  width: 100%;
`;

const AddPost = () => {
  const history = useHistory();
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = () => {
      const fileTypes = ["jpg", "png", "jpeg", "PNG"];
      const fileType = file.name.split(".")[1];
      if (fileType) {
        setImage(fileReader.result);
        setImageFile(file);
      } else {
        return alert(`please upload a valid file format. (${fileTypes})`);
      }
    };
    fileReader.readAsDataURL(file);
  };

  const handleSubmitPost = () => {
    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("title", title);
    dispatch(createPost(formData));
    alert("successfully added!");
  };

  return (
    <Div>
      <Paper style={{ padding: 10 }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div>
            <IconButton
              onClick={() => {
                if (localStorage.getItem("access")) {
                  return history.push("/profile");
                }
              }}
            >
              <Avatar />
            </IconButton>
          </div>
          <div style={{ flex: "1", padding: 5 }}>
            <TextField
              onChange={(e) => setTitle(e.target.value)}
              multiline
              fullWidth
              label="add post"
            />
          </div>

          <div>
            <AddPostButton onClick={handleSubmitPost} size="medium">
              Add Post
            </AddPostButton>
          </div>
        </div>

        <div>
          {image && (
            <div>
              <Img src={image} alt="" />
            </div>
          )}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
          }}
        >
          <Button
            component="label"
            style={{
              textTransform: "capitalize",
            }}
          >
            <input type="file" hidden onChange={handleChange} />
            <ImageIcon />
          </Button>
          <Typography style={{ marginRight: 3 }} variant="subtitle2">
            Photos
          </Typography>
        </div>
      </Paper>
    </Div>
  );
};

export default AddPost;
