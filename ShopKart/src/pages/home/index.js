import { Link } from "react-router-dom";
import NavBar from "../../components/header/NavBar";

const Home = () => {
  return (
    <>
      <NavBar />
      <h1>Indal Kumar</h1>
      <Link to="/login">Login</Link>
      <br />
      <br />
      <Link to="/signup">Sign Up</Link>
    </>
  );
};

export default Home;
