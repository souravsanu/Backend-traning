import React, { useState } from "react";
import isEmail from "isemail";

function Contactfrom() {
  const [FromData, setFromData] = useState({
    email: "",
    message: "",
    name: "",
  });
  const [error, setError] = useState("");

  const handlesubmit = (e) => {
    e.prevenDefault();
    if (!isEmail.validate(FromData.email)) {
      setError("Invalid email address");
      return;
    }
    fetch(" https://admin.srkprojects.com/web/api/client/v1/contact-us/", {
      mathod: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(FromData),
    })
      .then((Response) => {
        if (Response.ok) {
          console.log("sucess your message was sent");
        } else {
          console.log("Error", Response.status);
        }
      })
      .catch((error) => {
        console.error("Error", error);
      });
  };
  const handleInputchanges = (e) => {
    setFromData({
      ...FromData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <from onsubmit={handlesubmit}>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={FromData.email}
          onchange={handleInputchanges}
          required
        />
      </div>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={FromData.name}
          onchange={handleInputchanges}
          minLength="2"
          required
        />
      </div>
      <div>
        <label>Message:</label>
        <input
          name="message"
          value={FromData.message}
          onchange={handleInputchanges}
          minLength="10"
          required
        />
      </div>
      {error && <p> {error}</p>}
      <button type="submit">Send message</button>
    </from>
  );
}
export default Contactfrom;
