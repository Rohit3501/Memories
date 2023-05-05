import React from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import PostDetail from "./components/PostDetail/PostDetail";
import { Navigate } from "react-router-dom";

const App = () => {
  //as we are storing user in local storage if he.she is signed in
  //this we are doing in order to ensure that if a user is already logged in then they
  //cannot go to auth page till they are logged in so eitherw
  //they will be bring back to home aur logout page
  const user = JSON.parse(localStorage.getItem("profile"));
  console.log(user);

  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar />
        {/* earlier there were switch but now Routes */}
        {/* use Navigate instead of redirect */}
        <Routes>
          <Route path="/" element={<Navigate to="/posts" />} />          
          <Route path="/posts" exact element={<Home />} />
          <Route path="/auth" exact element={<Auth />} />
          <Route path="/posts/search" exact element={<Home />} />
          <Route path="/posts/:id" exact element={<PostDetail />} />
          <Route
            path="/posts/auth"
            element={!user ? <Auth /> : <Navigate to="/" />}
          />
        </Routes>

        {/* we are switching between two components either home or auth depending upon user is login or not */}
      </Container>
    </BrowserRouter>
  );
};

export default App;
