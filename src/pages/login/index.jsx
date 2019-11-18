import React from "react";
import { Segment, Form as SemanticForm, Card, Button } from "semantic-ui-react";
import { Formik, Form } from "formik";
import axios from "axios";
import Input from "../../components/Input";

export default class Login extends React.Component {
  login = (username, password) => {
    axios
      .post("https://kuding-backend.herokuapp.com/user/login", {
        username,
        password
      })
      .then(res => {
        if (res.data.success) {
          localStorage.setItem("token", res.data.token);
          this.props.history.push("/");
        } else {
          alert("username/password salah!");
        }
      });
  };

  render() {
    return (
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={values => this.login(values.username, values.password)}
        validate={values => {
          const errors = {};
          if (values.username === "") {
            errors.username = "username kosong!";
          } else if (values.password === "") {
            errors.password = "password belum diisi!";
          }
          return errors;
        }}
      >
        {({ isSubmitting }) => (
          <Segment basic>
            <h1 style={{ textAlign: "center" }}>Kuding</h1>
            <h2 style={{ textAlign: "center" }}>Coding Without Borders</h2>
            <br />
            <br />
            <Card centered>
              <Segment basic>
                <Form>
                  <SemanticForm>
                    <SemanticForm.Field>
                      <label>Username</label>
                      <Input name="username" type="text" />
                    </SemanticForm.Field>
                    <br />
                    <SemanticForm.Field>
                      <label>Password</label>
                      <Input name="password" type="password" />
                    </SemanticForm.Field>

                    <Button
                      fluid
                      type="submit"
                      disabled={isSubmitting}
                      color="green"
                    >
                      Submit
                    </Button>
                  </SemanticForm>
                </Form>
              </Segment>
            </Card>
          </Segment>
        )}
      </Formik>
    );
  }
}
