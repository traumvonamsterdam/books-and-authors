import React, { useState } from "react";
import { useStateValue } from "../state/StateProvider";
import BookListPage from "./BookListPage";

const App = () => {
  return (
    <>
      <h2>Welcome to Our Online Bookstore</h2>
      <BookListPage />
    </>
  );
};

export default App;
