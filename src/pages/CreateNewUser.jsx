import React, { useState } from "react";
import { Navigate } from "react-router-dom";

function CreateNewUser() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [age, setAge] = useState("");
  const [occupation, setOccupation] = useState("");
  const [phoneNo, setPhone] = useState("");
  const [file, setFile] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;

  const submitForm = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("address", address);
    formData.append("age", age);
    formData.append("occupation", occupation);
    formData.append("phoneNo", phoneNo);
    formData.append("file", file);

    const requestOptions = {
      method: "POST",
      body: formData,
      credentials:"include",
    };

    try {
      const response = await fetch(`${apiUrl}/createNewUser`, requestOptions);
      if (response.ok) {
        alert("user created successfully");
        setRedirect(true);
      } else {
        alert("failed to create new user");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <form className="login" onSubmit={submitForm}>
      <h1>New User</h1>
      <input
        type="text"
        placeholder="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <input
        type="text"
        placeholder="phone No."
        value={phoneNo}
        onChange={(e) => setPhone(e.target.value)}
      />
      <input
        type="text"
        placeholder="profession"
        value={occupation}
        onChange={(e) => setOccupation(e.target.value)}
      />
      <input
        type="text"
        placeholder="address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <input
        type="file"
        style={{color:"black"}}
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button>Add new User</button>
    </form>
  );
}

export default CreateNewUser;
