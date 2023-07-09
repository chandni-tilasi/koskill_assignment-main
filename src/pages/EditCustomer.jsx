import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";

function EditCustomer() {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [age, setAge] = useState("");
    const [occupation, setOccupation] = useState("");
    const [phoneNo, setPhone] = useState("");
    const [files, setFile] = useState(null);
    const [redirect, setRedirect] = useState(false);
  const {id}=useParams();
  const apiUrl = process.env.REACT_APP_API_URL;
   
  useEffect(()=>{
    fetch(`${apiUrl}/createNewUser/${id}`).then((response)=>{
        return response.json();
    }).then((postInfo)=>{
        setName(postInfo.name)
        setAddress(postInfo.address);
        setAge(postInfo.age);
        setOccupation(postInfo.occupation);
        setPhone(postInfo.phoneNo);
    })
  },[])
  const updatePost=async(e)=>{
    e.preventDefault();
    const formData=new FormData();
    formData.append("name", name);
    formData.append("address", address);
    formData.append("age", age);
    formData.append("occupation", occupation);
    formData.append("phoneNo", phoneNo);
    formData.append("file", files);
    formData.append("id",id);
    
    if(files?.[0])
    formData.set("file",files?.[0])
    const response=await fetch(`${apiUrl}/createNewUser`,{
        method:"PUT",
        body:formData,
        credentials:'include',
    })
    if(response.ok)
    setRedirect(true)
  }
  console.log("hello");
  if(redirect){
    return <Navigate to={`/createNewUser/${id}`}/>
  }
  return (
    <form className="login" onSubmit={updatePost}>
    <h1>Edit Details</h1>
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
      placeholder="occupation"
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
    <button>Update User</button>
  </form>
  );
}

export default EditCustomer;
