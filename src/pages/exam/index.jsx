import React from 'react'
import axios from 'axios'
import { Grid, TextArea, Button, Form, Segment, Input } from 'semantic-ui-react'

export default class Exam extends React.Component {
  state = {
    script: '',
    result: ''
  }

  handleChange = e => {
    this.setState({
      script: e.target.value
    })
  }

  handleSubmit = () => {
    axios
      .post('http://192.168.43.185:3000', {
        script: this.state.script
      })
      .then(res => {
        this.setState({ result: res.data })
      })
  }

  render() {
    return (
      <Grid columns="2" divided relaxed>
        <Grid.Row>
          <Grid.Column width="4">
            <Segment basic>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Vestibulum tempor interdum facilisis. Cras eros purus, fringilla
              sed nulla nec, dictum viverra orci. Nulla pharetra ac sem et
              eleifend. Pellentesque tristique suscipit nunc, sit amet suscipit
              sem vehicula eget. In porta metus nibh, gravida gravida libero
              volutpat ac. Phasellus placerat convallis orci sit amet mattis.
              Suspendisse tincidunt velit nulla, eget varius nisi vestibulum et.
              Praesent vel mauris sed augue elementum tempor sit amet ut lorem.
              Nulla pharetra est eget erat viverra dapibus. Mauris congue
              pretium ex sed ultrices. Morbi quis consectetur lorem. Suspendisse
              posuere nec risus et vestibulum. Sed accumsan at diam id euismod.
              Quisque non ligula quis mauris consequat laoreet. Nam ornare
              malesuada ligula eu fermentum. Nam lacinia ipsum sit amet lorem
              ullamcorper, quis luctus dolor suscipit.
            </Segment>
          </Grid.Column>
          <Grid.Column width="12">
            <Segment basic>
              <Form>
                <Form.Field>
                  <TextArea
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
                  <Input
                    label="Result"
                    inverted
                    value={this.state.result}
                    disabled
                  />
                </Form.Field>
              </Form>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}
