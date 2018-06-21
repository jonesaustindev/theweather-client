import React, { Component } from 'react';
import Geosuggest from 'react-geosuggest';
import Current from '../components/Current';

export default class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      location: "Birmingham, AL, USA",
      lat: 33.5207,
      lon: -86.8025
    };
    this.onSuggestSelect = this.onSuggestSelect.bind(this);
  }

  componentDidMount() {
    this.callWeatherApi();
  }

  callWeatherApi = async () => {
    let response = await fetch(`/api/search?latitude=${this.state.lat}&longitude=${this.state.lon}`);
    let body = await response.json();

    if (body.cod === 404) {
      throw Error(body.message);
    } else {
      this.setState({
        loading: false,
        // current //
        currentTemperature: Math.round(body.currentTemperature),
        currentSummary: body.currentSummary,
        currentTime: body.currentTime,
        currentIcon: body.currentIcon,
        currentPrecipType: body.currentPrecipType
      });
      return body;
    }
  }

  onSuggestSelect(input) {
    if (input) {
      let location = input.description;
      let lat = input.location.lat;
      let lon = input.location.lng;
      this.setState({
        location: location,
        lat: lat,
        lon: lon
      });
      this.callWeatherApi();
    }
  }

  render() {
    const { currentTemperature, currentSummary, currentTime, currentIcon, currentPrecipType, location } = this.state;

    return (
      <div>
        {
          this.state.loading ?

            <div className="loading"><p>Loading...</p></div> :

            <div>
              <Geosuggest
                id="search-bar"
                placeholder="Enter a location"
                onSuggestSelect={this.onSuggestSelect}
                onSelect={this.callGeoSuggest}
              />
              <Current
                location={location}
                currentTemperature={currentTemperature}
                currentSummary={currentSummary}
                currentTime={currentTime}
                currentIcon={currentIcon}
                currentPrecipType={currentPrecipType}
              />
            </div>
        }
      </div>
    )
  }
}
