/*
 * Component that use to show list task
 */

import React from 'react'
import { Segment, Button, Card, Header } from 'semantic-ui-react'
import axios from 'axios'
import { Consumer } from '../../App'

export default class ListTask extends React.Component {
  state = {
    tasks: [],
    isLoading: true
  }

  // do something on component did mount
  componentDidMount() {
    this.getList()
  }

  // get list of task
  getList = () => {
    this.setState({
      isLoading: true
    })
    axios
      .get('https://kuding-backend.herokuapp.com/task', {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(res => this.setState({ tasks: res.data }))
      .finally(() => this.setState({ isLoading: false }))
  }

  // handle delete click event
  handleDeleteClick = _id => {
    this.setState({
      isLoading: true
    })
    axios
      .delete('https://kuding-backend.herokuapp.com/task/' + _id, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(() => {
        this.getList()
        alert('data berhasil dihapus!')
      })
  }

  // handle solve click event
  handleSolveClick = task => {
    this.props.history.push('/dotask', { task })
  }

  // render component
  render() {
    return (
      <Consumer>
        {({ username }) => (
          <Segment loading={this.state.isLoading} basic>
            <h1>Tasks</h1>
            {this.state.tasks.map((task, index) => (
              <Card key={task._id} fluid>
                <Card.Content>
                  <Card.Header>{`Task ${index + 1}`}</Card.Header>
                  <Card.Description>{task.description}</Card.Description>
                </Card.Content>
                <Card.Content>
                  <Header
                    icon="user"
                    content={task.user.username}
                    size="tiny"
                  />
                </Card.Content>
                <Card.Content extra>
                  <Button
                    basic
                    color="green"
                    onClick={() => this.handleSolveClick(task)}
                  >
                    Solve
                  </Button>
                  {username === task.user.username && (
                    <Button
                      basic
                      color="red"
                      onClick={() => this.handleDeleteClick(task._id)}
                    >
                      Delete
                    </Button>
                  )}
                </Card.Content>
              </Card>
            ))}
          </Segment>
        )}
      </Consumer>
    )
  }
}
