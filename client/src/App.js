import "./App.css";
import Footer from "./components/footer";
import Header from "./components/Header";
import HomeScreen from "./screens/HomeScreen";
import CarDetails from "./screens/CarDetails";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import AgencyLoginScreen from "./screens/AgencyLoginScreen";
import AgencyRegisterScreen from "./screens/AgencyRegisterScreen";
import Dashboard from "./screens/Dashboard";
import ProfileScreen from "./screens/ProfileScreen";
import About from "./screens/About";
// import AdminScreen from "./screens/AdminScreen";
import NewCarScreen from "./screens/NewCarScreen";
import CarListing from "./screens/CarListing";
import NotFound from "./screens/NotFound";
import Contact from "./screens/Contact";

import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";

import React, { useState } from "react";

function App() {
  const [isFirm, setIsFirm] = useState(false);
  return (
    <Router>
      <Header isFirm={setIsFirm} />
      <main className="pb-5">
        <>
          {/* <Route path="/admin" component={AdminScreen} /> */}
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/newcar" component={NewCarScreen} />
          <Route
            path="/login"
            component={isFirm ? AgencyLoginScreen : LoginScreen}
          />
          <Route path="/profile" component={ProfileScreen} />
          <Route
            path="/register"
            component={isFirm ? AgencyRegisterScreen : RegisterScreen}
          />

          <Route path="/car/:id" component={CarDetails} />
          <Route path="/" component={HomeScreen} exact />
          <Route path="/about" component={About} exact />
          <Route path="/contact" component={Contact} exact />
          <Route path="/cars" component={CarListing} />
          <Route path="/search/:keyword" component={HomeScreen} exact />
          {/* <Route path="*" component={NotFound} /> */}
        </>
      </main>

      <Footer />
    </Router>
  );
}

export default App;
