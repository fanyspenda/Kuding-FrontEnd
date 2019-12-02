import React from "react";
import { Segment, Card, Button } from "semantic-ui-react";
import { Formik, Form } from "formik";
import axios from "axios";
import Input from "../../components/Input";
import * as yup from "yup";

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
    const loginSchema = yup.object().shape({
      username: yup.string().required("Username Harus Diisi!"),
      password: yup.string().required("Password Harus Diisi!")
    });

    return (
      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={loginSchema}
        // validate={values => {
        //   const errors = {};

        //   if (values.username === "") {
        //     errors.username = "username kosong!";
        //   } else if (values.password === "") {
        //     errors.password = "password belum diisi!";
        //   }
        //   return errors;
        // }}
        onSubmit={values => this.login(values.username, values.password)}
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
                  <div>
                    <label>
                      <b>Username</b>
                    </label>
                    <br />
                    <Input name="username" type="text" />
                  </div>
                  <br />
                  <div>
                    <label>
                      <b>Password</b>
                    </label>
                    <br />
                    <Input name="password" type="password" />
                  </div>
                  <br />
                  <br />
                  <Button
                    fluid
                    type="submit"
                    disabled={isSubmitting}
                    color="green"
                  >
                    Submit
                  </Button>
                </Form>
              </Segment>
            </Card>
          </Segment>
        )}
      </Formik>
    );
  }
}
