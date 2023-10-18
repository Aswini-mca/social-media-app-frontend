import React from 'react'
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import { Link } from 'react-router-dom';

//home component
function Home() {
    return (
        <div>
            <h3 className='container-fluid head text-center p-2'>Social Media App</h3>
            <img src='https://www.heritagetrustnetwork.org.uk/wp-content/uploads/2021/03/800px-Social-media-1.webp_.png' alt='...' height={200} width={400} />
            <h3 className='container text-center mt-5'>Login</h3>
            <TextField
                id="username"
                label="Username"
                type="text"
                placeholder="Username"
            /><br />
            <TextField
                id="outlined-password-input"
                className='mt-3'
                label="Password"
                type="password"
                autoComplete="current-password"
            />
            <br />
            <Button variant="contained" className='mt-3 mb-3'>Login</Button>
            <p>Doesn't Have an account yet?<Link aria-current="page" to="#"> Signup</Link></p>
            <p className='mt-3'><Link aria-current="page" to="#">Forget Password</Link></p>

        </div>
    )
}

export default Home