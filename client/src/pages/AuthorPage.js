import React from "react";

import { useStateValue } from "../state/StateProvider";

import AuthorView from "../components/AuthorView";
import { Redirect } from "react-router-dom";

const AuthorPage = () => {
  const [{ authorId }, dispatch] = useStateValue();

  const renderBook = authorId ? (
    <AuthorView authorId={authorId} />
  ) : (
    <Redirect to="/" />
  );

  return renderBook;
};

export default AuthorPage;
