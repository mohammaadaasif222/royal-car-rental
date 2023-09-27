import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Rating from "../components/Rating";
import { Link } from "react-router-dom";
import { listCarDetails } from "../actions/carActions";
import {
  Row,
  Col,
  ListGroup,
  Button,
  Image,
  ListGroupItem,
  Form,
} from "react-bootstrap";
const CarDetails = ({ history, match }) => {
  const dispatch = useDispatch();
  const carDetails = useSelector((state) => state.carDetails);
  const { car } = carDetails;

  useEffect(() => {
    dispatch(listCarDetails(match.params.id));
  }, [dispatch, match]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}`);
  };
  return (
    <>
      <Link to="/" className="btn btn-light">
        <i className="fas fa-arrow-left    "></i>
        &nbsp; GO BACK
      </Link>

      <Row>
        <Col md={6}>
          <Image src={car.images && car.images[0].url} alt={car.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroupItem>
              <h3>{car.name}</h3>
            </ListGroupItem>
            <ListGroupItem>
              <Rating text={`Model of vehicle: ${car.vehicle_model}`} />
            </ListGroupItem>
            <ListGroupItem>Price : ${car.price}</ListGroupItem>
            <ListGroupItem>
              Model of Vehicle : {car.vehicle_model}
            </ListGroupItem>
            <ListGroupItem>No. of Vehicle :{car.vehicle_number}</ListGroupItem>
            <ListGroupItem>{car.seating_capacity} Seater</ListGroupItem>
            <ListGroupItem>Rent / Day : ${car.rentPerDay}</ListGroupItem>
            <ListGroupItem>{car.description}</ListGroupItem>
          </ListGroup>
        </Col>
        <Col md={3}>
          <ListGroupItem>
            <Row>
              <Col>Agency Name :</Col>
              <Col>
                
              </Col>
            </Row>
          </ListGroupItem>
          <ListGroupItem>
            <Button
              className="btn-block"
              type="button"
              onClick={addToCartHandler}
            >
              Add to cart
            </Button>
          </ListGroupItem>
        </Col>
      </Row>
    </>
  );
};

export default CarDetails;
