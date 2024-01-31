import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { API } from '../global'
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";


//reset password component
function ResetPassword() {
    const { resetToken } = useParams()
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")

    //handlesubmit coding
    const handlesubmit = async () => {
        const payload = {
            newPassword,
            confirmPassword
        }
        const res = await fetch(`${API}/users/reset-password/${resetToken}`, {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                "content-type": "application/json",
            },
        })
        const data = await res.json();
        if (data.error) {
            setError(data.error)
        }
        if (data.message) {
            setMessage(data.message);
            setError('');
        }
    }
    return (
        <div>
            <div className='top'>
                <h4>Reset Password Page</h4>
                <TextField
                    id="new password"
                    className='mt-3'
                    label="New Password"
                    type="password"
                    autoComplete="current-password"
                    value={newPassword}
                    title='For strong Password min of 8 chars combo(A-Za-z0-9)1 special char'
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <br />
                <TextField
                    id="confirm password"
                    className='mt-3'
                    label=" Confirm Password"
                    type="password"
                    autoComplete="current-password"
                    value={confirmPassword}
                    title='For strong Password min of 8 chars combo(A-Za-z0-9)1 special char'
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <br />
                <Button variant="contained" className='mt-3' onClick={handlesubmit}>Sumbit</Button>

                {error ? <p className='text-danger mt-2'>{error}❗️</p> : ""}
                {message ? <p className='text-success text-center'>{message}✅ please click <Link aria-current="page" to="/" className='text-primary fw-bold'>Login</Link></p> : ""}
            </div>
        </div>
    )
}

export default ResetPassword