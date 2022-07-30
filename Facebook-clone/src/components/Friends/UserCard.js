import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Avatar, IconButton } from "@material-ui/core";
import PopUp from "../Story/PopUp";
import UserProfile from "../User/UserProfile";
const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});
const UserCard = () => {
  const classes = useStyles();
  const [openPopUp, setOpenPopUp] = useState(false);
  return (
    <>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image="https://images.unsplash.com/photo-1618950689988-b837413dabfd?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
            title="Contemplative Reptile"
          />
        </CardActionArea>
        <CardContent>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div>
              <IconButton>
                <Avatar
                  src="http://127.0.0.1:8000/media/profile.jpg"
                  style={{
                    width: 60,
                    height: 60,
                  }}
                />
              </IconButton>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 4,
            }}
          >
            <Typography variant="h5">Indal Kumar</Typography>
          </div>
        </CardContent>
        <CardActions>
          <Button
            onClick={() => setOpenPopUp(true)}
            style={{
              backgroundColor: "blue",
              textTransform: "capitalize",
              color: "white",
            }}
            fullWidth
          >
            Show Profile
          </Button>
        </CardActions>
      </Card>
      <PopUp title="Profile" openPopUp={openPopUp} setOpenPopUp={setOpenPopUp}>
        <UserProfile />
      </PopUp>
    </>
  );
};

export default UserCard;
