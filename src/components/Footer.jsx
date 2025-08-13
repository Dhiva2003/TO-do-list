// Footer.jsx
import React from "react";

function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#333",
        color: "white",
        padding: "1rem 0",
        textAlign: "center",
        marginTop: "auto",
      }}
    >
      <p style={{ margin: "0" }}>
        © {new Date().getFullYear()} Task Manager Dhivakar. <br />All rights reserved.
      </p>
      <div style={{ marginTop: "0.5rem" }}>
        <a
          href="#"
          style={{ color: "#ccc", margin: "0 8px", textDecoration: "none" }}
        >
          Privacy Policy
        </a>
        <a
          href="#"
          style={{ color: "#ccc", margin: "0 8px", textDecoration: "none" }}
        >
          Terms of Service
        </a>
        <a
          href="#"
          style={{ color: "#ccc", margin: "0 8px", textDecoration: "none" }}
        >
          Contact
        </a>
      </div>
    </footer>
  );
}

export default Footer;
