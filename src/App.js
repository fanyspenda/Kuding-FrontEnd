import React from "react";
import { Menu } from "semantic-ui-react";
import Exam from "./pages/exam";
import CreateTask from "./pages/createTask";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

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

  render() {
    return (
      <>
        <Router>
          <Menu inverted attached>
            <Menu.Item as={Link} to="/" exact>
              <h3>Kuding</h3>
            </Menu.Item>
            <Menu.Item as={Link} name="Create Task" to="/createtask" />
            <Menu.Menu position="right">
              <Menu.Item
                name="logout"
                active={this.state.activeItem === "logout"}
              />
            </Menu.Menu>
          </Menu>

          <Route path="/" exact>
            <Exam />
          </Route>
          <Route path="/createtask">
            <CreateTask />
          </Route>
        </Router>
      </>
    );
  }
}

export default App;
