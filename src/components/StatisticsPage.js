import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { API } from '../global';
import ChartComponent from './Chart';

//Statistics page component
function StatisticsPage() {
    const [post, setPost] = useState([])
    let token = localStorage.getItem("token");

    useEffect(() => {
        fetch(`${API}/post/totalLikes/totalComments`, {
            method: "GET",
            headers: {
                "content-type": "application/json",
                "x-auth-token": token
            },
        })
            .then((res) => res.json())
            .then((data) => setPost(data.data));
    }, [token]);
    
    // Format data for Chart.js
    const chartData = {
        labels: post.map((post, index) => `Post ${index + 1}`),
        datasets: [
            {
                label: 'Likes',
                data: post.map((count) => count.totalLike),
                backgroundColor: 'rgba(75,192,192,0.2)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
                barPercentage: 0.4
            },
            {
                label: 'Comments',
                data: post.map((count) => count.totalComment),
                backgroundColor: 'rgba(219, 105, 139,0.2)',
                borderColor: 'rgba(219, 105, 139,1)',
                borderWidth: 1,
                barPercentage: 0.4
            }
        ],
    };

    // Check if counts data is available before rendering the chart
    if (post.length === 0) {
        return <div class="spinner-border text-secondary m-5" role="status">
        <span class="visually-hidden">Loading...</span> </div>;
    }

    const logout = () => {
        localStorage.removeItem("token")
    }
    return (
        <div>
            <div className='d-flex justify-content-around mb-3'>
                <Link className='fw-bold text-primary' aria-current="page" to='/home'>Home</Link>
                <Link className='fw-bold text-primary' aria-current="page" to='/user-profile'>My Profile</Link>
                <Link className='fw-bold text-primary' aria-current="page" to='/' onClick={logout}>Logout</Link>
            </div>
            {/* passing data to ChartComponent */}

            <div className='container text-center mt-3'>
                <ChartComponent data={chartData} />
            </div>
        </div>
    )
}

export default StatisticsPage