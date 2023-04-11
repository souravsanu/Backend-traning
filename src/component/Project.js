import React, { useState } from "react";

const Project = () => {
  const [projects, setProjects] = useState([]);
  const [projectName, setProjectName] = useState("");

  const handleProjectNameChange = (e) => {
    setProjectName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (projectName) {
      setProjects([...projects, projectName]);
      setProjectName("");
    }
  };

  return (
    <div>
      <h1>Create a Project</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={projectName}
          onChange={handleProjectNameChange}
        />
        <button type="submit">Add Project</button>
      </form>
      <h2>Projects:</h2>
      <ul>
        {projects.map((project) => (
          <li key={project}>{project}</li>
        ))}
      </ul>
    </div>
  );
};

export default Project;
