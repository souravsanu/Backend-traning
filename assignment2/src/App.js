import React, { useState } from "react";
import "./style.css";

function App() {
  const [input, setInput] = useState("");
  const [showPara, setShowPara] = useState(false);
  // console.log(input);
  const handleChange = (e) => {
    setInput(e.target.value);
  };
  return (
    <div>
      <textarea value={input} onChange={handleChange}></textarea>
      <br />

      <button
        onClick={() => {
          // setInput(input.toUpperCase());
          setShowPara(true);
        }}
      >
        Change to Uppercase
      </button>

      {showPara && <p>{input.toUpperCase()}</p>}
    </div>
  );
}
export default App;
