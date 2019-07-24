import React, { useState } from "react";
import AuthContext from "../context/auth-context";

const AuthPage = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const contextType = AuthContext;

  return (
    <form>
      <div>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" ref={this.emailEl} />
      </div>
    </form>
  );
};

export default AuthPage;
