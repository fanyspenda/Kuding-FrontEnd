import React from "react";
import axios from "axios";
import { Grid, Button, Form, Segment, Input, Label } from "semantic-ui-react";
import Tour from "reactour";

const tourSteps = [
  {
    selector: `.task-title`,
    content: `anda dapat mengisi judul soal yang akan anda buat`
  },
  {
    selector: `.task-description`,
    content: `beri deskripsi singkat tentang maksud dan tujuan soal anda`
  },
  {
    selector: `.task-testCases`,
    content: `anda dapat mengisikan berbagai macam tes untuk menguji jawaban yang diberikan`
  },
  {
    selector: `.task-handleTotalTestCases`,
    content: `anda dapat menambah jumlah tes atau mengurangi jumlah tes sesuai keinginan`
  },
  {
    selector: `.task-submit`,
    content: `setelah semua sudah siap, tekan tombol ini untuk menyimpan soal. 
    Soal anda akan muncul di halaman "List Task"`
  }
];

export default class CreateTask extends React.Component {
  state = {
    title: "",
    description: "",
    test_cases: [
      {
        input: 0,
        expected_output: 0
      }
    ],
    isLoading: false,
    tourState: true
  };

  componentWillMount = () => {
    if (!localStorage.getItem("token")) {
      this.props.history.push("/login");
    }
    this.handleTour();
  };

  // handle add test case event
  handleAddTestCase = () => {
    const { test_cases } = this.state;
    test_cases.push({ input: 10, expected_output: 10 });
    this.setState({ test_cases });
  };

  // handle remove test case event
  handleRemoveTestCase = () => {
    let { test_cases } = this.state;
    test_cases.pop();
    this.setState({ test_cases });
  };

  // handle submit task
  handleSubmit = () => {
    this.setState({
      isLoading: true
    });
    axios
      .post(
        "https://kuding-backend.herokuapp.com/task",
        {
          title: this.state.title,
          description: this.state.description,
          test_cases: this.state.test_cases
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      )
      .then(() => alert("Task created"))
      .finally(() => this.setState({ isLoading: false }));
  };

  // handle input change event
  handleInputChange = (index, event) => {
    const { test_cases } = this.state;
    test_cases[index].input = event.target.value;
    this.setState({ test_cases });
  };

  // handle expected output change event
  handleExpectedOutputChange = (index, event) => {
    const { test_cases } = this.state;
    test_cases[index].expected_output = event.target.value;
    this.setState({ test_cases });
  };

  // handle description change
  handleDescriptionChange = event => {
    this.setState({ description: event.target.value });
  };

  // handle title change event
  handleTitleChange = event => {
    this.setState({ title: event.target.value });
  };

  //cek jika user sudah pernah melakukan tour, maka user tidak perlu tour lagi
  handleTour = () => {
    localStorage.getItem("isTourCreateTaskDone")
      ? this.setState({
          tourState: false
        })
      : this.setState({
          tourState: true
        });
  };

  handleTourCloseRequest = () => {
    localStorage.setItem("isTourCreateTaskDone", true);
    this.setState({
      tourState: false
    });
  };

  render() {
    return (
      <>
        <Segment basic relaxed loading={this.state.isLoading}>
          <Tour
            steps={tourSteps}
            rounded={5}
            isOpen={this.state.tourState}
            onRequestClose={this.handleTourCloseRequest}
            disableInteraction={true}
            disableKeyboardNavigation={false}
          />
          <h2>Buat Soal Baru</h2>
          <Segment>
            <Form>
              <Form.Field className="task-title">
                <Label>Judul Soal</Label>
                <Input
                  type="text"
                  value={this.state.title}
                  onChange={this.handleTitleChange}
                ></Input>
              </Form.Field>
            </Form>
          </Segment>

          <Segment>
            <Form>
              <Form.Field className="task-description">
                <Label>Deskripsi</Label>
                <Input
                  type="text"
                  value={this.state.description}
                  onChange={this.handleDescriptionChange}
                ></Input>
              </Form.Field>
            </Form>
          </Segment>

          <Segment basic>
            <Grid columns="2" relaxed>
              <Grid.Row>
                <Grid.Column>
                  <h2>Test Case</h2>
                </Grid.Column>
                <Grid.Column textAlign="right">
                  {this.state.test_cases.length > 1 && (
                    <Button
                      className="task-handleTotalTestCases"
                      circular
                      color="red"
                      onClick={this.handleRemoveTestCase}
                    >
                      -
                    </Button>
                  )}
                  <Button
                    circular
                    color="blue"
                    onClick={this.handleAddTestCase}
                  >
                    +
                  </Button>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>

          <Segment className="task-testCases">
            {this.state.test_cases.map((test_case, index) => {
              return (
                <Grid columns="2" divided relaxed key={`${test_case}+${index}`}>
                  <Grid.Row>
                    <Grid.Column width="4">
                      <Form>
                        <Form.Field>
                          <Label>{`Test Case ${index + 1}`}</Label>
                        </Form.Field>
                      </Form>
                    </Grid.Column>
                    <Grid.Column width="12">
                      <Form>
                        <Form.Field>
                          <Label>Input</Label>
                          <Input
                            value={test_case.input}
                            onChange={event =>
                              this.handleInputChange(index, event)
                            }
                          />
                        </Form.Field>

                        <Form.Field>
                          <Label>Expected Output</Label>
                          <Input
                            value={test_case.expected_output}
                            onChange={event =>
                              this.handleExpectedOutputChange(index, event)
                            }
                          />
                        </Form.Field>
                      </Form>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              );
            })}
          </Segment>
          <Segment basic>
            <Grid relaxed>
              <Grid.Row>
                <Grid.Column textAlign="right" className="task-submit">
                  <Button
                    circular
                    color="green"
                    fluid
                    onClick={this.handleSubmit}
                  >
                    Submit
                  </Button>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        </Segment>
      </>
    );
  }
}
