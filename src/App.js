import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useState } from 'react';
import axios from 'axios'

function App() {
  const apiKey = "fe0a43a1eeee3959a8fc647e42e22035"

  const [inputCity, setInputCity] = useState("")
  const [data, setData] = useState({})

  const getWeatherDetails = (cityName) => {
    if(!cityName) return
    const apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey
    axios.get(apiURL).then((res) => {
      console.log("response is ", res.data)
      setData(res.data)
    }).catch((err) => {
      console.log("error is ", err)
    })
  }


  const handleInputCity = (event) => {
    setInputCity(event.target.value)
    //     console.log(event.target.value)
    // }
  }


  const handleSubmit = (event) => {
    // alert("Gooo")
    event.preventDefault()
    getWeatherDetails(inputCity)

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
        {Object.keys(data).length >0 &&
        <div className='col-md-12 text-center mt-5'>
          <div className='shadow rounded weatherResultBox'>
            {/* <i class="bi bi-cloud-lightning-rain-fill" ></i> */}
            <h4>{data?.name}</h4>
            <h2>{((data?.main?.temp) - 273.15).toFixed(2)}°C</h2>
          </div>

        </div>
          }
      </div>
    </>
  );
}

export default App;
