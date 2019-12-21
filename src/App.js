import React, { createContext } from "react";
import { Menu } from "semantic-ui-react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import jwt from "jsonwebtoken";
import Tour from "reactour";
import Login from "./pages/login";
import Register from "./pages/register";
import Exam from "./pages/exam";
import CreateTask from "./pages/createTask";
import ListTask from "./pages/listTask";
import PrivateRoute from "./components/PrivateRoute";

const { Provider, Consumer } = createContext();
const tourSteps = [
  {
    selector: `.list-task`,
    content: `menu ini menampilkan daftar task yang sudah dibuat oleh anda dan pengguna lain`
  },
  {
    selector: `.create-task`,
    content: `menu ini menampilkan halaman untuk membuat soal baru`
  },
  {
    selector: `.logout`,
    content: `anda dapat mengakhiri sesi anda dengan menekan menu ini`
  }
];

class App extends React.Component {
  state = {
    activeName: "",
    token: localStorage.getItem("token"),
    tourState: false
  };

  isMenuActive = name => {
    return this.state.activeName === name;
  };

  handleMenuClick = name => {
    this.setState({ activeName: name });
  };

  handleLogout = () => {
    localStorage.removeItem("token");
    this.setState({ token: null });
  };

  setToken = token => {
    localStorage.setItem("token", token);
    this.setState({ token });
  };

  isLoggedIn = () => {
    return this.state.token !== null;
  };

  getUsername = () => {
    return this.state.token ? jwt.decode(this.state.token).username : "";
  };

  handleTourCloseRequest = () => {
    localStorage.setItem("isTourDone", true);
    this.setState({
      tourState: false
    });
  };

  //cek jika user sudah pernah melakukan tour, maka user tidak perlu tour lagi
  handleTour = () => {
    localStorage.getItem("isTourDone")
      ? this.setState({
          tourState: false
        })
      : this.setState({
          tourState: true
        });
  };

  componentDidMount = () => {
    this.handleTour();
  };

  render() {
    const providerValue = {
      token: this.state.token,
      setToken: this.setToken,
      isLoggedIn: this.isLoggedIn,
      username: this.getUsername()
    };

    return (
      <Provider value={providerValue}>
        <Router>
          <Menu inverted attached>
            <Menu.Item as={Link} to="/" exact="true">
              <h3>Kuding</h3>
            </Menu.Item>

            {this.isLoggedIn() ? (
              <>
                <Tour
                  steps={tourSteps}
                  rounded={5}
                  isOpen={this.state.tourState}
                  onRequestClose={this.handleTourCloseRequest}
                  disableInteraction={true}
                  disableKeyboardNavigation={false}
                />
                <Menu.Item
                  as={Link}
                  className="list-task"
                  name="List Task"
                  to="/"
                  onClick={() => this.handleMenuClick("List Task")}
                  active={this.isMenuActive("List Task")}
                />
                <Menu.Item
                  as={Link}
                  className="create-task"
                  name="Create Task"
                  to="/createtask"
                  onClick={() => this.handleMenuClick("Create Task")}
                  active={this.isMenuActive("Create Task")}
                />
                <Menu.Menu position="right">
                  <Menu.Item name={this.getUsername()} />
                  <Menu.Item
                    className="logout"
                    name="logout"
                    as={Link}
                    active={this.isMenuActive("logout")}
                    onClick={this.handleLogout}
                  />
                </Menu.Menu>
              </>
            ) : (
              <Menu.Menu position="right">
                <Menu.Item
                  name="logireturn ;n"
                  as={Link}
                  to="/login"
                  onClick={() => this.handleMenuClick("login")}
                  active={this.isMenuActive("login")}
                />
                <Menu.Item
                  name="register"
                  as={Link}
                  to="/register"
                  onClick={() => this.handleMenuClick("register")}
                  active={this.isMenuActive("register")}
                />
              </Menu.Menu>
            )}
          </Menu>

          <PrivateRoute
            path="/"
            exact
            component={ListTask}
            className=".tasks"
          />
          <PrivateRoute path="/createtask" component={CreateTask} />
          <PrivateRoute path="/dotask" component={Exam} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Router>
      </Provider>
    );
  }
}

export { Consumer };
export default App;
