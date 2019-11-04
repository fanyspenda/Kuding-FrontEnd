import React from "react";
import { Menu } from "semantic-ui-react";
import Exam from "./pages/exam";
import CreateTask from "./pages/createTask";
import ListTask from "./pages/listTask";

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
            <Menu.Item as={Link} name="List Task" to="/" />
            <Menu.Item as={Link} name="Create Task" to="/createtask" />
            <Menu.Menu position="right">
              <Menu.Item
                name="logout"
                active={this.state.activeItem === "logout"}
              />
            </Menu.Menu>
          </Menu>

          <Route path="/" exact component={ListTask} />
          <Route path="/createtask" component={CreateTask} />
          <Route path="/dotask" component={Exam} />
        </Router>
      </>
    );
  }
}

export default App;
