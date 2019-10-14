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
    result: "",
    selectedTestCase: null,
    testCases: [
      {
        input: 8,
        expectedoutput: 64,
        output: 90
      },
      {
        input: 5,
        expectedoutput: 25,
        output: 50
      },
      {
        input: 10,
        expectedoutput: 100,
        output: 100
      }
    ]
  };

  handleChange = value => {
    this.setState({
      script: value
    });
  };

  handleSubmit = () => {
    axios
      .post("https://kuding-backend.herokuapp.com", {
        script: this.state.script
      })
      .then(res => {
        this.setState({
          result: res.data
        });
      });
  };

  handleDropdownChange = (e, data) => {
    this.setState({
      selectedTestCase: this.state.testCases[data.value]
    });
  };

  isTestCaseError = testCase => testCase.expectedoutput !== testCase.output;

  renderOptions = () =>
    this.state.testCases.map((testCase, index) => ({
      text: `test case ${index + 1}`,
      value: index,
      label: {
        color: this.isTestCaseError(testCase) ? "red" : "green"
      }
    }));

  render() {
    const { script, result, selectedTestCase } = this.state;
    return (
      <Grid columns="2" divided relaxed>
        <Grid.Row>
          <Grid.Column width="4">
            <Segment basic>
              buat fungsi yang mereturn pangkat 2 dari parameter
            </Segment>
          </Grid.Column>

          <Grid.Column width="12">
            <Segment basic>
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
                <Form.Field>
                  <Input label="Result" inverted value={result} />
                </Form.Field>
              </Form>
              <br />
              {/* test cases start here */}
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
                            selectedTestCase && selectedTestCase.expectedoutput
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
              {/* test Cases End Here */}
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
