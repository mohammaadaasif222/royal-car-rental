import axios from "axios";
import {BASE_URL} from "../BaseUrl";
import {
  AGENCY_DETAILS_FAIL,
  AGENCY_DETAILS_REQUEST,
  AGENCY_DETAILS_RESET,
  AGENCY_DETAILS_SUCCESS,
  AGENCY_LOGIN_FAIL,
  AGENCY_LOGIN_REQUEST,
  AGENCY_LOGIN_SUCCESS,
  AGENCY_LOGOUT,
  AGENCY_REGISTER_FAIL,
  AGENCY_REGISTER_REQUEST,
  AGENCY_REGISTER_SUCCESS,
  AGENCY_UPDATE_PROFILE_FAIL,
  AGENCY_UPDATE_PROFILE_REQUEST,
  AGENCY_UPDATE_PROFILE_SUCCESS,
} from "../constants/agencyConstant";

export const agencyLogout = () => (dispatch) => {
 
  localStorage.removeItem("agencyInfo");
  dispatch({ type: AGENCY_DETAILS_RESET });
  dispatch({ type: AGENCY_LOGOUT });
};

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: AGENCY_LOGIN_REQUEST });
    const config = { headers: { "Contnet-Type": "application/json" } };
    const { data } = await axios.post(
      `${BASE_URL}/agency/login`,
      { email, password },
      config
    );
    dispatch({
      type: AGENCY_LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem("agencyInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: AGENCY_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const registerAgency = (formData) => async (dispatch) => {
  try {
    dispatch({ type: AGENCY_REGISTER_REQUEST });
    const config = { headers: { "Contnet-Type": "application/json" } };
    const { data } = await axios.post(
      `${BASE_URL}/agency`,
      formData,
      config
    );
    dispatch({
      type: AGENCY_REGISTER_SUCCESS,
      payload: data,
    });
    dispatch({
      type: AGENCY_LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem("agencyInfo", JSON.stringify(data));
  } catch (error) {
    console.log();
    dispatch({
      type: AGENCY_REGISTER_FAIL,
      payload: error.response.data.error.message,
      // error.response && error.response.data.error.message
      //   ? error.response.data.error.message
      //   : data.error.message,
    });
  }
};

export const getAgencyDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: AGENCY_DETAILS_REQUEST,
    });
    const {
      agencyLogin: { agencyInfo },
    } = getState();
    const config = {
      headers: {
        "Contnet-Type": "application/json",
        Authorization: `Bearer ${agencyInfo.token}`,
      },
    };
    const { data } = await axios.get(
      `${BASE_URL}/agency/${id}`,
      config
    );

    dispatch({
      type: AGENCY_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: AGENCY_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateAgency = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: AGENCY_UPDATE_PROFILE_REQUEST,
    });
    const {
      agenLogin: { agencyInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${agencyInfo.token}`,
      },
    };
    const { data } = await axios.put(
      `${BASE_URL}/agency/profile`,
      user,
      config
    );
    dispatch({ type: AGENCY_UPDATE_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: AGENCY_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
