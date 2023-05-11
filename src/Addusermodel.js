import React, { useState } from "react";

const Addusermodel = ({ country, state, city, languages, addUser }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Country, setCountry] = useState("");
  const [State, setState] = useState("");
  const [City, setCity] = useState("");
  const [Languages, setLanguages] = useState([]);
  const [date, setDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const generateUniqueId = () => {
      return Date.now().toString();
    };

    const newUser = {
      id: generateUniqueId(),
      fullName,
      email,
      password,
      Country,
      State,
      City,
      Languages,
      date,
    };
    addUser(newUser);

    setFullName("");
    setEmail("");
    setPassword("");
    setCountry("");
    setState("");
    setCity("");
    setLanguages([]);
    setDate();
  };

  return (
    <>
      <button>Add New</button>
      <div>
        <div>
          <h2>Add User</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="fullName">Full Name:</label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />

            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="password">password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <label htmlFor="country">Country:</label>
            <input
              type="text"
              id="country"
              value={Country}
              onChange={(e) => setCountry(e.target.value)}
            ></input>

            <label htmlFor="state">State:</label>
            <input
              type="text"
              id="State"
              value={State}
              onChange={(e) => setState(e.target.value)}
            ></input>

            <label htmlFor="city">City:</label>
            <input
              type="text"
              id="city"
              value={City}
              onChange={(e) => setCity(e.target.value)}
            ></input>

            <label htmlFor="languages">Languages:</label>
            <input
              type="text"
              id="languages"
              multiple
              value={Languages}
              onChange={(e) => setLanguages(e.target.value.split(","))}
            ></input>
            <label htmlFor="date">Date:</label>
            <input
              type="text"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />

            <button type="submit">Add User</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Addusermodel;
