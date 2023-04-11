import React, { useState } from "react";

const Task = () => {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [timeSpent, setTimeSpent] = useState(0);
  const [description, setDescription] = useState("");

  const handleTaskNameChange = (e) => {
    setTaskName(e.target.value);
  };

  const handleTimeSpentChange = (e) => {
    setTimeSpent(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskName && timeSpent && description) {
      setTasks([...tasks, { taskName, timeSpent, description }]);
      setTaskName("");
      setTimeSpent(0);
      setDescription("");
    }
  };

  return (
    <div>
      <h1>Create a Task</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={taskName}
          onChange={handleTaskNameChange}
          placeholder="Task Name"
        />
        <input
          type="number"
          value={timeSpent}
          onChange={handleTimeSpentChange}
          placeholder="Time Spent (hours)"
        />
        <input
          type="text"
          value={description}
          onChange={handleDescriptionChange}
          placeholder="Description"
        />
        <button type="submit">Add Task</button>
      </form>
      <h2>Tasks:</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.taskName}>
            Task Name: {task.taskName}
            <br />
            Time Spent: {task.timeSpent} hours
            <br />
            Description: {task.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Task;
