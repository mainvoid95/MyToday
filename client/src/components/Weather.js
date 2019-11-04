import React from 'react';
import axios from 'axios';


class Weather extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            temp: '',
            Weather: '',
            cityname: '',
        }
    }

    weatherApi = axios.create({
        baseURL: 'https://api.openweathermap.org/data/2.5',
        params: {
            APPID: '9bf1118397af33b243c4d2efd6a0ebb5'
        }
    });

    componentDidMount = () => {
        navigator.geolocation.getCurrentPosition(position => {
            console.log(position);
            // api 추가 파라미터로 latitude, longitude 추가
          const getWeather = this.weatherApi.get('/weather',
              {
                  params: {
                      lat: position.coords.latitude,
                      lon: position.coords.longitude,
                  },
              },
              err => console.log(err)
          );
          getWeather
              .then(res => {
                  this.setState({
                      temp: Math.ceil(res.data.main.temp - 273.15), // 온도(섭씨온도 계산)
                      Weather: res.data.weather[0].main, // 날씨
                      cityname: res.data.name, // 지역
                  });
              })
              .catch(err => console.log(err));
      });
    }

    render(){
        return(
            <a>
                {this.state.temp} {this.state.weather} {this.state.cityname}
            </a>
        )
    }
}


export default Weather;