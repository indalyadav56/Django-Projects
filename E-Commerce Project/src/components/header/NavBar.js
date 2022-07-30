import React, { useState, useEffect } from "react";
import {
  AppBar,
  Button,
  Toolbar,
  Typography,
  TextField,
  makeStyles,
  IconButton,
  Badge,
  Paper,
  InputBase,
  Input,
  fade,
  ClickAwayListener,
  Card,
  MenuItem,
  CssBaseline,
  Grid,
  Menu,
} from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded";
import { useHistory } from "react-router-dom";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.common.white,
    color: "black",

    marginLeft: 0,
    width: "85%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    alignItems: "right",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));
const NavBar = () => {
  const classes = useStyles();
  const [text, setText] = useState("");
  const history = useHistory();
  const cart = useSelector((state) => state.cart);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const search = () => {
    history.push(`/q-${text}`);
  };

  return (
    <>
      <CssBaseline />
      <AppBar position="sticky">
        <Toolbar>
          <Grid container>
            <Button onClick={() => history.push("/")} color="inherit">
              <Typography>E-Commerce</Typography>
            </Button>
            <Paper
              style={{ margin: "0 20px" }}
              className={classes.sectionDesktop}
            >
              <InputBase
                value={text}
                placeholder="Search Now..."
                style={{ padding: "5px" }}
                onChange={(e) => setText(e.target.value)}
              />
              <IconButton
                disabled={text.length <= 0 ? true : false}
                onClick={search}
              >
                <SearchIcon />
              </IconButton>
            </Paper>
          </Grid>
          <div className={classes.sectionMobile}>
            {localStorage.getItem("token") ? (
              <>
                <IconButton color="inherit">
                  <Badge
                    badgeContent={localStorage.getItem("cart")}
                    color="secondary"
                    onClick={() => {
                      history.push("/cart/product");
                    }}
                  >
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
                <IconButton color="inherit" onClick={handleClick}>
                  <MoreVertIcon />
                </IconButton>
              </>
            ) : (
              <>
                <IconButton
                  aria-label="show 11 new notifications"
                  color="inherit"
                >
                  <Badge badgeContent={0} color="secondary">
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
                <Button
                  color="inherit"
                  onClick={() => {
                    history.push("/login");
                  }}
                >
                  Login
                </Button>
              </>
            )}
          </div>
          <div className={classes.sectionDesktop}>
            {localStorage.getItem("token") ? (
              <>
                <IconButton
                  color="inherit"
                  onClick={() => {
                    history.push("/cart/product");
                  }}
                >
                  <Badge
                    badgeContent={localStorage.getItem("cart")}
                    color="secondary"
                  >
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
                <IconButton color="inherit" onClick={handleClick}>
                  <AccountCircle />
                </IconButton>
              </>
            ) : (
              <>
                <IconButton color="inherit">
                  <Badge badgeContent={0} color="secondary">
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
                <Button
                  color="inherit"
                  onClick={() => {
                    history.push("/login");
                  }}
                >
                  Login
                </Button>
              </>
            )}
          </div>
        </Toolbar>

        <div className={classes.sectionMobile}>
          <Toolbar style={{ width: "100%" }}>
            <div className={classes.search}>
              <InputBase
                value={text}
                placeholder="Search Products.."
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
                onChange={(e) => setText(e.target.value)}
                style={{ flexGrow: 1 }}
              />
              <Button
                disabled={text.length <= 0 ? true : false}
                color="inherit"
                onClick={search}
              >
                <SearchIcon />
              </Button>
            </div>
          </Toolbar>
        </div>
      </AppBar>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            history.push("/profile");
          }}
        >
          Profile
        </MenuItem>
        <MenuItem
          color="inherit"
          onClick={() => {
            localStorage.removeItem("token");
            window.location.reload();
            history.push("/");
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default NavBar;
