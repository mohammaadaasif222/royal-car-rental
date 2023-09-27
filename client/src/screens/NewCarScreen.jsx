import React, { useState, useEffect } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/shared/Message";
import Loader from "../components/shared/Loader";
import { newCar } from "../actions/carActions";
import FormContainer from "../components/shared/FromContainer";

const NewCarScreen = ({ history }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [rentPerDay, setRentPerDay] = useState(0);
  const [vehicleModel, setVehicleModel] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [seatingCapacity, setSeatingCapacity] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.newCar);
  useEffect(() => {
    if (success) {
      history.push("/admin");
    }
  }, [history, success]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("name", name);
    formData.set("price", price);
    formData.set("description", description);
    formData.set("rentPerDay", rentPerDay);
    formData.set("vehicleModel", vehicleModel);
    formData.set("vehicleNumber", vehicleNumber);
    formData.set("seatingCapacity", seatingCapacity);
    formData.set("seatingCapacity", seatingCapacity);
    images.forEach((image) => {
      formData.append("images", image);
    });
    dispatch(newCar(formData));
  };

  const changeHandler = (e) => {
    const files = Array.from(e.target.files);

    setImagesPreview([]);
    setImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((oldArray) => [...oldArray, reader.result]);
          setImages((oldArray) => [...oldArray, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <>
      <FormContainer>
        <h1>ADD A CAR</h1>
        {loading && <Loader />}
        {error && <Message variant="danger">{error}</Message>}
        <Form onSubmit={submitHandler} encType="multipart/form-data">
          <Form.Group controlId="name">
            <Form.Label> Car Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="enter car name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="price">
            <Form.Label>Car Price</Form.Label>
            <Form.Control
              type="text"
              placeholder="enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="desciption">
            <Form.Label>Car Description</Form.Label>
            <Form.Control
              as={"textarea"}
              rows={`8`}
              name="text"
              placeholder="enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></Form.Control>
          </Form.Group>
          
          <Form.Group controlId="rentPerday">
            <Form.Label>Rent Per Day</Form.Label>
            <Form.Control
              type="text"
              name="rentPerday"
              placeholder="add rent per day"
              value={rentPerDay}
              onChange={(e) => setRentPerDay(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="vehicleModel">
            <Form.Label>Vehicle model</Form.Label>
            <Form.Control
              type="text"
              name="vehicleModel"
              placeholder="enter vehicle model"
              value={vehicleModel}
              onChange={(e) => setVehicleModel(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="vehicleNumber">
            <Form.Label>Vehicle Number</Form.Label>
            <Form.Control
              type="text"
              name="vehicleNumber"
              placeholder="enter vehicle number"
              value={vehicleNumber}
              onChange={(e) => setVehicleNumber(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="seating_capacity_name">
            <Form.Label>Seating Capacity </Form.Label>
            <Form.Control
              type="number"
              name="seating_capacity_name"
              placeholder="enter seating capacity "
              value={seatingCapacity}
              onChange={(e) => setSeatingCapacity(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="images">
            <Form.Label>Upload Images</Form.Label>
            <Form.Control
              type="file"
              placeholder="select images.."
              onChange={(e) => changeHandler(e)}
              accept="images/*"
              multiple
            ></Form.Control>
          </Form.Group>
          <Button
            type="submit"
            varient="primary"
            disabled={loading ? true : false}
          >
            ADD CAR
          </Button>
        </Form>
      </FormContainer>
      {imagesPreview.map((item, index) => {
        return <Card.Img key={index} src={item.url} variant="top" />;
      })}
    </>
  );
};

export default NewCarScreen;
