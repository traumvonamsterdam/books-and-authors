import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => (
  <div>
    <Link to="/" className="link">
      Back
    </Link>
    <Link to="/" className="link">
      Home
    </Link>
  </div>
);

export default Footer;
