import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import { API } from '../global';

//home component
function Home() {
  const [newpost, setNewPost] = useState("")
  const [error, setError] = useState("")
  // const [message, setMessage] = useState("")

  //handlepost coding
  const handlepost = async () => {
    const payload = {
      newpost
    }
    let token = localStorage.getItem("token");
    const res = await fetch(`${API}/post/user/new-post`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "content-type": "application/json",
        "x-auth-token": token
      },
    })
    const data = await res.json();
    if (data.error) {
      setError(data.error);
    }
    if(data.message){
      alert("Posted Successfully")
    }
  }
  return (
    <div>
     <h4 className='mt-3'>Welcome to Social Media App.Here you can share your thoughts by posting text...</h4>
     <Link className='fw-bold text-primary' aria-current="page" to='/user-profile'>My Profile</Link><br/>
    <TextField
        id="username"
        label="Share your Thoughts"
        type="text"
        className='mt-3'
        value={newpost}
        onChange={(e)=>setNewPost(e.target.value)}
      />
      <Button variant="contained" className='m-4' onClick={handlepost}>Post</Button>
      {error ? <p className='text-danger'>{error}❗️</p> : ""}
    </div>
  )
}

export default Home