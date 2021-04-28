import React from "react";
import { Home, TimeSheet, Reports, Settings, Signup } from "../Pages";

import Login from "../Pages/login";
import PrivateRoute from "./privateroute";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
  withRouter,
} from "react-router-dom";
import { Navbar } from "../components/NavBar";
import { connect } from "react-redux";

function App(props) {
  console.log(props);
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />

        <>
          <PrivateRoute component={Navbar} />
          <PrivateRoute exact path="/home" {...props} component={Home} />
          <PrivateRoute exact path="/time-sheet" component={TimeSheet} />
          <PrivateRoute exact path="/reports" component={Reports} />
          <PrivateRoute exact path="/settings" component={Settings} />
          <Redirect from="/login" to="/home" />
        </>
      </Switch>
    </Router>
  );
}
const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
