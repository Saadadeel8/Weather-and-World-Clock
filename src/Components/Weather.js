import {React, useState} from 'react'
import { Input, Table } from 'antd';
import axios from 'axios'

 
function Weather() {
  console.log(process.env.REACT_APP_WEATHER_API_KEY)
const [weatherData, changeWeatherData] = useState(null)
const [data, changeData] = useState(null)
const { Search } = Input;
const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

const renderContent = (value, row, index) => {
  const obj = {
    children: value,
    props: {},
  };
  if (index === 4) {
    obj.props.colSpan = 0;
  }
  return obj;
};

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    render: renderContent,
  },
  {
    title: 'Weather',
    dataIndex: 'weather',
    render: renderContent,
  },
  {
    title: 'Temperature',
    dataIndex: 'temp',
    render: (val) => Number.parseFloat(val - 273.15).toPrecision(4),
  },
  {
    title: 'High Temp',
    dataIndex: 'htemp',
    render:  (val) => Number.parseFloat(val - 273.15).toPrecision(4),
  },
  {
    title: 'Low Temp',
    dataIndex: 'ltemp',
    render:  (val) => Number.parseFloat(val - 273.15).toPrecision(4),
  },
  
];
  
const onSearch = (cityName) => {
  
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`)
    .then(res => {
        changeWeatherData(res.data);
        changeData([
          {
            key: '1',
            name: res.data.name,
            temp: res.data.main.temp,
            htemp: res.data.main.temp_max,
            ltemp: res.data.main.temp_min,
            weather: res.data.weather[0].main,
          }
        ])
    }
    )
    .then(console.log(data))
    }
const data2 = [
  {
    key: '1',
    name: 'City',
    temp: 'Temperature',
    htemp: 'High Temperature',
    ltemp: 'Low Temperature',
    weather: 'Weather',
  }
]

const handleSwitch = () => {
  changeData([
    {
      key: '1',
      name: weatherData.name,
      temp: ((weatherData.main.temp * 9/5) + 32),
      htemp: ((weatherData.main.temp_max * 9/5) + 32),
      ltemp: ((weatherData.main.temp_min * 9/5) + 32),
      weather: weatherData.weather[0].main,
    }
  ])}
console.log(weatherData)

    return (
      <div className='FullApp'>
      <div className='searchBar'>
      <Search
      placeholder="Enter City Name"
      allowClear
      enterButton="Search"
      size="large"
      onSearch={onSearch}
    />
    </div>
 

    {data ? 
    <div>
      <Table columns={columns} dataSource={data.length ? data : data2} bordered />
    </div>
    :<Table columns={columns} dataSource={data2} bordered />
    }
    {data ?
    <div>
    {weatherData.weather[0].main === 'Clouds'?<div className="cloudy"><span className="cloud"></span><span className="cloudx"></span></div> 
    : weatherData.weather[0].main === 'Clear'?<div className="hot"><span className="sun"></span><span className="sunx"></span></div>
    : weatherData.weather[0].main === 'Snow'?<div className="stormy">
    <ul>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    </ul>
    <span className="snowe"></span>
    <span className="snowex"></span>
    <span className="stick"></span>
    <span className="stick2"></span>
    </div> 
    : weatherData.weather[0].main === 'Rain'?
    <div className="breezy">
    <ul>
    
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li> 
    </ul>
    <span className="cloudr"></span>
    
    
    </div>
    : weatherData.weather[0].main === 'Rain'?
    <div className="night">
    <span className="moon"></span>
    <span className="spot1"></span>
    <span className="spot2"></span>
    <ul>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li> 
    </ul>
    
    </div> : null}
    </div> : null}
    
<div>
°C <label className="switch">
  <input type="checkbox" onChange={handleSwitch} />
  <span className="slider round"></span>
</label> °F 
</div>
    </div>
    
    )
}

                  
export default Weather

