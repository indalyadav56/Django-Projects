import React from "react";
import NavBar from "./components/Header/NavBar";
import Home from "./pages/HomePage/Home";
import { Switch, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import GlobalStyle from "./styles/GlobalStyle";
import Profile from "./components/Profile/Profile";
import EditProfile from "./components/Profile/EditProfile";
import Login from "./pages/Account/Login";
import Register from "./pages/Account/Register";
import SamplePage from "./components/SamplePage";
import People from "./components/User/People";
import Photos from "./components/Photos";
const App = () => {
  return (
    <>
      <GlobalStyle />
      <NavBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/edit/profile" component={EditProfile} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/sample" component={SamplePage} />
        <Route exact path="/friends" component={People} />
        <Route exact path="/photos" component={Photos} />
      </Switch>
      <Footer />
    </>
  );
};

export default App;
