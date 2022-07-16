import React from "react";
import Layout from "./hoc/Layout";

import Quiz from "./containers/Quiz/Quiz";

class App extends React.Component {
  render() {
    return (
      <Layout>
        <Quiz />
      </Layout>
    );
  }
}

export default App;
