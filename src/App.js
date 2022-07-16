import React from "react";
import Layout from "./Components/HOC/Layout";

class App extends React.Component {
  render() {
    return (
      <Layout>
        <div
          style={{
            width: "400px",
            border: "1px solid black",
          }}
        >
          Layout works
        </div>
      </Layout>
    );
  }
}

export default App;
