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
  Label,
  Dropdown
} from "semantic-ui-react";

export default class Exam extends React.Component {
  state = {
    script: "",
    result: "",
    selectedTestCase: "",
    testCase: [
      {
        key: 0,
        text: "test case 1",
        value: 0,
        error: false,
        label: {
          color: "red"
        },

        input: 2,
        expectedoutput: 90,
        output: 90
      },
      {
        key: 1,
        text: "test case 2",
        value: 1,
        error: false,
        label: {
          color: "green"
        },

        input: 5,
        expectedoutput: 50,
        output: 50
      },
      {
        key: 2,
        text: "test case 3",
        value: 2,
        error: false,
        label: {
          color: "red"
        },

        input: 10,
        expectedoutput: 100,
        output: 250
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
    // console.log(data.value);
    this.setState({
      selectedTestCase: data.value
    });
    this.testCaseChecker(data.value);
  };

  Checker = props => {
    if (this.state.result === "") {
      return null;
    } else if (props.result === this.state.answer) {
      return <Label color="green">kode benar!</Label>;
    } else if (props.result !== this.state.answer) {
      return <Label color="red">kode salah!</Label>;
    }
  };

  testCaseChecker = index => {
    let testCaseCopy = this.state.testCase;
    if (
      this.state.testCase[index].output !==
      this.state.testCase[index].expectedoutput
    ) {
      testCaseCopy[index].error = true;
      testCaseCopy[index].label.color = "red";
    } else {
      testCaseCopy[index].error = false;
      testCaseCopy[index].label.color = "green";
    }

    this.setState({
      testCase: testCaseCopy
    });
  };

  render() {
    return (
      <Grid columns="2" divided relaxed>
        <Grid.Row>
          <Grid.Column width="4">
            <Segment basic>
              buat fungsi yang mereturn hasil perkalian dari 5 * 20
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
                    value={this.state.script}
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
                  <Input label="Result" inverted value={this.state.result} />
                  <this.Checker result={this.state.result} />
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
                      options={this.state.testCase}
                      onChange={this.handleDropdownChange}
                    />
                  </Grid.Column>
                  <Grid.Column width="12">
                    <Form>
                      <Form.Field>
                        <Input
                          label="Input"
                          value={
                            this.state.selectedTestCase !== ""
                              ? this.state.testCase[this.state.selectedTestCase]
                                  .input
                              : ""
                          }
                        />
                      </Form.Field>

                      <Form.Field>
                        <Input
                          label="Expected Output"
                          value={
                            this.state.selectedTestCase !== ""
                              ? this.state.testCase[this.state.selectedTestCase]
                                  .expectedoutput
                              : ""
                          }
                        />
                      </Form.Field>

                      <Form.Field
                        error={
                          this.state.selectedTestCase !== ""
                            ? this.state.testCase[this.state.selectedTestCase]
                                .error
                            : false
                        }
                      >
                        <Input
                          label="Output"
                          value={
                            this.state.selectedTestCase !== ""
                              ? this.state.testCase[this.state.selectedTestCase]
                                  .output
                              : ""
                          }
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
