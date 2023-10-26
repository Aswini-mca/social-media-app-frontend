import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CommentIcon from '@mui/icons-material/Comment';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import Badge from "@mui/material/Badge";
import PersonIcon from '@mui/icons-material/Person';
import { API } from '../global';

//UserProfile component
function UserProfile() {
  const [newpost, setNewPost] = useState("");
  const [error, setError] = useState("");
  const [userPost, setUserPost] = useState([]);
  const [comment, setComment] = useState("");
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  let token = localStorage.getItem("token");

  useEffect(()=>{
    fetchPost();
  },[])

  //fetchpost function definition
  const fetchPost = async () => {
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
      fetchPost();
    }
    // Reset the text field to empty after saving
    setNewPost('');

    // Scroll to the bottom of the page
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    });
  }

  const logout = () => {
    localStorage.removeItem("token")
  }
  return (
    <div>

      <div className='d-flex justify-content-around mb-3 bg-light p-2'>
        <Link className='fw-bold text-primary' aria-current="page" to='/home'>Home</Link>
        <Link className='fw-bold text-primary' aria-current="page" to='/statistics'>Statistics Page</Link>
        <Link className='fw-bold text-primary' aria-current="page" to='/' onClick={logout}>Logout</Link>
      </div>
      <h4>My Profile <PersonIcon color="primary" /></h4>
      <TextField
        id="post"
        label="Share your Thoughts"
        type="text"
        className='mt-3'
        inputProps={{ sx: { height: 50, width: 300 } }}
        value={newpost}
        onChange={(e) => setNewPost(e.target.value)}
      />
      <Button variant="contained" className='m-5' onClick={() => handlepost()}>Post</Button>
      {error ? <p className='text-danger'>{error}❗️</p> : ""}
      <h5 className='text-secondary'>My Post</h5>
      {userPost && (
        <div>
          {userPost?.map((post) => (
            <div className='post' key={post._id}>
              <div className='d-flex justify-content-end'>
                <IconButton aria-label="edit" color="secondary" onClick={() => navigate(`/edit-post/${post._id}`)}>
                  <EditIcon />
                </IconButton>
                <IconButton aria-label="delete" color="error"
                  onClick={async () => {
                    await fetch(`${API}/post/user/delete/${post._id}`, {
                      method: "DELETE",
                      headers: {
                        "x-auth-token": token
                      },
                    }).then(() => fetchPost());
                  }}>
                  <DeleteIcon />
                </IconButton>
              </div>
              <h5>{post.user.username}</h5>
              <p>{post.newpost}</p>
              <div>
                <IconButton aria-label="like-btn" color="primary" onClick={async () => {
                  await fetch(`${API}/post/user/like/${post._id}`, {
                    method: "PUT",
                    headers: {
                      "x-auth-token": token
                    },
                  }).then(() => fetchPost());
                }}>
                  <Badge badgeContent={post.likecount} color="secondary">
                    <ThumbUpIcon />
                  </Badge>
                </IconButton>
                <IconButton aria-label="like-btn" color="primary" onClick={() => setShow(!show)}>
                  <Badge badgeContent={post.commentCount} color="success">
                    <CommentIcon />
                  </Badge>
                </IconButton>
                {show ?
                  <div>
                    <TextField
                      id="comments"
                      label="Enter Comments"
                      type="text"
                      className='mt-3'
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                    <Button variant="contained" className='m-4' onClick={async () => {
                      const payload = { comment }
                      const res = await fetch(`${API}/post/user/comment/${post._id}`, {
                        method: "POST",
                        body: JSON.stringify(payload),
                        headers: {
                          "content-type": "application/json",
                          "x-auth-token": token
                        },
                      })
                      const data = await res.json();
                      if (data.error) {
                        setError(data.error)
                      }
                      fetchPost();
                      setShow(false)
                    }}>Enter</Button>
                    <hr /><b>Comments</b>
                    <ul>
                      {post.comments.map((comment, index) => (
                        <li key={index}><b>{post.user.username}</b> {comment.comment}</li>
                      ))}
                    </ul>
                  </div> : ""}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default UserProfile