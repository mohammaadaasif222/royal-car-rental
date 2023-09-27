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
  CAR_CREATE_REQUEST,
  CAR_CREATE_SUCCESS,
  CAR_CREATE_FAILS,
  DELETE_CAR_REQUEST,
  DELETE_CAR_SUCCESS,
  DELETE_CAR_FAILS,
} from "../constants/carConstant";

export const newCarReducer = (state = { cars: {} }, action) => {
  switch (action.type) {
    case CAR_CREATE_REQUEST:
      return { loading: true, cars: [] };
    case CAR_CREATE_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        cars: action.payload,
      };
    case CAR_CREATE_FAILS:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const carListReducer = (state = { cars: [] }, action) => {
  switch (action.type) {
    case CAR_LIST_REQUEST:
    case CAR_ADMIN_REQUEST:
      return { loading: true, cars: [] };
    case CAR_LIST_SUCCESS:
    case CAR_ADMIN_SUCCESS:
      return {
        loading: false,
        cars: action.payload.cars,
        resPerPage: action.payload.resPerPage,
        carCount: action.payload.countcar,
        size: action.payload.size,
      };
    case CAR_LIST_FAILS:
    case CAR_ADMIN_FAILS:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const carDetailsReducer = (
  state = { car: { } },
  action
) => {
  switch (action.type) {
    case CAR_DETAILS_REQUEST:
      return { loading: true, ...state };
    case CAR_DETAILS_SUCCESS:
      return { loading: false, car: action.payload };
    case CAR_DETAILS_FAILS:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const carReaducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_CAR_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_CAR_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    case DELETE_CAR_FAILS:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
