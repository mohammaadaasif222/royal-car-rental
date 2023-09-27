import {
  AGENCY_LOGIN_REQUEST,
  AGENCY_LOGIN_SUCCESS,
  AGENCY_LOGIN_FAIL,
  AGENCY_LOGOUT,
  AGENCY_REGISTER_REQUEST,
  AGENCY_REGISTER_SUCCESS,
  AGENCY_REGISTER_FAIL,
  AGENCY_DETAILS_REQUEST,
  AGENCY_DETAILS_SUCCESS,
  AGENCY_DETAILS_FAIL,
  AGENCY_UPDATE_PROFILE_REQUEST,
  AGENCY_UPDATE_PROFILE_SUCCESS,
  AGENCY_UPDATE_PROFILE_FAIL,
  AGENCY_DETAILS_RESET,
} from "../constants/agencyConstant";

export const agencyLoginReducer = (state = {}, action) => {

  switch (action.type) {
    case AGENCY_LOGIN_REQUEST:
      return { loading: true };
    case AGENCY_LOGIN_SUCCESS:
      return { loading: false, agencyInfo: action.payload };
    case AGENCY_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case AGENCY_LOGOUT:
      return {};
    default:
      return state;
  }
};
export const agencyRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case AGENCY_REGISTER_REQUEST:
      return { loading: true };
    case AGENCY_REGISTER_SUCCESS:
      return { loading: false, agencyInfo: action.payload };
    case AGENCY_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const agencyDetailsReducer = (state = { agency: {} }, action) => {

  switch (action.type) {
    case AGENCY_DETAILS_REQUEST:
      return { ...state, loading: true };
    case AGENCY_DETAILS_SUCCESS:
      return { loading: false, agency: action.payload };

    case AGENCY_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case AGENCY_DETAILS_RESET:
      return { agency: {} };
    default:
      return state;
  }
};

export const agencyUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case AGENCY_UPDATE_PROFILE_REQUEST:
      return { loading: true };
    case AGENCY_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true, agencyInfo: action.payload };
    case AGENCY_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
