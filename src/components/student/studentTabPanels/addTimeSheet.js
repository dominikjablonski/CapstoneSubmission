import React, { Fragment, useState, useEffect } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { addTimeSheet } from "../../../redux/actions/timeSheetActions";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Snackbar } from "../../../components/alerts";
import { alertError, alertClear } from "../../../redux/actions";

function AddTimeSheetStudent({ login, alert, addTimeSheet }) {
  const [timeIn, setTimeIn] = useState();
  const [timeOut, setTimeOut] = useState();
  const [totalHours, setTotalHours] = useState("");
  const [firstInput, setFirstInput] = useState();
  const [date, setDate] = useState();
  const [work, setWork] = useState();
  const [signature, setSignature] = useState();
  const [signDate, setSignSignDate] = useState();
  const [status, setStatus] = useState();
  const dispatch = useDispatch();
  console.log("props", login.payload.id);
  console.log("props", alert);
  useEffect(() => {
    console.log(timeIn, timeOut);

    if (timeIn && timeOut) {
      let momentTimeIn = moment(timeIn, "HH:mm");
      let momentTimeOut = moment(timeOut, "HH:mm");

      var duration = moment.duration(momentTimeOut.diff(momentTimeIn));

      // duration in hours
      var hours = parseInt(duration.asHours());

      // duration in minutes
      var minutes = parseInt(duration.asMinutes()) % 60;
      console.log("moment", hours, minutes, "TOtal time", duration);

      var TotalHoursString = hours + ":" + minutes;
      setTotalHours(TotalHoursString);
    }
  });

  const onSubmit = (e) => {
    e.preventDefault();

    let TimeSheetData = {
      userID: login.payload.id,
      username: login.payload.username,
      timeIn,
      timeOut,
      totalHours,
      firstInput,
      date,
      work,
      signature,
      signDate,
      status: "pending",
    };
    console.log("TimeSheetData", TimeSheetData);

    addTimeSheet(TimeSheetData);

    // props.loginUser(userData);

    // props.history.push("/services-and-packages");
  };
  return (
    <Fragment>
      <form>
        <div class="form-group">
          {alert && alert.message && alert.type ? <Snackbar /> : null}
          <label for="exampleInputEmail1">HS,EHS,P,PI, PFA</label>
          <input
            required
            type="text"
            class="form-control"
            id="FirstInput"
            // aria-describedby="emailHelp"
            placeholder="(HS,EHS,P,PI, PFA)"
            onChange={(e) => {
              console.log("trigged");
              setFirstInput(e.target.value);
            }}
          />
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Date</label>
          <input
            type="date"
            class="form-control"
            id="Date"
            // aria-describedby="emailHelp"
            placeholder="Date"
            onChange={(e) => {
              console.log("trigged");
              setDate(e.target.value);
            }}
          />
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Work</label>
          <input
            type="text"
            class="form-control"
            id="Work"
            // aria-describedby="emailHelp"
            placeholder="Work"
            onChange={(e) => {
              console.log("trigged");
              setWork(e.target.value);
            }}
          />
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Time In</label>
          <input
            type="time"
            class="form-control"
            id="TimeIn"
            placeholder="Enter TimeIn"
            onChange={(e) => {
              console.log("trigged");
              setTimeIn(e.target.value);
            }}
          />
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Time Out</label>
          <input
            type="time"
            class="form-control"
            id="TimeOut"
            placeholder="Enter TimeOut"
            onChange={(e) => setTimeOut(e.target.value)}
          />
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Total Hours Calculated</label>
          <input
            type="number"
            class="form-control"
            id="TotalHours"
            placeholder={totalHours}
            value={totalHours}
            disabled
          />
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Signature</label>
          <input
            type="text"
            class="form-control"
            id="Signature"
            placeholder="Signature"
            onChange={(e) => setSignature(e.target.value)}
          />
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">SignDate</label>
          <input
            type="date"
            class="form-control"
            id="signDate"
            placeholder="Sign Date"
            onChange={(e) => setSignSignDate(e.target.value)}
          />
        </div>

        <button onClick={onSubmit} type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    </Fragment>
  );
}
const mapStateToProps = (state) => ({
  login: state.loginReducer,
  alert: state.alertReducer,
});

const mapDispatchToProps = (dispatch) => ({
  addTimeSheet: (data) => dispatch(addTimeSheet(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AddTimeSheetStudent));
