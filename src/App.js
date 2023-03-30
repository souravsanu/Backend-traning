import React, { useState } from "react";
// function counter() {
const App = () => {
  const [counter, setcount] = useState(0);

  const handleclick1 = () => {
    setcount(counter + 1);
  };

  const handleclick2 = () => {
    setcount(counter - 1);
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "200%",
        position: "absolute",
        width: "100%",
        height: "100%",
        top: "-15%",
      }}
    >
      Counter{" "}
      <div
        style={{
          fontSize: "120%",
          position: "relative",
          top: "10vh",
        }}
      >
        {counter}
      </div>
      <div className="buttons">
        <button
          style={{
            fontSize: "60%",
            position: "relative",
            top: "20vh",
            marginRight: "5px",
            backgroundColor: "green",
            borderRadius: "8%",
            color: "white",
          }}
          onClick={handleclick1}
        >
          {" "}
          +{" "}
        </button>
        <button
          style={{
            fontSize: "60%",
            position: "relative",
            top: "20vh",
            marginLeft: "5px",
            backgroundColor: "red",
            borderRadius: "8%",
            color: "white",
          }}
          onClick={handleclick2}
        >
          {" "}
          -
        </button>
      </div>
    </div>
  );
};
export default App;
