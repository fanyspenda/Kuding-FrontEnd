import React from "react";
import { Menu } from "semantic-ui-react";
import Exam from "./pages/exam";
import CreateTask from "./pages/createTask";
import ListTask from "./pages/listTask";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Login from "./pages/login";

class App extends React.Component {
  state = {
    activeItem: false
  };

  handleMenuClick = (e, { name }) => {
    this.setState({ activeItem: name });

    if (this.state.activeItem === true) {
      return <CreateTask />;
    }
  };

  handleLogoutClick = () => {
    localStorage.removeItem("token");
  };

  render() {
    return (
      <>
        <Router>
          <Menu inverted attached>
            <Menu.Item as={Link} to="/" exact>
              <h3>Kuding</h3>
            </Menu.Item>
            <Menu.Item as={Link} name="List Task" to="/" />
            <Menu.Item as={Link} name="Create Task" to="/createtask" />
            <Menu.Menu position="right">
              <Menu.Item
                name="logout"
                as={Link}
                to="/login"
                active={this.state.activeItem === "logout"}
                onClick={this.handleLogoutClick}
              />
            </Menu.Menu>
          </Menu>

          <Route path="/" exact component={ListTask} />
          <Route path="/createtask" component={CreateTask} />
          <Route path="/dotask" component={Exam} />
          <Route path="/login" component={Login} />
        </Router>
      </>
    );
  }
}

export default App;
