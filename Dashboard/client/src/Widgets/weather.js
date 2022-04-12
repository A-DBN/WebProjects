import React, { useState } from 'react';
import Banner from 'react-js-banner';
import axios from 'axios';
import './weather.css';
import Loader from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

function CurrentWeather() {
  const [city, setCity] = useState('Lille');
  const [loading, setLoading] = useState(true);
  const [json_body, setBody] = useState(null);
  const [unit, setUnit] = useState('c');

  React.useEffect(() => {
    console.log("Component drawn");
    return () => {
      console.log("Component removed");
    };
  }, []);

  const getResponse = async () => {
    try {
      const r = await axios.get('http://localhost:8080/v1/weather/current', {
        params: { city: city }
      });
      const body = await r.data;
      if (r.status !== 200) {
        throw Error(body.message);
      }
      console.log(body);
      return body;
    } catch (error) {
      console.log(error);
    }
  }

  const HandleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    getResponse().then((res) => {
      setBody(res);
      setLoading(false);
    });
  }

  return (

    <div className="App">
      <Banner title="Current local weather" css={{ backgroundColor: "orange" }} />
      <button onClick={() => setUnit(unit === 'c' ? 'f' : 'c')}>{unit === 'c' ? <div>Switch to Fahrenheit</div> : <div>Switch to Celsius</div>}</button>
      <form onSubmit={HandleSubmit}>
        <label>
          City: <br />
          <input type="text" value={city} onChange={e => setCity(e.target.value)} />
        </label>
        <input type="submit" value="Update" />
      </form>
      {
        loading ? <Loader type="TailSpin" color="#00BFFF" height={20} width={20}/> : <p>
        Local time: {json_body['location']['time']} <br />
        Current temperature is {json_body['temperature'][`temp_${unit}`]}°{unit.toUpperCase()}, feels like {json_body['conditions'][`feelslike_${unit}`]}°{unit.toUpperCase()}.<br />
        Sky: {json_body['temperature']['meteo']} <br />
        Humidity: {json_body['conditions']['humility']}% <br />
        </p>
      }
    </div >
  );
}

export default CurrentWeather;