import React, { Fragment, useState, useEffect } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Snackbar } from "../alerts";
import axios from "axios";

function AdminRejectedTimeSheets({ login }) {
  const [timeIn, setTimeIn] = useState();
  const [allSheets, setAllTimeSheet] = useState();

  useEffect(() => {
    axios
      .post("http://localhost:5000/api/Timesheets/getAllRecords/")
      .then((res) => {
        setAllTimeSheet(res.data);
      });
  }, {});

  return (
    <Fragment>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">username</th>
            <th scope="col">Time In</th>
            <th scope="col">Time Out</th>
            <th scope="col">Total Hours</th>
            <th scope="col">HS,EHS,P,PI, PFA</th>
            <th scope="col">Date</th>
            <th scope="col">Sign Date</th>
            <th scope="col">Work</th>
            <th scope="col">Signature</th>
            <th scope="col">status</th>
          </tr>
        </thead>
        <tbody>
          {allSheets &&
            allSheets.map((row) =>
              row.status === "rejected" ? (
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
              ) : null
            )}
        </tbody>
      </table>
    </Fragment>
  );
}
const mapStateToProps = (state) => ({
  login: state.loginReducer,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AdminRejectedTimeSheets));
