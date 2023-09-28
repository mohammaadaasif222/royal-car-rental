import React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userAction";
import { agencyLogout } from "../actions/agencyAction";
import { Route } from "react-router-dom";
import Search from "./Search";

const Header = ({ isFirm }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const agencyLogin = useSelector((state) => state.agencyLogin);
  const { agencyInfo } = agencyLogin;


  const dispatch = useDispatch();


  return (
    <>
      <Navbar bg="dark" expand="lg" variant="dark" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Car Rental Service</Navbar.Brand>
          </LinkContainer>
          <Route component={({ history }) => <Search history={history} />} />
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              {agencyInfo ? (
                <NavDropdown title={agencyInfo.agency.agency_name}>
                  <LinkContainer to="/dashboard">
                    <NavDropdown.Item>Go To Dashboard</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/newcar">
                    <NavDropdown.Item>Add a Car</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={()=>dispatch(agencyLogout())}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : userInfo ? (
                <NavDropdown title={userInfo.user.name}>
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={()=>dispatch(logout())}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <>
                <NavDropdown  title={"Log In"}>
                  <LinkContainer to="/login">
                    <NavDropdown.Item onClick={() => isFirm(true)}>
                      <i className="fas fa-building"></i>
                      Agency Log In
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/login">
                    <NavDropdown.Item onClick={() => isFirm(false)}>
                      <i className="fas fa-user"></i>
                      &nbsp; Costumer Log In
                    </NavDropdown.Item>
                  </LinkContainer>
                  </NavDropdown>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
