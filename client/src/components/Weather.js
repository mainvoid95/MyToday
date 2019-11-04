import React from 'react';
import axios from 'axios';


class Weather extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            temp: '',
            weather: '',
        }
    }

    weatherApi = axios.create({
        baseURL: 'https://api.openweathermap.org/data/2.5',
        
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
                      APPID: '9bf1118397af33b243c4d2efd6a0ebb5',
                  },
              },
              err => console.log(err)
          );
          getWeather
              .then(res => {
                  this.setState({
                      temp: Math.ceil(res.data.main.temp - 273.15), // 온도(섭씨온도 계산)
                      weather: res.data.weather[0].main, // 날씨
                  });
              })
              .catch(err => console.log(err));
      });
    }

    temploading = (input) => {
        if(input !== ""){
            input = String(input) + "℃";
        }
        return input;
    }

    weathertokorean = (input) => {
        if(input === 'Clear'){input = '맑음';}
        else if(input === 'Mist' || input === 'Fog' ){input = '안개'}
        else if(input === 'Snow'){input = '눈'}
        else if(input === 'Rain'){input = '비'}
        else if(input === 'Drizzle'){input = '이슬비'}       
        else if(input === 'Clouds'){input = '구름낌'}
        else if(input === 'Thunderstorm'){input = '천둥번개'}
        return input;
    }

    render(){
        return(
            <a className='weather'>
                {this.weathertokorean(this.state.weather)} {this.temploading(this.state.temp)}
            </a>
        )
    }
}


export default Weather;