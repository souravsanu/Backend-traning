import React, { useState } from "react";

function Form() {
  const [FirstName, setFName] = useState("");
  const [LastName, setLName] = useState("");
  const [gender, setGender] = useState("");
  const [state, setstae] = useState("");
  const [marketing, setMarketing] = useState(false);

  return (
    <div>
      <h2>Registration Form</h2>
      <div>
        First Name:{" "}
        <input
          value={FirstName}
          onChange={(e) => {
            setFName(e.target.value);
          }}
        />
      </div>
      <br></br>
      <div>
        Last Name:{" "}
        <input
          value={LastName}
          onChange={(e) => {
            setLName(e.target.value);
          }}
        />
      </div>
      <div>
        <br></br>
        Gender:{" "}
        <input
          type="radio"
          value="male"
          checked={gender === "male"}
          onChange={(e) => {
            setGender(e.target.value);
          }}
        />
        Male
        <input
          type="radio"
          value="female"
          checked={gender === "female"}
          onChange={(e) => {
            setGender(e.target.value);
          }}
        />
        Female
        <input
          type="radio"
          value="other"
          checked={gender === "other"}
          onChange={(e) => {
            setGender(e.target.value);
          }}
        />
        Other
      </div>
      <div>
        <br></br>
        State:{" "}
        <input
          value={state}
          onChange={(e) => {
            setstae(e.target.value);
          }}
        />
      </div>
      <br></br>
      <div>
        Receive Marketing Emails?{" "}
        <input
          type="checkbox"
          checked={marketing}
          onChange={() => setMarketing(!marketing)}
        />
      </div>

      <button
        onClick={() => {
          if (FirstName && LastName && gender && state && marketing) {
            console.log(FirstName);
            console.log(LastName);
            console.log(gender);
            console.log(state);
            console.log(marketing);

            // clearing all inputs
            setFName("");
            setGender("");
            setMarketing(false);
          } else {
            // error
            alert("Please enter everything");
          }
        }}
      >
        Submit
      </button>
    </div>
  );
}

export default Form;
