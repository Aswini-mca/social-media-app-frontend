import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { API } from '../global'
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";

//forget password component
function ForgetPassword() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [resetToken, setResetToken] = useState("")

  //handlesubmit coding
  const handlesubmit = async () => {
    const payload = {
       email
    }
    const res = await fetch(`${API}/users/forget-password`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "content-type": "application/json",
      },
    })
    const data = await res.json()
    if (data.error) {
      setError(data.error)
    }
    if (data.message) {
      setMessage(data.message);
      setError('');
    }
    if (data.resetToken) {
      setResetToken(data.resetToken)
    }
  }
  return (
    <div>
    <div className='top'>
      <h4>Forget Password ?</h4>
      <p>Please enter your registered email address we will get back to you with the reset password link</p>
      <TextField
          id="email"
          label="Email"
          type="email" 
          className='mt-3'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
      /><br />
      <Button variant="contained" className='mt-3' onClick={handlesubmit}>Sumbit</Button>
      {error ? <p className='text-danger mt-2'>{error}❗️</p> : ""}
      {message ? <p className='text-success text-center'>{message}✅</p> : ""}
      {message ? <Link className='fw-bold text-primary text-center' aria-current="page" to={`/reset-password/${resetToken}`}>Reset Password Link</Link> : ""}
      </div>
    </div>
  )
}

export default ForgetPassword