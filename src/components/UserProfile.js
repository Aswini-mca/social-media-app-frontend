import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CommentIcon from '@mui/icons-material/Comment';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import Badge from "@mui/material/Badge";
import { API } from '../global';

//UserProfile component
function UserProfile() {
  const [newpost, setNewPost] = useState("")
  const [error, setError] = useState("")
  const [userPost, setUserPost] = useState([])
  let token = localStorage.getItem("token");

  useEffect(() => {

    const fetchData = async () => {
      const res = await fetch(`${API}/post/user/all`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          "x-auth-token": token
        },
      })
      const data = await res.json();
      if (!data.data) {
        setError(data.error)
      } else {
        setUserPost(data.data)
      }
    }
    fetchData();
  }, [])
  //handlepost coding
  const handlepost = async () => {
    const payload = {
      newpost
    }

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
    if (data.message) {
      alert("Posted Successfully")
    }
  }
  return (
    <div>
      <h4>My Profile</h4>
      <Link className='fw-bold text-primary' aria-current="page" to='/home'>Home</Link><br />
      <TextField
        id="username"
        label="Share your Thoughts"
        type="text"
        className='mt-3'
        value={newpost}
        onChange={(e) => setNewPost(e.target.value)}
      />
      <Button variant="contained" className='m-4' onClick={handlepost}>Post</Button>
      {error ? <p className='text-danger'>{error}❗️</p> : ""}
      {userPost && (
        <div>
          {userPost?.map((post) => (
            <div className='post' key={post._id}>

              <div className='d-flex justify-content-end'>
                <IconButton
                  aria-label="edit"
                  color="secondary"
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  color="error"
                // onClick={() => {
                //   fetch(`${API}/post/user/delete/${post.id}`, { method: "DELETE" }).then(
                //     () => fetchData()
                //   );
                // }}
                >
                  <DeleteIcon />
                </IconButton>
              </div>
              <h5>{post.user.username}</h5>
              <p>{post.newpost}</p>
              <div className='d-flex justify-content-around'>
                <IconButton aria-label="like-btn" color="primary">
                  <Badge badgeContent={0} color="primary">
                    <ThumbUpIcon />{post.likecount}
                  </Badge>
                </IconButton>
                <IconButton aria-label="like-btn" color="primary">
                  <Badge badgeContent={0} color="primary">
                    <CommentIcon />{post.commentCount}
                  </Badge>
                </IconButton>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default UserProfile