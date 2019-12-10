import React from 'react'
import { Segment, Card, Button, Header, FormGroup } from 'semantic-ui-react'
import { Formik, Form } from 'formik'
import axios from 'axios'
import Input from '../../components/Input'
import * as yup from 'yup'
import { Consumer } from '../../App'

const validationSchema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required()
})

export default class Login extends React.Component {
  handleSubmit = ({ username, password }, setToken) => {
    axios
      .post('https://kuding-backend.herokuapp.com/user/login', {
        username,
        password
      })
      .then(res => {
        if (res.data.success) {
          setToken(res.data.token)
          this.props.history.push('/')
        } else {
          alert('username atau password salah!')
        }
      })
  }

  render() {
    return (
      <Consumer>
        {({ setToken }) => (
          <Formik
            initialValues={{ username: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={values => this.handleSubmit(values, setToken)}
          >
            {({ isSubmitting }) => (
              <Segment basic>
                <Form>
                  <Card centered>
                    <Card.Content>
                      <Header
                        content="Kuding"
                        subheader="Coding without border"
                        textAlign="center"
                      />
                    </Card.Content>
                    <Card.Content>
                      <FormGroup>
                        <h5>Username</h5>
                        <Input name="username" type="text" />
                      </FormGroup>
                      <br />
                      <FormGroup>
                        <h5>Password</h5>
                        <Input name="password" type="password" />
                      </FormGroup>
                    </Card.Content>
                    <Card.Content>
                      <Button
                        fluid
                        type="submit"
                        disabled={isSubmitting}
                        color="green"
                      >
                        Submit
                      </Button>
                    </Card.Content>
                  </Card>
                </Form>
              </Segment>
            )}
          </Formik>
        )}
      </Consumer>
    )
  }
}
