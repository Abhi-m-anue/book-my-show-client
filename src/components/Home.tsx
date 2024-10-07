import { Route, Routes } from "react-router-dom";
import Movies from "./Movies";
import Movie from "./Movie";
import Header from "./Header";
import Footer from "./Footer";
import { useContext } from "react";
import AuthContext from "@/contexts/AuthContext";
import Admin from "./Admin";

function Home() {
  const { role } = useContext(AuthContext);
  return (
    <>
      <Header></Header>
      {role === "admin" && <Admin></Admin>}
      {role !== "admin" && (
        <Routes>
          <Route path="/" Component={Movies}></Route>
          <Route path="/movie/:id" Component={Movie}></Route>
        </Routes>
      )}
      <Footer></Footer>
    </>
  );
}

export default Home;
