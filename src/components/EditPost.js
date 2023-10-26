import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import { API } from '../global';

//edit post component
function EditPost() {
    const [post, setPost] = useState(null);
    const { id } = useParams();
    let token = localStorage.getItem("token");

    useEffect(() => {
        fetchPost();
    }, [])

    //fetchpost function
    const fetchPost = async () => {
        const res = await fetch(`${API}/post/all/${id}`, {
            method: "GET",
            headers: {
                "content-type": "application/json",
                "x-auth-token": token
            },
        })
        const data = await res.json();
        if (data.data) {
            setPost(data.data)
        }
    }

    return post ? <EditPostForm post={post} /> : "Loading...";

}


function EditPostForm({ post }) {

    console.log(post)
    const [editPost, setEditPost] = useState(post.newpost);
    const [error, setError] = useState("");
    let token = localStorage.getItem("token");
    const navigate = useNavigate();

    //handlepost coding
    const handlepost = async () => {
        const payload = {
            newpost:editPost
        }
        const res = await fetch(`${API}/post/user/edit/${post._id}`, {
            method: "PUT",
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
    }
    return (
        <div>
        <h5 className='text-primary'>Edit Post Page</h5>
            <TextField
                id="editpost"
                label="Edit Post"
                type="text"
                className='mt-3'
                value={editPost}
                onChange={(e) => setEditPost(e.target.value)}
            />
            <Button variant="contained" className='m-4' onClick={()=>{handlepost();navigate('/user-profile')}}>Save</Button>
            {error ? <p className='text-danger'>{error}❗️</p> : ""}
        </div>
    )
}
export default EditPost