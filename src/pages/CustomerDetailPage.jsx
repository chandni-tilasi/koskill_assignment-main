import { format } from "date-fns";
import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../userContext/userContext";
import { BiEdit } from "react-icons/bi";

function CustomerDetailPage() {
  const { id } = useParams();
  const [customerInfo, setCustomerInfo] = useState(null);
  const { userInfo } = useContext(UserContext);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetch(`${apiUrl}/createNewUser/${id}`, {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((postData) => {
        setCustomerInfo(postData);
      });
  }, []);

  if (!customerInfo) {
    return "";
  }

  return (
    <>
      <div className="post-page">
        {userInfo.id===customerInfo.author._id && (<div className="edit-row">
          <Link to={`/edit/${customerInfo._id}`} className="edit-btn">
            <BiEdit />
            Edit Details
          </Link>
        </div>)}
        
        <div style={{marginBottom:"10px"}}>
          <time>
            Created At:{" "}
            {format(new Date(customerInfo.createdAt), "MMM d yyyy HH:mm")}
          </time>
        </div>
      </div>
      <div className="post-page">
        <div className="image">
          <img src={`${apiUrl}/` + customerInfo.cover} alt="img" />
        </div>
        <div className="texts">
          <h2>Name: {customerInfo.name}</h2>
          <p className="info">
            <a>Age: {customerInfo.age}</a>
          </p>
          <p className="summary">Email : {customerInfo.author.email}</p>
          <p className="summary">phone No. : {customerInfo.phoneNo}</p>
          <p className="summary">Occupation: {customerInfo.occupation}</p>
          <p className="summary">Address : {customerInfo.address}</p>
        </div>
      </div>
    </>
  );
}

export default CustomerDetailPage;
