import { useState,useEffect } from 'react'
import './App.css'
import { getWeatherData } from "./api/weather.js"
import { format } from 'date-fns';
function App() {
  const [ forecast , setForecast ] = useState([])
  const fetchData = async ()=>{
    let response = await getWeatherData("https://api.openweathermap.org/data/2.5/forecast?q=london&appid=d2929e9483efc82c82c32ee7e02d563e&cnt=10")
    const weatherData = response.data.list.map(day => {
      let message = '';
      const tempMax = day.main.temp_max - 273.15; // Convert to Celsius
      const windSpeed = day.wind.speed * 2.23694; // Convert to mph

      if (tempMax > 40) message += 'Use sunscreen lotion. ';
      if (day.weather[0].main === 'Rain') message += 'Carry umbrella. ';
      if (windSpeed > 10) message += "It’s too windy, watch out! ";
      if (day.weather[0].main === 'Thunderstorm') message += "Don’t step out! A Storm is brewing! ";

      return {
        date: day.dt_txt,
        highTemp: tempMax.toFixed(2),
        lowTemp: (day.main.temp_min - 273.15).toFixed(2),
        message: message || 'No warnings for today'
      };
    });
    setForecast(weatherData)
  }
  useEffect(()=>{
    fetchData()
  },[])
  return (
    <>
     <div>
      <h1>Weather Forecast</h1>
      <table border="1" width="100%">
        <thead>
          <tr>
            <th>Date</th>
            <th>High Temp (°C)</th>
            <th>Low Temp (°C)</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          {forecast && forecast.length > 0 ? (
            forecast.map((day, index) => (
              <tr key={index}>
                <td>{format(new Date(day.date), 'dd/MM/yyyy hh:mm a')}</td>
                <td>{day.highTemp}</td>
                <td>{day.lowTemp}</td>
                <td>{day.message}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">Loading weather data...</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
 
    </>
  )
}

export default App
