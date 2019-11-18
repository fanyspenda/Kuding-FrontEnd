import React from "react";
import { Segment, Button, Table, Icon } from "semantic-ui-react";
import axios from "axios";

export default class ListTask extends React.Component {
  state = {
    tasks: [],
    isLoading: true
  };

  getList = () => {
    this.setState({
      isLoading: true
    });
    axios
      .get("https://kuding-backend.herokuapp.com/task", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then(res => {
        this.setState({
          tasks: res.data
        });
      })
      .finally(() => {
        this.setState({
          isLoading: false
        });
      });
  };

  componentDidMount() {
    this.getList();
  }

  handleDeleteClick = _id => {
    this.setState({
      isLoading: true
    });
    axios
      .delete("https://kuding-backend.herokuapp.com/task/" + _id)
      .finally(() => {
        this.getList();
        alert("data berhasil dihapus!");
      });
  };

  handleSolveClick = task => {
    this.props.history.push("/dotask", { task });
  };

  render() {
    return (
      <Segment loading={this.state.isLoading} basic>
        <Table celled striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell colspan="4">Tasks</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          {this.state.tasks.map((task, index) => (
            <Table.Body>
              <Table.Row>
                <Table.Cell collapsing>
                  <Icon name="file code" />
                  <b>{task.title}</b>
                </Table.Cell>
                <Table.Cell collapsing>
                  <p
                    style={{
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      width: "400px"
                    }}
                  >{`${task.description}`}</p>
                </Table.Cell>
                <Table.Cell collapsing>
                  <Button
                    basic
                    onClick={() => this.handleDeleteClick(task._id)}
                    color="red"
                  >
                    Delete
                  </Button>
                </Table.Cell>
                <Table.Cell collapsing>
                  <Button
                    basic
                    onClick={() => this.handleSolveClick(task)}
                    color="green"
                  >
                    Solve
                  </Button>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          ))}
        </Table>
      </Segment>
    );
  }
}
