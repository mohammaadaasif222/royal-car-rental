import React, { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import { useDispatch, useSelector } from "react-redux";
import { listCars } from "../actions/carActions";
import { Row, Col, Container } from "react-bootstrap";
import Loader from "../components/shared/Loader";
import Message from "../components/shared/Message";
import HeroSlider from "../components/UI/HeroSlider";
import Slider from "../components/slider/Slider";
import FindCarForm from "../components/UI/FindCarForm";
import AboutSection from "../components/UI/AboutSection";
import ServicesList from "../components/UI/ServicesList";
// import carData from "../assets/data/carData";
import CarItem from "../components/UI/CarItem";
import BecomeDriverSection from "../components/UI/BecomeDriverSection";
import Testimonial from "../components/UI/Testimonial";

const HomeScreen = ({ match }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();

  const { cars, loading, error, resPerPage, carCount } = useSelector(
    (state) => state.carList
  );

  const keyword = match.params.keyword;

  useEffect(() => {
    dispatch(listCars(keyword, currentPage));
  }, [dispatch, keyword, currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <>
      <section className="p-0 hero__slider-section">
        <Slider />
        <div className="hero__form">
          <Container>
            <Row className="form__row">
              <Col lg="4" md="4">
                <div className="find__cars-left">
                  <h2>Find your best car here</h2>
                </div>
              </Col>
              <Col lg="8" md="8" sm="12">
                <FindCarForm />
              </Col>
            </Row>
          </Container>
        </div>
      </section>
      <AboutSection />

      <section>
        <Container>
          <Row>
            <Col lg="12" className="text-center mb-5">
              <h6 className="section__subtitle">Come with</h6>
              <h2 className="section__title">Hot Offers</h2>
            </Col>
            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant="danger">{error}</Message>
            ) : (
              cars.map((car) => <CarItem car={car} key={car._id} />)
            )}
          </Row>
        </Container>
      </section>
      <div className="d-flex justify-content-center mt-5">
        {carCount ? (
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={resPerPage}
            totalItemsCount={carCount}
            pageRangeDisplayed={5}
            onChange={handlePageChange}
            nextPageText="Next"
            prevPageText="Prev"
            lastPageText="Last"
            firstPageText="First"
            itemClass="page-item"
            linkClass="page-link"
          />
        ) : (
          "Loading.."
        )}
      </div>
    </>
  );
};

export default HomeScreen;
