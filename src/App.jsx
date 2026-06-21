import { useState,useEffect } from 'react'
import './App.css'

export default function App(){

  const [city,setcity] = useState("")
  const [input,setInput] = useState("")
  const[data,setData] = useState({})

  useEffect(()=>{
    getWeather("Delhi India")
  },[])

  useEffect(() => {
  if (data.current) {
    document.body.style.backgroundImage = `url(${getBackground(data.current.condition.text)})`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
  }
  }, [data]);

  function getBackground(condition) {
  if (condition.includes("Sunny") || condition.includes("Clear")) {
    return "/backgrounds/sunny.jpeg";
  }

  if (condition.includes("Cloud")) {
    return "/backgrounds/default.jpeg";
  }

  if (condition.includes("Rain")) {
    return "/backgrounds/rainy.jpeg"; 
  }

  if (condition.includes("Snow")) {
    return "/backgrounds/default.jpeg"; 
  }

  return "/backgrounds/default.jpeg";
}


  async function getWeather(cityname) {
  const response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=d7918b3edd39484aa9a104545261406&q=${cityname}&aqi=no`
  );

  const data = await response.json();
  if(data.error){
    if(data.error.message=="Parameter q is missing."){
      alert("No Input");
    }
    else{
      alert(data.error.message);
    }
    
    return;
  }
  setData(data)
  setcity(cityname)
  console.log(data);
  
  }
  return(
    <>

    {data.current?.condition?.text.includes("Rain") ||  data.current?.condition?.text.includes("Light rain") || data.current?.condition?.text.includes("rain")   &&(
    <div className="rain">
      {[...Array(120)].map((_, i) => (
        <span
          key={i}
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random()}s`,
            animationDuration: `${0.5 + Math.random()}s`,
          }}
        />
      ))}
    </div>
    )}

    {data.current?.condition?.text.includes("Thunder") && (
      <div className="lightning"></div>
    )}

    {data.current?.temp_c<0 &&(
    <div className="snow">
      {[...Array(80)].map((_, i) => (
        <span
          key={i}
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${5 + Math.random() * 5}s`,
            width: `${3 + Math.random() * 5}px`,
            height: `${3 + Math.random() * 5}px`,
          }}
        />
      ))}
    </div>
    )}
    <div id='weather'>
      <div  className="app">
        <h2 >Weather App</h2>
      </div>
      <div className="input-div">
        <input  className="input"  
        type="text"  
        placeholder="Enter a City Name" 
        value={input} 
        onChange={(e)=>setInput(e.target.value)} 
        />
      <button onClick={()=>{
        getWeather(input);
      }}>Search</button>
      </div>
      
    </div>
    <div className="main-div">
      {data.location && (
        <div className='content'>
        <h2>{data.location.name}</h2>
        <img
          src={data.current.condition.icon}
          alt={data.current.condition.text}
        />
        {console.log(data.current.condition.text)}
        
        
        </div>
      )}
      {data.location &&(
        <div className='temp'>
          <h2>{data.current.temp_c} °C</h2>
        </div>
      )}
      {data.location &&(
        <div>
          <div className='grid-container'>
          <div className='box'>
            <img src="/Icons/sun-ray.png" alt="UV" />
            <p>UV</p>
            <p>{data.current.uv}</p>
          </div>

          <div className='box'>
            <img src="/Icons/temperature.png" alt="Feels Like" />
            <p>Feels like</p>
            <p>{data.current.feelslike_c}°C</p>
          </div>

          <div className='box'>
            <img src="/Icons/humidity.png" alt="Humidity" />
            <p>Humidity</p>
            <p>{data.current.humidity}%</p>
          </div>
          
      </div>
      <div className='grid-container'>
          <div className='box'>
            <img src="/Icons/wind.png" alt="Wind Speed" />
            <p>Wind Speed</p>
            <p>{data.current.wind_kph} km/h</p>
          </div>

          <div className='box'>
            <img src="/Icons/pressure.png" alt="Air Pressure" />
            <p>Air Pressure</p>
            <p>{data.current.pressure_mb} hPa</p>
          </div>
          
          <div className='box'>
            <img src="/Icons/shared-vision.png" alt="Visibility" />
            <p>Visibility</p>
            <p>{data.current.vis_km} Km</p>
          </div>
          
      </div>
        </div>
      )}
      
      
    </div>
  </>
  )
}
