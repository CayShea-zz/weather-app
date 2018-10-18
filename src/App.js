import React, { Component } from 'react';
import Titles from './components/titles';
import Form from './components/form';
import Weather from './components/weather';

const API_KEY = "d401243ee42b65735f1a9f0820699d63";

class App extends Component {
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  }
  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${API_KEY}`)
    const data = await api_call.json();
    // console.log(data);

    if (city && country){
      this.setState({
        temperature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description
      });
    } else {
      this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: "Please enter City and Country"
      });
    }
  }
  render() { 
    return (
        <div>
          <Titles />
          <Form getWeather= {this.getWeather} />
          <Weather 
            temperature= {this.state.temperature}
            city = {this.state.city}
            country= {this.state.country}
            humidity = {this.state.humidity}
            description = {this.state.description}
            error = {this.state.error}
            />
        </div>

    );
  }
}
 
export default App;