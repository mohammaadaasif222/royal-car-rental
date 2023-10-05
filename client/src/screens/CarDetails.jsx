import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Rating from "../components/Rating";
import { Link } from "react-router-dom";
import { listCarDetails } from "../actions/carActions";
import BookingForm from "../components/UI/BookingForm";
import PaymentMethod from "../components/UI/PaymentMethod";
import {
  Row,
  Col,
  ListGroup,
  Button,
  Image,
  ListGroupItem,
  Form,
  Container,
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
      <Container className="pt-5">
        <Link to="/" className="btn btn-light">
          <i className="fas fa-arrow-left    "></i>
          &nbsp; GO BACK
        </Link>
      </Container>
      <section>
        <Container>
          <Row>
            <Col lg="6">
              <img
                src={car.images && car.images[0].url}
                alt={car.name}
                className="w-100"
              />
            </Col>

            <Col lg="6">
              <div className="car__info">
                <h2
                  className="section__title"
                  style={{
                    color: "#000d6b",
                    fontWeight: "600",
                    fontSize: "2rem",
                  }}
                >
                  {car.name}
                </h2>

                <div
                  className=" d-flex align-items-center gap-5 mb-4 mt-3 p-2"
                  style={{ justifyContent: "space-between", width: "80%" }}
                >
                  <h6
                    className="rent__price fw-bold fs-4"
                    style={{
                      fontSize: "1.4rem",
                      fontWeight: "bold",
                      color: "#000d6b",
                    }}
                  >
                    ${car.rentPerDay}.00 / Day
                  </h6>

                  <span className=" d-flex align-items-center gap-2">
                    <span style={{ color: "#f9a826" }}>
                      <i class="ri-star-s-fill"></i>
                      <i class="ri-star-s-fill"></i>
                      <i class="ri-star-s-fill"></i>
                      <i class="ri-star-s-fill"></i>
                      <i class="ri-star-s-fill"></i>
                    </span>
                    ({4 / 5} ratings)
                  </span>
                </div>

                <p className="section__description">
                  {car.description} Lorem ipsum dolor sit amet consectetur,
                  adipisicing elit. Harum fugiat numquam praesentium, sit
                  quibusdam beatae ut sapiente similique placeat assumenda nihil
                  eligendi facere at ad doloribus deserunt voluptatum minus eum.
                </p>

                <div
                  className=" d-flex align-items-center mt-3"
                  style={{ columnGap: "4rem" }}
                >
                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                      class="ri-roadster-line"
                      style={{ color: "#f9a826", paddingRight: "5px" }}
                    ></i>{" "}
                    {car.vehicle_model}
                  </span>

                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                      class="ri-settings-2-line"
                      style={{ color: "#f9a826", paddingRight: "5px" }}
                    ></i>{" "}
                    Automatic
                  </span>

                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                      class="ri-timer-flash-line"
                      style={{ color: "#f9a826", paddingRight: "5px" }}
                    ></i>{" "}
                    480kmpl
                  </span>
                </div>

                <div
                  className=" d-flex align-items-center mt-3"
                  style={{ columnGap: "2.8rem" }}
                >
                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                      class="ri-map-pin-line"
                      style={{ color: "#f9a826", paddingRight: "5px" }}
                    ></i>{" "}
                    GPS Navigation
                  </span>

                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                      class="ri-wheelchair-line"
                      style={{ color: "#f9a826", paddingRight: "5px" }}
                    ></i>{" "}
                    Heated seats
                  </span>

                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                      class="ri-building-2-line"
                      style={{ color: "#f9a826", paddingRight: "5px" }}
                    ></i>{" "}
                    {car.vehicle_model}
                  </span>
                </div>
              </div>
            </Col>

            <Col lg="7" className="mt-5">
              <div className="booking-info mt-5">
                <h5 className="mb-4 fw-bold ">Booking Information</h5>
                <BookingForm />
              </div>
            </Col>

            <Col lg="5" className="mt-5">
              <div className="payment__info mt-5">
                <h5 className="mb-4 fw-bold ">Payment Information</h5>
                <PaymentMethod />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default CarDetails;
