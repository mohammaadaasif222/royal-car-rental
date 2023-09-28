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
// import AdminScreen from "./screens/AdminScreen";
import NewCarScreen from './screens/NewCarScreen'

import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";

import React, { useState } from "react";

function App() {
  const [isFirm, setIsFirm] = useState(false);
  return (
    <Router>
      <Header isFirm={setIsFirm} />
      <main className="my-3">
        <Container>
          {/* <Route path="/admin" component={AdminScreen} /> */}
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/newcar" component={ NewCarScreen} />
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
          {/* <Route path="/search/:keyword" component={HomeScreen} exact />  */}
        </Container>
      </main>

      <Footer />
    </Router>
  );
}

export default App;
