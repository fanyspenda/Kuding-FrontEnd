import React from "react";
import axios from "axios";

import AceEditor from "react-ace";
import "brace/mode/javascript";
import "brace/theme/monokai";
import "brace/ext/language_tools";

import {
  Grid,
  TextArea,
  Button,
  Form,
  Segment,
  Input,
  Label
} from "semantic-ui-react";

export default class Exam extends React.Component {
  state = {
    script: "",
    result: "",
    answer: 100
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

  Checker = props => {
    if (this.state.result === "") {
      return null;
    } else if (props.result === this.state.answer) {
      return <Label color="green">kode benar!</Label>;
    } else if (props.result !== this.state.answer) {
      return <Label color="red">kode salah!</Label>;
    }
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
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
