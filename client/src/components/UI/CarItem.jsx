import React from "react";
import { Col } from "reactstrap";
import { Link } from "react-router-dom";
import "../../styles/car-item.css";

const CarItem = ({ car }) => {
  const { vehicle_model, vehicle_number, rentPerDay, name, _id } = car;

  return (
    <Col lg="4" md="4" sm="6" className="mb-5">
      <div className="car__item">
        <div className="car__img">
          {car.images.map((image, index) => {
            return <img src={image.url}  key={index}alt="" className="w-100" />;
          })}
        </div>

        <div className="car__item-content mt-4">
          <h4 className="section__title text-center">{name}</h4>
          <h6 className="rent__price text-center mt-">
            ${rentPerDay}.00 <span>/ Day</span>
          </h6>

          <div className="car__item-info d-flex align-items-center justify-content-between mt-3 mb-4" >
            <span className=" d-flex align-items-center justify-content-between gap-1 " style={{width:"30%"}}>
              <i className="ri-car-line"></i> {vehicle_model}
            </span>
            <span className=" d-flex align-items-center  justify-content-between gap-1" style={{width:"30%"}}>
              <i className="ri-settings-2-line"></i> {vehicle_model}
            </span>
            <span className=" d-flex align-items-center gap-1 justify-content-between" style={{width:"30%"}}>
              <i className="ri-timer-flash-line"></i> {vehicle_number}
            </span>
          </div>

          <button className=" w-50 car__item-btn car__btn-rent">
            <Link to={`/car/${_id}`}>Rent</Link>
          </button>

          <button className=" w-50 car__item-btn car__btn-details">
            <Link to={`/car/${_id}`}>Details</Link>
          </button>
        </div>
      </div>
    </Col>
  );
};

export default CarItem;
