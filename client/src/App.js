import React, { useState } from "react";

import reducer from "./state/reducer";
import { StateProvider } from "./state/StateProvider";
import BookListPage from "./pages/BookListPage";
import HomePage from "./pages/HomePage";
import BookPage from "./pages/BookPage";
import { BrowserRouter, Route, Redirect, Link, Switch } from "react-router-dom";
import { withRouter } from "react-router";

import AuthContext from "./context/auth-context";
import Footer from "./components/Footer";
import "./App.css";

const App = () => {
  const initialState = {
    books: [],
    authors: [],
    bookId: "",
    topMessage: { messageType: null, message: "" }
  };

  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");

  const login = (token, userId, tokenExpiration) => {
    setToken(token);
    setUserId(userId);
  };

  const logout = () => {
    setToken("");
    setUserId("");
  };

  return (
    <BrowserRouter>
      <StateProvider
        initialState={initialState}
        reducer={reducer}
        className="page"
      >
        <AuthContext.Provider value={{ token, userId, login, logout }}>
          <main className="main">
            {/* {this.state.token && <Redirect from="/" to="/events" exact />}
          {this.state.token && <Redirect from="/auth" to="/events" exact />}
          {!this.state.token && <Route path="/auth" component={AuthPage} />}
          <Route path="/events" component={EventsPage} />
          {this.state.token && (
            <Route path="/bookings" component={BookingsPage} />
          )}
          {!this.state.token && <Redirect to="/auth" />} */}

            <Switch>
              <Route path="/book" component={BookPage} />
              <Route path="/" exact component={HomePage} />
            </Switch>
          </main>
          <Footer />
        </AuthContext.Provider>
      </StateProvider>
    </BrowserRouter>
  );
};

export default App;
