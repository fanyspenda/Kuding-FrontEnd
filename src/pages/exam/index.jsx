import React from "react";
import axios from "axios";

import AceEditor from "react-ace";
import "brace/mode/javascript";
import "brace/theme/monokai";
import "brace/ext/language_tools";

import {
  Grid,
  Button,
  Form,
  Segment,
  Input,
  Dropdown
} from "semantic-ui-react";

export default class Exam extends React.Component {
  state = {
    script: "",
    selectedTestCase: null,
    testCases: this.props.location.state.task.test_cases,
    isLoading: false
  };

  handleChange = value => {
    this.setState({
      script: value
    });
  };

  handleSubmit = () => {
    this.setState({
      isLoading: true
    });
    axios
      .post(
        `https://kuding-backend.herokuapp.com/task/${this.props.location.state.task._id}/submit`,
        {
          script: this.state.script
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      )
      .then(res => {
        this.setState({
          isLoading: true,
          testCases: res.data
        });
      })
      .finally(() => {
        this.setState({
          isLoading: false
        });
      });
  };

  handleDropdownChange = (e, data) => {
    this.setState({
      selectedTestCase: this.state.testCases[data.value]
    });
  };

  isTestCaseError = testCase => testCase.expected_output !== testCase.output;

  renderOptions = () => {
    return this.state.testCases.map((testCase, index) => ({
      text: `test case ${index + 1}`,
      value: index,
      label: {
        color: this.isTestCaseError(testCase) ? "red" : "green"
      }
    }));
  };

  render() {
    const { script, selectedTestCase, isLoading } = this.state;
    const { task } = this.props.location.state;
    return (
      <Grid columns="2" divided relaxed>
        <Grid.Row>
          <Grid.Column width="4">
            <Segment basic>{task.description}</Segment>
          </Grid.Column>

          <Grid.Column width="12">
            <Segment basic loading={isLoading}>
              <Form>
                <Form.Field>
                  <AceEditor
                    width="12"
                    placeholder="Ketikkan Kodemu di sini"
                    mode="javascript"
                    theme="monokai"
                    name="editor"
                    onChange={this.handleChange}
                    fontSize={14}
                    showPrintMargin={false}
                    highlightActiveLine={true}
                    value={script}
                    setOptions={{
                      enableBasicAutocompletion: true,
                      enableLiveAutocompletion: true,
                      enableSnippets: true,
                      showLineNumbers: true
                    }}
                  />
                </Form.Field>
                <Form.Field>
                  <Button primary onClick={this.handleSubmit}>
                    Run Test
                  </Button>
                </Form.Field>
              </Form>
            </Segment>

            {/* test cases start here */}
            <Segment disabled={isLoading} loading={isLoading}>
              <Grid columns="2" divided relaxed>
                <Grid.Row>
                  <Grid.Column width="4">
                    <Dropdown
                      placeholder="Select Test Case.."
                      fluid
                      selection
                      button
                      options={this.renderOptions()}
                      onChange={this.handleDropdownChange}
                    />
                  </Grid.Column>
                  <Grid.Column width="12">
                    <Form>
                      <Form.Field>
                        <Input
                          label="Input"
                          value={selectedTestCase && selectedTestCase.input}
                        />
                      </Form.Field>

                      <Form.Field>
                        <Input
                          label="Expected Output"
                          value={
                            selectedTestCase && selectedTestCase.expected_output
                          }
                        />
                      </Form.Field>

                      <Form.Field
                        error={
                          selectedTestCase &&
                          this.isTestCaseError(selectedTestCase)
                        }
                      >
                        <Input
                          label="Output"
                          value={selectedTestCase && selectedTestCase.output}
                        />
                      </Form.Field>
                    </Form>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment>
            {/* test Cases End Here */}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
