import jwtDecode from "jwt-decode";
import setAuthToken from "./setAuthToken";
import { login, register } from "./actions";
import { loginPost, registerPost } from "../http";
import { timeSheetTypes } from "../actions/actiontypes/TimeSheetTypes";
import { alertSuccess, alertError, alertClear } from "../actions";
import axios from "axios";

export const addTimeSheet = (data) => (dispatch) => {
  console.log("TimeSheet Action Data", data);
  //   let TrueData = JSON.stringify(data);
  axios
    .post("http://localhost:5000/api/Timesheets/add/", data)
    .then((res) => {
      // dispatch({
      //   type: timeSheetTypes.addTimeSheet,
      //   payload: res.data,
      // });

      dispatch(alertSuccess("TimeSheet has been added "));

      setTimeout(function () {
        dispatch(alertClear());
      }, 1000);
    })
    .catch(() => {
      dispatch(alertError("Please fill all fields properly"));

      setTimeout(function () {
        dispatch(alertClear());
      }, 1000);
    });
};
