import React from 'react';

export default class Day extends React.Component{

  constructor(props){
    super(props)
  }

  render() {
    return(
      <tr>
        <td>{this.props.forecast.date}</td>
        <td>{this.props.forecast.day}</td>
        <td>{this.props.forecast.high}</td>
        <td>{this.props.forecast.low}</td>
        <td>{this.props.forecast.text}</td>
        </tr>
    )
  }
}