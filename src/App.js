import React from "react";
import Index from "./pages/page";

const appStyle = {
  background: "#ffbdfd",
  minHeight: "100%"
};

class App extends React.Component {
  render() {
    return (
      <div style={appStyle}>
        <Index />
      </div>
    );
  }
}

export default App;
