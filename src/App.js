import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Movies from "./components/movies";
import MovieForm from "./components/movieForm";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import NavBar from "./components/navBar";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import RentalForm from "./components/rentalForm";
import Logout from "./components/logout";
import { getLoggedUser } from "./services/authService";
import "./App.css";
import MyProfile from "./components/myProfile";

class App extends Component {
  state = {};
  checkUserAccess = (props) => {
    if (this.state.user) return <MovieForm {...props} />;
    return (
      <Redirect
        to={{
          pathname: "/login",
          state: props.location,
        }}
      ></Redirect>
    );
  };
  componentDidMount() {
    try {
      this.setState({ user: getLoggedUser() });
    } catch (ex) {}
  }
  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <NavBar user={user} />
        <main className="container">
          <ToastContainer />
          <Switch>
            <Route path="/logout" component={Logout} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/login" component={LoginForm} />
            <Route
              path="/movies/:id"
              render={(props) => this.checkUserAccess(props)}
            ></Route>
            <Route
              path="/movies"
              render={(props) => <Movies {...props} user={user} />}
            />
            <Route path="/profile" component={MyProfile} />
            <Route path="/rentals/new" component={RentalForm} />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
