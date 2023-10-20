import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import { Link, useNavigate } from 'react-router-dom';
import { API } from '../global';

//home component
function Login() {

  const [username, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  //handlelogin coding
  const handlelogin = async () => {
    const payload = {
      username,
      password
    }
    const res = await fetch(`${API}/users/login`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "content-type": "application/json",
      },
    })
    const data = await res.json();
    if (data.token) {
      setError("");
      localStorage.setItem("token", data.token)
      navigate('/home')
    }
    else {
      setError(data.error)
    }
  }

  return (
    <div>
      <img src='https://www.heritagetrustnetwork.org.uk/wp-content/uploads/2021/03/800px-Social-media-1.webp_.png' alt='...' height={200} width={400} />
      <h3 className='container text-center mt-5'>Login</h3>
      <TextField
        id="username"
        label="Username"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUserName(e.target.value)}
      /><br />
      <TextField
        id="outlined-password-input"
        className='mt-3'
        label="Password"
        type="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <Button variant="contained" className='mt-3 mb-3' onClick={handlelogin}>Login</Button>
      {error ? <p className='text-danger'>{error}❗️</p> : ""}
      <p>Doesn't Have an account yet?<Link aria-current="page" to="/signup"> Signup</Link></p>
      <p className='mt-3'><Link aria-current="page" to="/forget-password">Forget Password</Link></p>

    </div>
  )
}

export default Login