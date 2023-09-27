import axios from "axios";
import {BASE_URL} from '../BaseUrl'
import {
  CAR_LIST_REQUEST,
  CAR_LIST_SUCCESS,
  CAR_LIST_FAILS,
  CAR_ADMIN_REQUEST,
  CAR_ADMIN_SUCCESS,
  CAR_ADMIN_FAILS,
  CAR_DETAILS_REQUEST,
  CAR_DETAILS_SUCCESS,
  CAR_DETAILS_FAILS,
  DELETE_CAR_REQUEST,
  DELETE_CAR_SUCCESS,
  DELETE_CAR_FAILS,
  CAR_CREATE_REQUEST,
  CAR_CREATE_SUCCESS,
  CAR_CREATE_FAILS,
} from "../constants/carConstant";

export const newCar = (carData) => async (dispatch,getState) => {
  console.log(carData);
  try {
    dispatch({ type: CAR_CREATE_REQUEST });
    const {
      agencyLogin: { agencyInfo },
    } = getState();
    const config = {
      headers: {
        "Contnet-Type": "application/json",
        Authorization: `Bearer ${agencyInfo.token}`,
      },
    };
    const { data } = await axios.post(
      `${BASE_URL}/agency/cars/new`,
      carData,
      config
    );

    dispatch({ type: CAR_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CAR_CREATE_FAILS,
      payload: error.response && error.response.data.message,
    });
  }
};
export const listCars =
  (keyword = "", currentPage = 1) =>
  async (dispatch) => {
    try {
      dispatch({ type: CAR_LIST_REQUEST });
      const response = await axios.get(
        `${BASE_URL}/cars?keyword=${keyword}&page=${currentPage}`
      );
      
      dispatch({
        type: CAR_LIST_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: CAR_LIST_FAILS,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const agencyCars = () => async (dispatch) => {
  try {
    dispatch({ type: CAR_ADMIN_REQUEST });
    const { data } = await axios.get(`${BASE_URL}/agency/cars`);
    dispatch({
      type: CAR_ADMIN_SUCCESS,
      payload: data,
    });
    console.log(data);
  } catch (error) {
    dispatch({
      type: CAR_ADMIN_FAILS,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listCarDetails = (id) => async (dispatch) => {

  try {
    dispatch({ type: CAR_DETAILS_REQUEST });
    const response = await axios.get(`${BASE_URL}/cars/${id}`);
    dispatch({ type: CAR_DETAILS_SUCCESS, payload: response.data.car });
  } catch (error) {
    dispatch({
      type: CAR_DETAILS_FAILS,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const deleteCar = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_CAR_REQUEST });
    const response = await axios.delete(
      `${BASE_URL}/agency/cars/${id}`
    );

    dispatch({ type: DELETE_CAR_SUCCESS, payload: response.data.success });
  } catch (error) {
    dispatch({
      type: DELETE_CAR_FAILS,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
