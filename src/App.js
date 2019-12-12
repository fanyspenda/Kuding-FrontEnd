import React from "react";
import { Menu } from "semantic-ui-react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Tour from "reactour";

import Exam from "./pages/exam";
import CreateTask from "./pages/createTask";
import ListTask from "./pages/listTask";
import Login from "./pages/login";
import Register from "./pages/register";

class App extends React.Component {
  state = {
    activeItem: "",
    isLoggedIn: null
  };

  componentDidMount = () => {
    let checkLogin = setInterval(() => {
      this.checkToken();
      console.log("login dicheck");
      if (this.state.isLoggedIn === true) {
        clearInterval(checkLogin);
        console.log("checking dihentikan");
      }
    }, 1000);
  };

  handleMenuClick = name => {
    this.setState({ activeItem: name });
  };

  handleLogoutClick = () => {
    localStorage.removeItem("token");
    this.setState({
      isLoggedIn: false
    });
    this.componentDidMount();
  };

  checkToken = () => {
    if (localStorage.getItem("token")) {
      this.setState({
        isLoggedIn: true
      });
    } else {
      this.setState({
        isLoggedIn: false
      });
    }
  };

  render() {
    return (
      <>
        <Router>
          <Menu inverted attached>
            <Menu.Item as={Link} to="/" exact="true">
              <h3>Kuding</h3>
            </Menu.Item>
            <Menu.Item
              color="red"
              as={Link}
              name="List Task"
              to="/"
              onClick={() => this.handleMenuClick("List Task")}
              active={this.state.activeItem === "List Task"}
            />
            <Menu.Item
              color="red"
              as={Link}
              name="Create Task"
              to="/createtask"
              onClick={() => this.handleMenuClick("Create Task")}
              active={this.state.activeItem === "Create Task"}
            />
            <Menu.Menu position="right">
              {this.state.isLoggedIn === false ? (
                <>
                  <Menu.Item
                    color="red"
                    name="register"
                    as={Link}
                    to="/register"
                    active={this.state.activeItem === "register"}
                    onClick={() => this.handleMenuClick("register")}
                  />
                  <Menu.Item
                    name="login"
                    as={Link}
                    to="/login"
                    active={this.state.activeItem === "login"}
                    onClick={() => this.handleMenuClick("login")}
                  />
                </>
              ) : (
                <Menu.Item
                  name="logout"
                  as={Link}
                  to="/login"
                  active={this.state.activeItem === "logout"}
                  onClick={this.handleLogoutClick}
                />
              )}
            </Menu.Menu>
          </Menu>

          <Route path="/" exact component={ListTask} />
          <Route path="/createtask" component={CreateTask} />
          <Route path="/dotask" component={Exam} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Router>
      </>
    );
  }
}

export default App;
