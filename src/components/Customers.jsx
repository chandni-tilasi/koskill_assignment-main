import React from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";

function Customers({ _id, name, age, occupation, createdAt, phoneNo, onDelete }) {

  const handleDelete = async () => {
    onDelete();
  };
  return (
    <tr>
      <td>
        <Link to={`/createNewUser/${_id}`} style={{ textDecoration: "none", color: "black" }}>
          {name}
        </Link>
      </td>
      <td>{age}</td>
      <td>{occupation}</td>
      <td>{phoneNo}</td>
      <td>
        <button className="delete-button" onClick={handleDelete}>
          Delete
        </button>
      </td>
    </tr>
  );
}

export default Customers;
