import React from 'react'
import axios from 'axios'
import {
  Grid,
  TextArea,
  Button,
  Form,
  Segment,
  Input,
  Label
} from 'semantic-ui-react'

export default class Exam extends React.Component {
  state = {
    script: '',
    result: '',
    answer: 100
  }

  handleChange = e => {
    this.setState({
      script: e.target.value
    })
  }

  handleSubmit = () => {
    axios
      .post('https://kuding-backend.herokuapp.com', {
        script: this.state.script
      })
      .then(res => {
        this.setState({
          result: res.data
        })
      })
  }

  Checker = props => {
    if (this.state.result === '') {
      return null
    } else if (props.result === this.state.answer) {
      return <Label color="green">kode benar!</Label>
    } else if (props.result !== this.state.answer) {
      return <Label color="red">kode salah!</Label>
    }
  }

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
                  <TextArea
                    rows="17"
                    placeholder="Ketikkan script mu disini..."
                    onChange={this.handleChange}
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
    )
  }
}
