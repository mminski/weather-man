import React from 'react';
import Day from './Day'
export default class WeatherView extends React.Component{

  constructor(props){
    super(props)
  }

  render() {
    return(
      <div className='column'>
          <h3> Weather in {this.props.client.city} </h3>
          <ul className='row callout'>
              <li>Sunrise: {this.props.weather.astronomy.sunrise}</li>
              <li>Sunset: {this.props.weather.astronomy.sunset}</li>
              <li>Humidity: {this.props.weather.atmosphere.humidity}</li>
              <li>Pressure: {this.props.weather.atmosphere.pressure}</li>
              <li>Rising: {this.props.weather.atmosphere.rising}</li>
              <li>Visibility: {this.props.weather.atmosphere.visibility}</li>
          </ul>
          <table>
              <thead>
                <tr><th>Date</th><th>Day</th><th>High</th><th>Low</th><th>Text</th></tr>
                </thead>
                <tbody>
      {this.props.weather.item.forecast.map(function(e, i){return(
       <Day key={i} forecast={e}></Day>)})}
            </tbody>
        </table>
      </div>
    )
  }
}