import React, { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import { useDispatch, useSelector } from "react-redux";
import { listCars } from "../actions/carActions";
import { Row, Col } from "react-bootstrap";
import CarScreen from "./CarScreen";
import Loader from "../components/shared/Loader";
import Message from "../components/shared/Message";

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
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {cars.map((car) => (
            <Col key={car._id} md={3}>
              <CarScreen car={car} />
            </Col>
          ))}
        </Row>
      )}
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
          'Loading..'
        )}
      </div>
    </>
  );
};

export default HomeScreen;
