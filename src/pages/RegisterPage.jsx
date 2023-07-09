import React, { useState } from "react";
import { Navigate } from "react-router-dom";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email,setEmail]=useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;
  const submitForm = async (e) => {
    e.preventDefault();
    const api = await fetch(`${apiUrl}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name,email,password}),
    });
    if (api.status === 200) {
      alert("Registration Successully");
      setRedirect(true);
    } else {
      alert("Registration failed");
    }
  };

  if (redirect) {
    return <Navigate to={"/login"} />;
  }
  return (
    <form className="login" onSubmit={submitForm}>
      <h1>Register</h1>
      <input
        type="text"
        placeholder="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
       <input
        type="text"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button>Register</button>
    </form>
  );
}

export default RegisterPage;
