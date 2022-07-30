import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./components/account/Login";
import Register from "./components/account/Register";
import Home from "./pages/Home";
import SearchResult from "./pages/SearchResult";
import SingleBrandsProducts from "./pages/SingleBrandProduct";
import ProductDetails from "./pages/ProductDetails";
import SingleCategoryProducts from "./pages/SingleCategoryProducts";
import UserProfile from "./components/account/UserProfile";
import CartProduct from "./pages/CartProduct";
import OrderProduct from "./pages/OrderProduct";

const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/q-:q" component={SearchResult} />
      <Route exact path="/product-:title-:id" component={ProductDetails} />
      <Route
        exact
        path="/category-:title-:id"
        component={SingleCategoryProducts}
      />
      <Route exact path="/brand-:title-:id" component={SingleBrandsProducts} />

      <Route path="/profile" component={UserProfile} />
      <Route path="/cart/product" component={CartProduct} />
      <Route path="/order" component={OrderProduct} />
    </Switch>
  );
};

export default App;
