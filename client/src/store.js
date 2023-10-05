import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  carListReducer,
  carDetailsReducer,
  newCarReducer ,
  carReaducer
} from "./reducers/carReducer";
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
} from "./reducers/userReducers";
import {
  agencyLoginReducer,
  agencyRegisterReducer,
  agencyDetailsReducer,
  agencyUpdateProfileReducer,
} from "./reducers/agencyReducers";
import {
bookingCreateReducer
} from "./reducers/bookingReducers"





const reducer = combineReducers({
  carList: carListReducer,
  carDetails:carDetailsReducer,
  car:carReaducer,
  newCar:newCarReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  agencyLogin: agencyLoginReducer,
  agencyRegister: agencyRegisterReducer,
  agencyDetails: agencyDetailsReducer,
  agencyUpdateProfile: agencyUpdateProfileReducer,
  bookingCraete: bookingCreateReducer,
});
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const agencyInfoFromStorage = localStorage.getItem("agencyInfo")
  ? JSON.parse(localStorage.getItem("agencyInfo"))
  : null;

const initialState = {

  userLogin: { userInfo: userInfoFromStorage },
  agencyLogin: { agencyInfo: agencyInfoFromStorage },
};
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
