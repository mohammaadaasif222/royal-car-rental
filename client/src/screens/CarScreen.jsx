import React from "react";
import { Card } from "react-bootstrap";
import Rating from "../components/Rating";
import { Link } from "react-router-dom";

const CarScreen = ({ car }) => {
  return (
    <>
      <Card className="my-3 p-3 rounded">
        <Link to={`/car/${car._id}`}>
          {car.images.map((image,index)=>{
            return <Card.Img key={index} src={image.url} variant="top" />
          })}
          
        </Link>
        <Card.Body>
          <Link to={`/car/${car._id}`}>
            <Card.Title as="div">
              <strong>{car.name}</strong>
            </Card.Title>
          </Link>
          <Card.Text as="div">
            <Rating
              text={`Model of vehicle: ${car.vehicle_model}`}
            />
          </Card.Text>
          <Card.Text as="div">
            <Rating
              text={`No. of vehicle: ${car.vehicle_number}`}
            />
          </Card.Text>
          <Card.Text as="div">
            <Rating
              text={`${car.seating_capacity} Seater`}
            />
          </Card.Text>
          <Card.Text as="div">Rent / Day $ {car.rentPerDay}</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default CarScreen;
