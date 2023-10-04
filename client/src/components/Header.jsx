import React, { useRef } from "react";
import { Navbar, Nav, Container, NavDropdown, Col, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userAction";
import { agencyLogout } from "../actions/agencyAction";
import { Route, Link, NavLink } from "react-router-dom";
import Search from "./Search";
import "../styles/header.css";

const navLinks = [
  {
    path: "/",
    display: "Home",
  },
  {
    path: "/about",
    display: "About",
  },
  {
    path: "/cars",
    display: "Cars",
  },

  {
    path: "/contact",
    display: "Contact",
  },
];

const Header = ({ isFirm }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const agencyLogin = useSelector((state) => state.agencyLogin);
  const { agencyInfo } = agencyLogin;

  const dispatch = useDispatch();
  const menuRef = useRef(null);

  const toggleMenu = () => menuRef.current.classList.toggle("menu__active");

  return (
    <header className="header">
      {/* ============ header top ============ */}
      <div className="header__top">
        <Container>
          <Row>
            <Col lg="6" md="6" sm="6">
              <div className="header__top__left">
                <span>Need Help?</span>
                <span className="header__top__help">
                  <i className="ri-phone-fill"></i> +91-9634-135-114
                </span>
              </div>
            </Col>

            <Col lg="6" md="6" sm="6">
              <div className="header__top__right d-flex align-items-center justify-content-end gap-3">
                <Nav className="ml-auto">
                  {agencyInfo ? (
                    <NavDropdown title={agencyInfo.agency.agency_name}>
                      <LinkContainer to="/dashboard"className="custom_dropDown">
                        <NavDropdown.Item>Go To Dashboard</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/newcar" className="custom_dropDown">
                        <NavDropdown.Item>Add a Car</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Item
                        onClick={() => dispatch(agencyLogout())}
                      >
                        Logout
                      </NavDropdown.Item>
                    </NavDropdown>
                  ) : userInfo ? (
                    <NavDropdown title={userInfo.user.name}>
                      <LinkContainer to="/profile" className="custom_dropDown">
                        <NavDropdown.Item>Profile</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Item onClick={() => dispatch(logout())}>
                        Logout
                      </NavDropdown.Item>
                    </NavDropdown>
                  ) : (
                    <>
                      <NavDropdown title={"Log In"}>
                        <LinkContainer to="/login" className="custom_dropDown">
                          <NavDropdown.Item onClick={() => isFirm(true)}>
                            <i className="fas fa-building pr-2"></i>
                            Agency Log In
                          </NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to="/login" className="custom_dropDown">
                          <NavDropdown.Item onClick={() => isFirm(false)}>
                            <i className="fas fa-user"></i>
                            &nbsp; Costumer Log In
                          </NavDropdown.Item>
                        </LinkContainer>
                      </NavDropdown>
                    </>
                  )}
                </Nav>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* =============== header middle =========== */}
      <div className="header__middle">
        <Container>
          <Row>
            <Col lg="4" md="3" sm="4">
              <div className="logo">
                <h1>
                  <Link to="/" className=" d-flex align-items-center gap-2">
                    <i className="ri-car-line pr-3"></i>
                    <span >
                      Car <br/> Rental
                    </span>
                  </Link>
                </h1>
              </div>
            </Col>

            <Col lg="3" md="3" sm="4">
              <div className="header__location d-flex align-items-center gap-2">
                <span>
                  <i className="ri-earth-line pr-3"></i>
                </span>
                <div className="header__location-content">
                  <h4>India</h4>
                  <h6>New Delhi, India</h6>
                </div>
              </div>
            </Col>

            <Col lg="3" md="3" sm="4">
              <div className="header__location d-flex align-items-center gap-2">
                <span>
                  <i className="ri-time-line pr-3"></i>
                </span>
                <div className="header__location-content">
                  <h4>Sunday to Friday</h4>
                  <h6>10am - 7pm</h6>
                </div>
              </div>
            </Col>

            <Col
              lg="2"
              md="3"
              sm="0"
              className=" d-flex align-items-center justify-content-end "
            >
              <button className="header__btn btn ">
                <Link to="/contact">
                  <i className="ri-phone-line"></i> Request a call
                </Link>
              </button>
            </Col>
          </Row>
        </Container>
      </div>

      {/* ========== main navigation =========== */}

      <div className="main__navbar">
        <Container>
          <div className="navigation__wrapper d-flex align-items-center justify-content-between">
            <span className="mobile__menu">
              <i className="ri-menu-line" onClick={toggleMenu}></i>
            </span>

            <div className="navigation" ref={menuRef} onClick={toggleMenu}>
              <div className="menu">
                {navLinks.map((item, index) => (
                  <NavLink
                    to={item.path}
                    className={(navClass) =>
                      navClass.isActive ? "nav__active nav__item" : "nav__item"
                    }
                    key={index}
                  >
                    {item.display}
                  </NavLink>
                ))}
              </div>
            </div>

            <div className="nav__right">
              <div className="search__box">
              <Route component={({ history }) => <Search  history={history} />} />
              </div>
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
};

export default Header;
