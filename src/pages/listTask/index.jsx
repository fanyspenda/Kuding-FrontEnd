import React from 'react'
import { Segment, Button, Card, Header } from 'semantic-ui-react'
import axios from 'axios'
import jwt from 'jsonwebtoken'

export default class ListTask extends React.Component {
  state = {
    tasks: [],
    isLoading: true
  }

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
      .then(res => {
        this.setState({
          tasks: res.data
        })
      })
      .finally(() => {
        this.setState({
          isLoading: false
        })
      })
  }

  componentDidMount() {
    this.getList()
  }

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
      .finally(() => {
        this.getList()
        alert('data berhasil dihapus!')
      })
  }

  handleSolveClick = task => {
    this.props.history.push('/dotask', { task })
  }

  render() {
    const token = localStorage.getItem('token')
    const { username } = jwt.decode(token)
    console.log(username)

    return (
      <Segment loading={this.state.isLoading} basic>
        <h1>Tasks</h1>
        {this.state.tasks.map((task, index) => (
          <Card key={task._id} fluid>
            <Card.Content>
              <Card.Header>{`Task ${index + 1}`}</Card.Header>
              <Card.Description>{task.description}</Card.Description>
            </Card.Content>
            <Card.Content>
              <Header icon="user" content={task.user.username} size="tiny" />
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
    )
  }
}
