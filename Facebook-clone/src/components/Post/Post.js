import React, { useEffect, useState } from "react";
import {
  Typography,
  Paper,
  IconButton,
  Avatar,
  Container,
  TextField,
  Button,
  Grid,
  Badge,
} from "@material-ui/core";
import styled from "styled-components";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import CommentIcon from "@material-ui/icons/Comment";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import SendIcon from "@material-ui/icons/Send";
import AddPost from "./AddPost";
import ShareIcon from "@material-ui/icons/Share";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import { getProfileData } from "../../store/actions/profileAction";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import { getLike } from "../../store/actions/postAction";
import axios from "axios";

const Div = styled(Container)`
  display: flex;
  flex-direction: column;
  margin-top: 4px;
  @media screen and (max-width: 960px) {
    width: 100%;
    align-items: center;
  }
`;
const Img = styled.img`
  width: 100%;
  object-fit: contain;
`;

const Post = ({ id, title, image, userImage, userName }) => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const history = useHistory();
  const [state, setState] = useState(false);
  const [like, setLike] = useState(false);
  const [comment, setComment] = useState(false);
  const handleComment = () => setComment(!comment);
  const handleLike = () => setLike(!like);
  const dispatch = useDispatch();
  const profileData = useSelector((state) => state.profile.profileData);
  const likeData = useSelector((state) => state.post.likeData);
  const [commentValue, setCommentValue] = useState("");
  const [commentData, setCommentData] = useState([]);
  const [userLike, setUserLike] = useState([]);

  useEffect(() => {
    dispatch(getProfileData(id));
  }, []);

  const addLike = () => {};
  useEffect(() => {
    axios({
      method: "GET",
      url: `http://127.0.0.1:8000/api/comment/${id}/`,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access"),
      },
    }).then((response) => {
      setCommentData(response.data);
    });
    axios({
      method: "GET",
      url: `http://127.0.0.1:8000/api/likes/${id}/`,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access"),
      },
    }).then((response) => {
      setUserLike(response.data);
    });
  }, []);

  return (
    <>
      <Div>
        <Grid container>
          <Grid item md={7}>
            <Paper elevation={0}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <IconButton
                  onClick={() => {
                    history.push("/profile");
                  }}
                >
                  <Avatar src={profileData?.user_image} />
                </IconButton>
                <h4 style={{ display: "flex", cursor: "pointer" }}>
                  {userName}
                </h4>
              </div>
              <Container>
                <Typography>{title}</Typography>
              </Container>
              <Img src={image} alt="" />

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginLeft: 20,
                  marginRight: 20,
                }}
              >
                <div>
                  {!like ? (
                    <div>
                      <IconButton onClick={handleLike}>
                        <Badge badgeContent={userLike?.length} color="primary">
                          <ThumbUpAltIcon />
                        </Badge>
                      </IconButton>
                      <Typography>Like</Typography>
                    </div>
                  ) : (
                    <div>
                      <IconButton onClick={handleLike}>
                        <Badge badgeContent={userLike?.length} color="primary">
                          <ThumbUpAltIcon
                            style={{
                              color: "blue",
                            }}
                          />
                        </Badge>
                      </IconButton>
                      <Typography>Liked</Typography>
                    </div>
                  )}
                </div>
                <div>
                  <IconButton onClick={handleComment}>
                    <CommentIcon />
                  </IconButton>
                </div>
                <div>
                  <IconButton>
                    <ShareIcon />
                  </IconButton>
                </div>
              </div>

              {/* comment section */}
              {comment && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: 10,
                  }}
                >
                  <IconButton>
                    <InsertEmoticonIcon />
                  </IconButton>
                  <TextField
                    type="text"
                    onChange={(e) => setCommentValue(e.target.value)}
                    autoFocus
                    value={commentValue}
                    style={{
                      flexGrow: 1,
                    }}
                  />
                  <IconButton
                    onClick={() => {
                      const formData = new FormData();
                      formData.append("id", id);
                      formData.append("title", commentValue);
                      axios
                        .post(" http://127.0.0.1:8000/api/comment/", formData, {
                          headers: {
                            Authorization:
                              "Bearer " + localStorage.getItem("access"),
                          },
                        })
                        .then((res) => {
                          if (res.status === 200) {
                            if (res.data.error === false) {
                              alert("Successfully commented!");
                              setCommentValue("");
                            }
                          }
                        });
                    }}
                  >
                    <SendIcon fontSize="large" />
                  </IconButton>
                </div>
              )}
              {/* comment list */}
              <Container
                style={{
                  marginTop: 5,
                  marginLeft: 10,
                  paddingBottom: 5,
                }}
              >
                {commentData?.map((item) => (
                  <Typography>{item?.value}</Typography>
                ))}
              </Container>
            </Paper>
          </Grid>
        </Grid>
      </Div>

      {userLike?.map((item) => {
        console.log(item.length);
      })}
    </>
  );
};

export default Post;
