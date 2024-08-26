import React from 'react';
import './WeatherSearch.css';

function WeatherSearch({city, setCity, handleSearch, navigateToHistory}) {
    return(
        <div className = "weather-search">
            <h2>Weather</h2>
            <div className='search-container'>
                <input type= "text"
                placeholder='City...'
                value={city}
                onChange={(e) => setCity(e.target.value)}
                />
                <button onClick = {handleSearch}>Search</button>
                <button onClick = {navigateToHistory} className='history-button'>History</button>
            </div>
        </div>
    )
}

export default WeatherSearch;