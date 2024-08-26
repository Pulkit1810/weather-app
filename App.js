import React, {useState} from 'react';
import WeatherSearch from './components/WeatherSearch.js';
import WeatherDisplay from './components/WeatherDisplay.js';
import WeatherHistory from './components/WeatherHistory.js';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  const handleSearch = async () => {
    if(!city) return;

    const apiKey = 'af167d1bd902d997d7c5129e3f14381e';
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
    const data = await response.json();

    if(data.cod !== 200){
        alert('City not found!');
        return;
    }

    const {lat,lon} = data.coord;

    const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=7&units=metric&appid=${apiKey}`);
    const forecastData = await forecastResponse.json();
    const options ={weekday:'long'};

    const weather = {
        city: data.name,
        country: data.sys.country,
        current_temp: forecastData.list[0].main.temp,
        current_date: new Date(forecastData.list[0].dt * 1000).toLocaleDateString('en-US',options),
        daily: forecastData.list.map(day =>({
            date: new Date(day.dt * 1000).toLocaleDateString('en-US',options),
            temp: day.main.temp,
            icon: day.weather[0].icon,
        }))
    };

    setWeatherData(weather);
    setHistory([weather,...history]);

  }

  const navigateToHistory = () => {
    setShowHistory(true);
  }

  const navigateBack = () => {
    setShowHistory(false);
  }

  return (
    <div className='App'>
        { !showHistory ? (
            <>
                <WeatherSearch 
                city = {city}
                setCity = {setCity}
                handleSearch = {handleSearch}
                navigateToHistory = {navigateToHistory} />
                <WeatherDisplay weatherData = {weatherData}/>
            </>
        ) : (<WeatherHistory history={history} navigateBack={navigateBack} />)

        }
    </div>
  );



}

export default App;
