import React, { useState, useEffect } from 'react';
import './Weather.css';
import Navbar from './Navbar';
import Footer from './Footer';

const Weather = () => {
  const [timeOfDay, setTimeOfDay] = useState('');
  const [activeTab, setActiveTab] = useState('current');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setTimeOfDay('morning');
    else if (hour < 17) setTimeOfDay('afternoon');
    else setTimeOfDay('evening');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const weatherData = {
    current: {
      temp: '24°C',
      humidity: '65%',
      windSpeed: '12 km/h',
      description: 'Partly Cloudy'
    },
    forecast: [
      { day: 'Tomorrow', high: '29°C', low: '18°C', condition: 'Sunny' },
      { day: 'Wednesday', high: '27°C', low: '17°C', condition: 'Clear' },
      { day: 'Thursday', high: '28°C', low: '18°C', condition: 'Partly Cloudy' }
    ],
    tips: {
      morning: 'Perfect time for a morning walk in Cubbon Park.',
      afternoon: 'Consider visiting indoor attractions during peak sun.',
      evening: 'Great time for rooftop dining or evening shows.'
    }
  };

  const handleCheckWeather = () => {
    window.open('https://openweathermap.org/city/1277333', '_blank');
  };

  return (
    <>
        <Navbar />
    <div className={`weather-page ${timeOfDay}`}>
      <div className="weather-hero">
        <div className="weather-header">
          <h1>Weather in Bengaluru</h1>
          <p>Your guide to planning each day at STIS-V 2025</p>
        </div>
      </div>

      <div className="weather-tabs">
        <button
          className={`tab-button ${activeTab === 'current' ? 'active' : ''}`}
          onClick={() => setActiveTab('current')}
        >
          Current Weather
        </button>
        <button
          className={`tab-button ${activeTab === 'forecast' ? 'active' : ''}`}
          onClick={() => setActiveTab('forecast')}
        >
          3-Day Forecast
        </button>
      </div>

      {activeTab === 'current' && (
        <div className="weather-content fade-in">
          <div className="weather-card">
            <div className="main-temp">{weatherData.current.temp}</div>
            <div className="weather-meta">
              <p><strong>Humidity:</strong> {weatherData.current.humidity}</p>
              <p><strong>Wind Speed:</strong> {weatherData.current.windSpeed}</p>
              <p><strong>Condition:</strong> {weatherData.current.description}</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'forecast' && (
        <div className="forecast-grid fade-in">
          {weatherData.forecast.map((day, index) => (
            <div className="forecast-card" key={index}>
              <h3>{day.day}</h3>
              <p>{day.condition}</p>
              <div className="temp-range">
                <span>High: {day.high}</span>
                <span>Low: {day.low}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="local-tip">
        <div className="tip-header">🌤 Local Tip</div>
        <p className="tip-text">{weatherData.tips[timeOfDay]}</p>
      </div>

      <div className="weather-cta">
        <button onClick={handleCheckWeather}>Check Live Weather</button>
      </div>
    </div>
    <br />
    <br />
    <Footer />
    </>
  );
};

export default Weather;
