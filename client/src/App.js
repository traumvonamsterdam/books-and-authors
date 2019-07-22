import React, { Component } from "react";
import "./App.css";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import BookList from "./components/BookList";
import AddBookForm from "./components/AddBookForm";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <h2>Welcome to Our Online Bookstore</h2>
          <AddBookForm />

          {/* <BookList /> */}
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
