import React, { Component } from 'react';
import Skycons from 'react-skycons';

export default class Current extends Component {
  render() {
    const { currentTemperature, currentSummary, currentTime, currentIcon, location } = this.props;

    return (
      <div className="container align-self-center" id="weather-results">
        <div className="card">
          <div id="city-day">
            <h3>{location}</h3>
            <h6>{currentTime}</h6>
          </div>
          <div id="current-weather">
            <div id="skycon" className="container center align-items-center">
              <Skycons
                className="center-block text-center"
                color="white"
                icon={currentIcon}
                autoplay={true}
                height="300px"
                width="300px"
              />
            </div>
            <p id="summary">{currentSummary}</p>
            <h1>{currentTemperature}&deg;</h1>
          </div>
        </div>
      </div>
    )
  }
}