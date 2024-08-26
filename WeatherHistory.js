import React from 'react';
import './WeatherHistory.css';

function WeatherHistory({history,navigateBack}){
    return(
        <div className="weather-history">
            <button onClick={navigateBack} className="back-button">Back</button>
            <ul>
                {history.map((item,index) => (
                    <li key={index}>
                        <p>{item.city} {item.current_temp}°C {item.current_date}</p>
                        <button>Edit</button>
                        <button>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default WeatherHistory;