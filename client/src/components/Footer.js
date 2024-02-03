import React from "react";

const Footer = ({ tasks }) => {
  return (
    <div className="footer">
      <h3>Count :{tasks.length}</h3>
    </div>
  );
};

export default Footer;
