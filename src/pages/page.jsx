import React from "react";
import TextArea from "../components/TextArea";
import Button from "../components/StyledButton";
import axios from "axios";
import styled from "styled-components";

class Page extends React.Component {
  state = {
    script: "",
    result: ""
  };

  handleChange = e => {
    this.setState({
      script: e.target.value
    });
  };

  handleSubmit = () => {
    axios
      .post("http://192.168.43.185:3000", {
        script: this.state.script
      })
      .then(res => {
        this.setState({ result: res.data });
      });
  };

  render() {
    return (
      <Container>
        <div>
          <h4>Soal Nomor 1</h4>
          <p style={styledP}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            tempor interdum facilisis. Cras eros purus, fringilla sed nulla nec,
            dictum viverra orci. Nulla pharetra ac sem et eleifend. Pellentesque
            tristique suscipit nunc, sit amet suscipit sem vehicula eget. In
            porta metus nibh, gravida gravida libero volutpat ac. Phasellus
            placerat convallis orci sit amet mattis. Suspendisse tincidunt velit
            nulla, eget varius nisi vestibulum et. Praesent vel mauris sed augue
            elementum tempor sit amet ut lorem. Nulla pharetra est eget erat
            viverra dapibus. Mauris congue pretium ex sed ultrices. Morbi quis
            consectetur lorem. Suspendisse posuere nec risus et vestibulum. Sed
            accumsan at diam id euismod. Quisque non ligula quis mauris
            consequat laoreet. Nam ornare malesuada ligula eu fermentum. Nam
            lacinia ipsum sit amet lorem ullamcorper, quis luctus dolor
            suscipit.
          </p>
        </div>
        <div style={styledDiv2}>
          <div>
            <h3>Ketikkan kode di sini</h3>
            <TextArea
              rows="5"
              onChange={this.handleChange}
              value={this.state.script}
            />
            <br />
            <Button onClick={this.handleSubmit}>submit</Button>
          </div>
          <div>
            <h3>Lihat Output sini</h3>
            <TextArea rows="5" value={this.state.result} />
          </div>
        </div>
      </Container>
    );
  }
}

const Container = styled("div")`
  display: "flex";
  flex-flow: "column wrap";
  border: "1px solid black";
  color: "#9e0393";
  margin: "0px 15px 15px 15px";
`;

const styledDiv2 = {
  display: "flex",
  flexFlow: "row wrap",
  justifyContent: "space-around",

  border: "1px solid red",
  color: "#9e0393"
};

const styledP = {
  borderRadius: "5px",
  backgroundColor: "white",
  color: "black",
  padding: "10px"
};

export default Page;
