import React, { useState } from "react";
import BookPage from "./pages/BookPage";
import { BrowserRouter, Route, Redirect, Link } from "react-router-dom";
import { withRouter } from "react-router";

import AuthContext from "./context/auth-context";
import Footer from "./components/Footer";
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

          <h2>Welcome to Our Online Bookstore</h2>
          <BookPage />
          <Footer />
        </main>
      </AuthContext.Provider>
    </BrowserRouter>
  );
};

export default App;
