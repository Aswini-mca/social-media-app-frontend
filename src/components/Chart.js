import React from 'react';
import { Bar } from 'react-chartjs-2';
import { CategoryScale, Chart, registerables } from "chart.js";

Chart.register(CategoryScale);
Chart.register(...registerables);

const ChartComponent = ({ data }) => {
    return (
        <div>
            <h4 className='container mt-3 mb-3'>Post Likes & Comments Count Chart</h4>
            <Bar data={data} />
        </div>
    );
};

export default ChartComponent;