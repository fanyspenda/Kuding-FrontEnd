import React from "react";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { Segment, Card, Button, Header } from "semantic-ui-react";
import Input from "../../components/Input";
import axios from "axios";

class Register extends React.Component {
  state = {
    isLoading: false
  };
  handleRegister = values => {
    this.setState({
      isLoading: true
    });
    axios
      .post("https://kuding-backend.herokuapp.com/user", {
        username: values.username,
        password: values.password
      })
      .then(res => {
        this.setState({
          isLoading: false
        });
        alert("berhasil registrasi");
        this.props.history.push("/login");
      });
  };

  render() {
    const registerSchema = yup.object().shape({
      username: yup
        .string()
        .min(8, "username minimal 8")
        .max(12, "username maximal 12")
        .required("username harus diisi"),
      password: yup
        .string()
        .min(8, "password minimal 8")
        .max(20, "password maximal 20")
        .required("password harus diisi"),
      rePassword: yup
        .string()
        .oneOf([yup.ref("password")], "password tidak sama")
        .required("ketik ulang password")
    });
    return (
      <>
        <Formik
          initialValues={{
            username: "",
            password: "",
            rePassword: ""
          }}
          validationSchema={registerSchema}
          onSubmit={values => this.handleRegister(values)}
        >
          {({ isSubmitting }) => (
            <Segment basic isLoading={this.state.isLoading}>
              <Header size="huge" textAlign="center">
                Daftar Sebagai Pengguna
              </Header>
              <br />
              <Card centered>
                <Card.Content>
                  <Form>
                    <label>
                      <b>Username</b>
                    </label>
                    <Input type="text" name="username" />
                    <br />
                    <br />

                    <label>
                      <b>Password</b>
                    </label>
                    <Input type="password" name="password" />
                    <br />
                    <br />

                    <label>
                      <b>Masukkan Ulang Password</b>
                    </label>
                    <Input type="password" name="rePassword" />
                    <br />
                    <br />

                    <Button
                      type="submit"
                      color="green"
                      disabled={isSubmitting}
                      fluid
                    >
                      Daftar
                    </Button>
                  </Form>
                </Card.Content>
              </Card>
            </Segment>
          )}
        </Formik>
      </>
    );
  }
}

export default Register;
