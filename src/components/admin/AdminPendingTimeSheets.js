import React, { Fragment, useState, useEffect } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import axios from "axios";
import { Snackbar } from "../../components/alerts";
import { alertSuccess, alertClear } from "../../redux/actions";
function AdminPendingTimeSheets({ login, alert, alertSuccess, alertClear }) {
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
        axios
          .post("http://localhost:5000/api/Timesheets/getAllRecords/")
          .then((res) => {
            setAllTimeSheet(res.data);
          });
        console.log(res);
        alertSuccess("Status Updated Successfully");

        setTimeout(function () {
          alertClear();
        }, 1000);
      })
      .catch(() => {});
  };

  return (
    <Fragment>
      {alert && alert.message && alert.type ? <Snackbar /> : null}
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
            <th scope="col">Update</th>
          </tr>
        </thead>
        <tbody>
          {allSheets &&
            allSheets.map((row) =>
              row.status === "pending" ? (
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
                  <td>
                    <button
                      id={row._id}
                      style={{ marginRight: "5px" }}
                      type="button"
                      class="btn btn-success"
                      onClick={updateStatus}
                    >
                      Accept
                    </button>

                    <button
                      onClick={updateStatus}
                      id={row._id}
                      type="button"
                      class="btn btn-danger"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ) : null
            )}
        </tbody>
      </table>
    </Fragment>
  );
}
const mapStateToProps = (state) => ({
  login: state.loginReducer,
  alert: state.alertReducer,
});

const mapDispatchToProps = (dispatch) => ({
  alertSuccess: (message) => dispatch(alertSuccess(message)),
  alertClear: () => dispatch(alertClear()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AdminPendingTimeSheets));
