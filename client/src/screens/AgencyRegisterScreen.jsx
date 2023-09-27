import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/shared/Message";
import Loader from "../components/shared/Loader";
import { registerAgency } from "../actions/agencyAction";
import FormContainer from "../components/shared/FromContainer";

const AgencyRegisterScreen = ({ location, history }) => {
 
  const [message, setMessage] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [piturePreview, setPicturePreview] = useState("");
  const [picture, setPicture] = useState();

  const [agency, setAgency] = useState({
    agency_name: "",
    email: "",
    password: "",
  });

  const { agency_name, email, password } = agency;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const dispatch = useDispatch();
  const agencyRegister = useSelector((state) => state.agencyRegister);
  const { loading, error, agencyInfo } = agencyRegister;

  useEffect(() => {
    if (agencyInfo) {
      history.push(redirect);
    }
  }, [history, agencyInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    //dispatch
    if (password !== confirmPassword) {
      setMessage("Password do not macth");
    } else {
      const formData = new FormData();

      formData.set("agency_name", agency_name);
      formData.set("email", email);
      formData.set("password", password);
      formData.set("picture", picture);
      dispatch(registerAgency(formData));
    }
  };

  const onChangeHandler = (event) => {
    if (event.target.name === "picture") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setPicturePreview(reader.result);
          setPicture(reader.result);
        }
      };
      reader.readAsDataURL(event.target.files[0]);
    } else {
      setAgency({ ...agency, [event.target.name]: event.target.value });
    }
  };
  return (
    <>
      <FormContainer>
        <h1>Register a Agency </h1>
        {error && <Message varient="danger">{error}</Message>}
        {loading && <Loader />}
        {message && <Message variant="danger">{message}</Message>}
        <Form onSubmit={submitHandler} encType="multipart/form-data">
          <Form.Group controlId="email">
            <Form.Label>Agency Name</Form.Label>
            <Form.Control
              type="text"
              name="agency_name"
              placeholder="enter agency_name"
              value={agency_name}
              onChange={(e) => onChangeHandler(e)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Work Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="enter email"
              value={email}
              onChange={(e) => onChangeHandler(e)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              autoComplete="true"
              placeholder="enter password"
              value={password}
              onChange={(e) => onChangeHandler(e)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Re-enter password"
              autoComplete="true"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="picture">
            <Form.Label>Upload Agency Photo</Form.Label>
            <Form.Control
              type="file"
              name="picture"
              placeholder="choose an image.."
              onChange={(e) => onChangeHandler(e)}
              accept="images/*"
            ></Form.Control>
          </Form.Group>
          <Button
            type="submit"
            varient="primary"
            disabled={loading ? true : false}
          >
            REGISTER
          </Button>
        </Form>
        <Row>
          <Col>
            Have an account !
            <Link to={redirect ? `login?redirect=${redirect}` : "/login"}>
              Login
            </Link>
          </Col>
        </Row>
      </FormContainer>
      <img src={piturePreview} width="100" height="150" alt={agency_name} />
    </>
  );
};

export default AgencyRegisterScreen;
