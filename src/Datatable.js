import React, { useState } from "react";
import "./Datatable.css";

const DataTable = ({ users, deleteuser }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = 10;
  const totalpages = Math.ceil((users?.length || 0) / itemPerPage);
  const startIndex = (currentPage - 1) * itemPerPage;
  const endIndex = startIndex + itemPerPage;

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDelete = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      deleteuser(userId);
    }
  };

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Country</th>
            <th>State</th>
            <th>City</th>
            <th>Languages</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.slice(startIndex, endIndex).map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.fullName}</td>
                <td>{user.email}</td>
                <td>{user.Country}</td>
                <td>{user.State}</td>
                <td>{user.City}</td>
                <td>{user.Languages}</td>
                <td>{user.date}</td>

                <td>
                  <button onClick={() => handleDelete(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="pagination-container">
        {Array.from({ length: totalpages }, (_, index) => index + 1).map(
          (pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => handleClick(pageNumber)}
              disabled={pageNumber === currentPage}
            >
              {pageNumber}
            </button>
          )
        )}
      </div>
    </div>
  );
};
export default DataTable;
