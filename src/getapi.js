import React, { useState, useEffect } from "react";
import axios from "axios";

function Todos() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios
      .get(" https://gorest.co.in/public/v1/todos")
      .then((responce) => setTodos(responce.data.data))
      .catch((error) => console.log(error));
  }, []);
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "1rem",
      }}
    >
      {todos.map((todo) => (
        <div key={todo.id}>
          <h3>{todo.tittle}</h3>
          <p>{todo.completed ? "completed" : "Incomplete"}</p>
        </div>
      ))}
    </div>
  );
}
export default Todos;
