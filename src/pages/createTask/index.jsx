import React from "react";
import {
  Grid,
  Button,
  Form,
  Segment,
  Input,
  Dropdown
} from "semantic-ui-react";

export default class CreateTask extends React.Component {
  state = {
    task: "",
    testCases: [
      {
        input: 0,
        expected_output: 0
      }
    ]
  };

  addTestCase = () => {
    let newTestCase = {
      input: 10,
      expected_output: 10
    };
    let totalTestCase = this.state.testCases;
    totalTestCase.push(newTestCase);
    this.setState({
      testCase: totalTestCase
    });
  };

  removeTestCase = () => {
    let removedTestCase = this.state.testCases;
    removedTestCase.pop();
    this.setState({
      testCase: removedTestCase
    });
  };

  render() {
    return (
      <>
        <h2>Soal</h2>
        <Segment>
          <Form>
            <Form.Field>
              <Input type="text"></Input>
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
                {this.state.testCases.length > 1 ? (
                  <Button circular color="red" onClick={this.removeTestCase}>
                    -
                  </Button>
                ) : null}
                <Button circular color="blue" onClick={this.addTestCase}>
                  +
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>

        <Segment>
          {this.state.testCases.map((testCase, index) => {
            return (
              <Grid columns="2" divided relaxed key={Math.random()}>
                <Grid.Row>
                  <Grid.Column width="4">
                    <Form>
                      <Form.Field>
                        <Input value={`test case ${index + 1}`} />
                      </Form.Field>
                    </Form>
                  </Grid.Column>
                  <Grid.Column width="12">
                    <Form>
                      <Form.Field>
                        <Input label="Input" value={testCase.input} />
                      </Form.Field>

                      <Form.Field>
                        <Input
                          label="Expected Output"
                          value={testCase.expected_output}
                        />
                      </Form.Field>
                    </Form>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            );
          })}
        </Segment>
      </>
    );
  }
}
