import React, { Fragment, useState, useEffect } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { Snackbar } from "../../components/alerts";
import axios from "axios";

function SeeAllTimeSheets({ login, alert }) {
  const [timeIn, setTimeIn] = useState();
  const [allSheets, setAllTimeSheet] = useState();

  useEffect(() => {
    axios
      .post("http://localhost:5000/api/Timesheets/getAllRecords/")
      .then((res) => {
        setAllTimeSheet(res.data);
      });
  }, {});

  let updateStatus = (e) => {
    let data = {
      id: e.target.id,
      status: "accepted",
    };
    console.log("class", e.target.className);
    if (e.target.className === "btn btn-success") {
      console.log("Accepted", e.target.id);
    } else {
      data.status = "rejected";
      console.log("Rejected", e.target.id);
    }
    axios
      .post("http://localhost:5000/api/Timesheets/updateStatus/", data)
      .then((res) => {
        console.log(res);
        // force a re-render
        this.forceUpdate();
      })
      .catch(() => {});
  };

  return (
    <Fragment>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">username</th>
            <th scope="col">Time In</th>
            <th scope="col">Time Out</th>
            <th scope="col">Total Hours</th>
            <th scope="col">HS,EHS, P,PI, PFA</th>
            <th scope="col">Date</th>
            <th scope="col">Sign Date</th>
            <th scope="col">Work</th>
            <th scope="col">Signature</th>
            <th scope="col">status</th>
          </tr>
        </thead>
        <tbody>
          {allSheets &&
            allSheets.map((row) => (
              <tr>
                <th scope="row">{row.name}</th>
                <td>{row.timeIn}</td>
                <td>{row.timeOut}</td>
                <td>{row.totalHours}</td>
                <td>{row.firstInput}</td>
                <td>{row.date}</td>
                <td>{row.signDate}</td>
                <td>{row.work}</td>
                <td>{row.signature}</td>
                <td className={row.status}>{row.status}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </Fragment>
  );
}
const mapStateToProps = (state) => ({
  login: state.loginReducer,
  alert: state.alertReducer,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SeeAllTimeSheets));
