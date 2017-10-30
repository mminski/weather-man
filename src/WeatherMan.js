import React from 'react';
import ReactDOM from 'react-dom';
import WeatherView from './components/WeatherView'
import Loader from './components/Loader'


export default class WeatherMan extends React.Component{
   constructor(props){
      super(props)
      this.state = {loading: true}
 }
    componentDidMount(){
      this.getClientAddress();
     }
  
	loading(){
		if(this.state.loading){
				return true;
		}else{
				return false;
		}
	}
	render(){
			if(this.loading()){
			return  <Loader/>;
			}
			return(
        <div>
          <div className='callout large primary text-center'><img src={'assets/images/weatherman.png'} /><h3>Welcome to the WeatherMan</h3>
          </div>
          <WeatherView weather={this.state.weather} client={this.state.client}/>
          </div>
      )
		}


getClientAddress() {
  let that = this;
  var request = require("request");
  var options = { method: 'GET',
  url: 'https://freegeoip.net/json/',
  body: 'json' };
  request(options, function(error, response, body) {
    if(error)throw new Error(error);
    var data = JSON.parse(body)
    let city = data["city"]
    let country = data["country_name"]
    that.getClientWOEIP(city, country);
    that.setState({client : data})
  });
};

getClientWOEIP(city, country){
  let that = this;
  var request = require("request");
  var options = { method: 'GET',
  url: `http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20geo.places%20where%20text%3D%22${city}%22%20and%20country%3D%22${country}%22&format=json`,
  body: 'json' };
  request(options, function(error, response, body) {
    if(error)throw new Error(error);
    var data = JSON.parse(body)
    let woeid = data.query.results.place[0].woeid
    that.getClientWeather(woeid)
  });  
}

getClientWeather(woeid){
  let that = this;
  var request = require("request");
  var options = { method: 'GET',
  url: `https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%3D${woeid}&format=json&callback=`,
  body: 'json' };
  request(options, function(error, response, body) {
    if(error)throw new Error(error);
    var data = JSON.parse(body)
    let weather = data.query.results.channel
    that.setState({weather: weather})
    that.setState({loading: false})
  });  
}

}


