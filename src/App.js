import React, { useState } from "react";
import DataTable from "./Datatable";
import Addusermodel from "./Addusermodel";

const App = () => {
  const [users, setUsers] = useState([]);
  const addUser = (newUser) => {
    setUsers([...users, newUser]);
  };

  const deleteuser = (userId) => {
    const updateUsers = users.filter((user) => user.id !== userId);
    setUsers(updateUsers);
  };
  return (
    <div>
      <DataTable users={users} deleteuser={deleteuser} />
      <Addusermodel addUser={addUser} />
    </div>
  );
};

export default App;
