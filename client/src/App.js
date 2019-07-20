import React, { Component } from "react";
import "./App.css";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import AuthorList from "./components/AuthorList";
import AddBook from "./components/AddBook";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <h2>Your Reading List</h2>
          <AuthorList />
          <AddBook />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
