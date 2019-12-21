/*
 * Component that used to registering user
 */

import React from 'react'
import { Formik, Form } from 'formik'
import * as yup from 'yup'
import { Segment, Card, Button, Header, FormGroup } from 'semantic-ui-react'
import Input from '../../components/Input'
import axios from 'axios'

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(8)
    .max(12)
    .required(),
  password: yup
    .string()
    .min(8)
    .max(20)
    .required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'confirm password wrong')
    .required()
})

class Register extends React.Component {
  state = {
    isLoading: false
  }

  // handle register event
  handleRegister = ({ username, password }) => {
    this.setState({
      isLoading: true
    })
    axios
      .post('https://kuding-backend.herokuapp.com/user', {
        username,
        password
      })
      .then(res => {
        this.setState({
          isLoading: false
        })
        alert('berhasil registrasi')
        this.props.history.push('/login')
      })
  }

  // rendering component
  render() {
    return (
      <>
        <Formik
          initialValues={{
            username: '',
            password: '',
            confirmPassword: ''
          }}
          validationSchema={validationSchema}
          onSubmit={this.handleRegister}
        >
          {({ isSubmitting }) => (
            <Segment basic isLoading={this.state.isLoading}>
              <Form>
                <Card centered>
                  <Card.Content>
                    <Header
                      content="Register"
                      subheader="Join with us"
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
                    <br />
                    <FormGroup>
                      <h5>Confirm Password</h5>
                      <Input name="confirmPassword" type="password" />
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
      </>
    )
  }
}

export default Register
