import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import React, { Component } from 'react';
import { setPosition, setWeather } from '../../actions';
import { connect } from 'react-redux';
import { fetchWeather } from '../../modules/requests';
import './GoogleMap.scss';

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentlocation: { lat: props.location.lat, lon: props.location.lon },
    };
  }

  mapClicked = (mapProps, map, clickEvent) => {
    const { latLng } = clickEvent;
    this.setState({
      currentlocation: {
        lat: latLng.lat(),
        lon: latLng.lng(),
      },
    });
    const { savePosition } = this.props;
    savePosition(latLng.lat(), latLng.lng());
    fetchWeather(latLng.lat(), latLng.lng()).then(resp => {
      if (!!resp) {
        const { saveWeather } = this.props;
        saveWeather(resp);
      }
    });
  };

  render() {
    // const { currentlocation } = this.state;
    const { location } = this.props;
    return (
      <Map
        className={'google-map'}
        google={this.props.google}
        zoom={8}
        initialCenter={{
          lat: location.lat,
          lng: location.lon
        }}
        center={{
          lat: location.lat,
          lng: location.lon,
        }}
        onClick={this.mapClicked}
      >
        <Marker
                name={'Current location'}
                position={{ lat: location.lat, lng: location.lon }}
        />
      </Map>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    savePosition: (lat, lon) => {
      dispatch(setPosition(lat, lon));
    },
    saveWeather: data => {
      dispatch(setWeather(data));
    },
  };
};

function mapStateToProps(state) {
  return {};
}

export default GoogleApiWrapper({ apiKey: 'AIzaSyBFk2_AppcJHy-Q4bHh262U-2yiml6I72s' })(connect(mapStateToProps, mapDispatchToProps)(MapContainer));