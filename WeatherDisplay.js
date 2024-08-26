import React from "react";
import { LineChart, Line, XAxis,YAxis,CartesianGrid,Tooltip, ResponsiveContainer } from 'recharts';
import './WeatherDisplay.css';

function WeatherDisplay({weatherData}) {
    if(!weatherData) return <p>No weather Data available</p>;

    const {
        city = 'Unknown',
        country = 'Unknown',
        current_temp = 'Unknown',
        current_date = 'Unknown',
        daily = []
    } = weatherData;

    const chartData = daily.map(day => ({
        date: day.date,
        temp: Math.round(day.temp)
    }));

    return (
        <div className = "weather-display">
            <div className="weather-container">
                <h3>{city},{country}</h3>
                <p>{current_date}</p>
                <h3>{current_temp}°C</h3>
            </div>
            <div className="chart-container">
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={chartData}>
                        <XAxis dataKey="date"></XAxis>
                        <YAxis />
                        <Tooltip/>
                        <Line type="monotone" dataKey="temp" stroke="#8884d8" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            <div className="forecast">
                {daily.length > 0 ? (
                    daily.map((day,index) => (
                        <div key={index} className="day">
                            <p>{day.date}</p>
                            <img src ={`http://openweathermap.org/img/wn/${day.icon}.png`}/>
                            <p>{Math.round(day.temp)}°C</p>
                            <p>{day.description}</p>
                        </div>
                    ))
                ):(<p>No forecast available</p>
                )}
            </div>
        </div>
    );
}

export default WeatherDisplay;