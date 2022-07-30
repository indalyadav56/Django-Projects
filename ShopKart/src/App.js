import Home from "./pages/home";
import Login from "./pages/auth/login";
import SignUp from "./pages/auth/signup";
import ForgetPassword from "./pages/auth/forgetPassword";

import { CssBaseline } from "@material-ui/core";
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <>
      <CssBaseline />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/forget-password" component={ForgetPassword} />
      </Switch>
    </>
  );
}

export default App;
