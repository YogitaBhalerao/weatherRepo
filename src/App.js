import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useState } from 'react';
import axios from 'axios'

function App() {
  const apiKey = "fe0a43a1eeee3959a8fc647e42e22035"

  const [inputCity, setInputCity] = useState("")
  const [data, setData] = useState({})

  const getWeatherDetails = (cityName) => {
    if (!cityName) return
    const apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey
    axios.get(apiURL).then((res) => {
      console.log("response is ", res.data)
      setData(res.data)
    }).catch((err) => {
      console.log("error is ", err)
      alert("The City Not Found")
    })
  }
  const handleInputCity = (event) => {
    setInputCity(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    getWeatherDetails(inputCity)
    setInputCity("")
  }

  return (
    <>
      <div className='col-md-12'>
        <div className="main-image">
          <h1 className='heading'>Welcome To Weather App</h1>
          <div className='d-grid gap-3 col-4 mt-4'>
            <input type='text' className='form-control' placeholder='Type city ...'
              value={inputCity}
              onChange={handleInputCity} />
            <button className='btn btn-primary' onClick={handleSubmit}>Search Here </button>
          </div>
        </div>
        {Object.keys(data).length > 0 &&
          <div className='col-md-12 text-center mt-5'>
            <div className='shadow rounded weatherResultBox'>
              <img src="https://img.icons8.com/cute-clipart/64/null/partly-cloudy-day.png" 
              className='imgIcon' alt='no' />
            <div className='cityTemp'>
                 <h4 className='cityname'>{data?.name}</h4> 
                 <h2 className='citytemp'>{((data?.main?.temp) - 273.15).toFixed(2)}°C</h2>
            </div> 
            <div className='container'>
                 <h6><img  className='tempIcon' src="https://img.icons8.com/external-kiranshastry-gradient-kiranshastry/64/null/external-cloud-multimedia-kiranshastry-gradient-kiranshastry.png" alt='no'/>
                  {data?.weather[0]?.description}</h6>
                 <h6><img src="https://img.icons8.com/fluency/48/null/dew-point.png" className='humidityIcon' alt='no'/>Humidity : {data?.main?.humidity} %</h6>
                 <h6><img src="https://img.icons8.com/nolan/64/wind.png" className='windIcon' alt='no'/>Wind Speed : {data?.wind?.speed} Km/h</h6>
            </div>
            </div>
          </div>
        }

      </div>
    </>
  );
}


export default App;
