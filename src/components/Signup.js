import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { API } from '../global'
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


//signup component
function Signup() {
    const [username, setUserName] = useState("")
    const [firstname, setFirstName] = useState("")
    const [lastname, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [gender, setGender] = useState("")
    const [dob, setDob] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()

    //handlesignup coding
    const handlesignup = async () => {
        const payload = {
            username,
            firstname,
            lastname,
            email,
            password,
            gender,
            dob
        }
        const res = await fetch(`${API}/users/signup`, {
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
            navigate('/')
        }
    }

    return (
        <div>
            <h4 className='container'>SignUp</h4>
            <TextField
                id="username"
                label="Username"
                type="text"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
            /><br />
            <TextField
                id="firstname"
                label="FirstName"
                type="text"
                className='mt-3'
                value={firstname}
                onChange={(e) => setFirstName(e.target.value)}
            /><br />
            <TextField
                id="lastname"
                label="LastName"
                type="text"
                className='mt-3'
                value={lastname}
                onChange={(e) => setLastName(e.target.value)}
            /><br />
            <TextField
                id="email"
                label="Email"
                type="email"
                className='mt-3'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            /><br />
            <TextField
                id="outlined-password-input"
                className='mt-3'
                label="Password"
                type="password"
                autoComplete="current-password"
                value={password}
                title='For strong Password min of 8 chars combo(A-Za-z0-9)1 special char'
                onChange={(e) => setPassword(e.target.value)}
            /><br />
            <FormControl>
                <FormLabel id="gender">Gender</FormLabel>
                <RadioGroup
                    aria-labelledby="gender"
                    row
                    name="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}>

                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                    <FormControlLabel value="other" control={<Radio />} label="Other" />
                </RadioGroup>
            </FormControl>
            <span className='d-flex justify-content-center mb-3'>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker', 'DatePicker']}>
                        <DatePicker
                            label="DOB"
                            value={dob}
                            onChange={(newValue) => setDob(newValue)}
                        />
                    </DemoContainer>
                </LocalizationProvider>
            </span>
            {error ? <p className='text-danger'>{error}❗️</p> : ""}
            <Button variant="contained" onClick={handlesignup}>SignUp</Button>
        </div>
    )
}

export default Signup