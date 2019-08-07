import React, { useState } from "react";

import initialState from "./state/initialState";
import reducer from "./state/reducer";
import { StateProvider } from "./state/StateProvider";
import HomePage from "./pages/HomePage";
import BookPage from "./pages/BookPage";
import AuthorPage from "./pages/AuthorPage";
import { BrowserRouter, Route, Redirect, Link, Switch } from "react-router-dom";
import { withRouter } from "react-router";

import AuthContext from "./context/auth-context";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Message from "./components/Message";
import "./App.css";

const App = () => {
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
      <StateProvider initialState={initialState} reducer={reducer}>
        <AuthContext.Provider value={{ token, userId, login, logout }}>
          <div className="container">
            <Navbar />
            <main className="main">
              <Message />
              <Switch>
                <Route path="/book" component={BookPage} />
                <Route path="/author" component={AuthorPage} />
                <Route path="/" exact component={HomePage} />
              </Switch>
            </main>
            <Footer />
          </div>
        </AuthContext.Provider>
      </StateProvider>
    </BrowserRouter>
  );
};

export default App;
