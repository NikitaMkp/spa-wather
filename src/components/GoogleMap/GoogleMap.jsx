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

  };

  onMarkerClick = (location) => {
    const { position } = location;

    const { savePosition } = this.props;
    savePosition(position.lat, position.lng);
    fetchWeather(position.lat, position.lng).then(resp => {
      if (!!resp) {
        const { saveWeather } = this.props;
        saveWeather(resp);
      }
    });
  };

  render() {
    const { currentlocation } = this.state;
    return (
      <Map
        className={'google-map'}
        google={this.props.google}
        zoom={8}
        center={{
          lat: currentlocation.lat,
          lng: currentlocation.lon,
        }}
        onClick={this.mapClicked}
      >
        <Marker onClick={this.onMarkerClick}
                name={'Current location'}
                position={{ lat: currentlocation.lat, lng: currentlocation.lon }}
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