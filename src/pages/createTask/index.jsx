/*
 * Component that used to create task
 */

import React from 'react'
import axios from 'axios'

import { Grid, Button, Form, Segment, Input, Label } from 'semantic-ui-react'

export default class CreateTask extends React.Component {
  state = {
    title: '',
    description: '',
    test_cases: [],
    isLoading: false
  }

  // handle add test case event
  handleAddTestCase = () => {
    const { test_cases } = this.state
    test_cases.push({ input: 10, expected_output: 10 })
    this.setState({ test_cases })
  }

  // handle remove test case event
  handleRemoveTestCase = () => {
    let { test_cases } = this.state
    test_cases.pop()
    this.setState({ test_cases })
  }

  // handle submit task
  handleSubmit = () => {
    this.setState({
      isLoading: true
    })
    axios
      .post(
        'https://kuding-backend.herokuapp.com/task',
        {
          title: this.state.title,
          description: this.state.description,
          test_cases: this.state.test_cases
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      )
      .then(() => alert('Task created'))
      .finally(() => this.setState({ isLoading: false }))
  }

  // handle input change event
  handleInputChange = (index, event) => {
    const { test_cases } = this.state
    test_cases[index].input = event.target.value
    this.setState({ test_cases })
  }

  // handle expected output change event
  handleExpectedOutputChange = (index, event) => {
    const { test_cases } = this.state
    test_cases[index].expected_output = event.target.value
    this.setState({ test_cases })
  }

  // handle description change
  handleDescriptionChange = event => {
    this.setState({ description: event.target.value })
  }

  // handle title change event
  handleTitleChange = event => {
    this.setState({ title: event.target.value })
  }

  // render component
  render() {
    return (
      <>
        <Segment basic relaxed loading={this.state.isLoading}>
          <h2>Create New Task</h2>
          <Segment>
            <Form>
              <Form.Field>
                <Label>Title</Label>
                <Input
                  type="text"
                  value={this.state.title}
                  onChange={this.handleTitleChange}
                ></Input>
              </Form.Field>
            </Form>
          </Segment>

          <Segment>
            <Form>
              <Form.Field>
                <Label>Description</Label>
                <Input
                  type="text"
                  value={this.state.description}
                  onChange={this.handleDescriptionChange}
                ></Input>
              </Form.Field>
            </Form>
          </Segment>

          <Segment basic>
            <Grid columns="2" relaxed>
              <Grid.Row>
                <Grid.Column>
                  <h2>Test Case</h2>
                </Grid.Column>
                <Grid.Column textAlign="right">
                  {this.state.test_cases.length > 0 && (
                    <Button
                      circular
                      color="red"
                      onClick={this.handleRemoveTestCase}
                    >
                      -
                    </Button>
                  )}
                  <Button
                    circular
                    color="blue"
                    onClick={this.handleAddTestCase}
                  >
                    +
                  </Button>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>

          <Segment>
            {this.state.test_cases.map((test_case, index) => {
              return (
                <Grid columns="2" divided relaxed key={`${test_case}+${index}`}>
                  <Grid.Row>
                    <Grid.Column width="4">
                      <Form>
                        <Form.Field>
                          <Label>{`Test Case ${index + 1}`}</Label>
                        </Form.Field>
                      </Form>
                    </Grid.Column>
                    <Grid.Column width="12">
                      <Form>
                        <Form.Field>
                          <Label>Input</Label>
                          <Input
                            value={test_case.input}
                            onChange={event =>
                              this.handleInputChange(index, event)
                            }
                          />
                        </Form.Field>

                        <Form.Field>
                          <Label>Expected Output</Label>
                          <Input
                            value={test_case.expected_output}
                            onChange={event =>
                              this.handleExpectedOutputChange(index, event)
                            }
                          />
                        </Form.Field>
                      </Form>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              )
            })}
          </Segment>
          <Segment basic>
            <Grid relaxed>
              <Grid.Row>
                <Grid.Column textAlign="right">
                  <Button circular color="Green" onClick={this.handleSubmit}>
                    Submit
                  </Button>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        </Segment>
      </>
    )
  }
}
