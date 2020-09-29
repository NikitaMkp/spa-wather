import React from 'react'
import {Spin, Button} from 'antd';
import {LoadingOutlined} from '@ant-design/icons';
import {connect} from 'react-redux'
import './CurrentWeather.scss'
import { setWeather, setCity, setPosition } from '../../actions';
import {fetchWeather} from "../../modules/requests";


const CurrentWeather = ({showDescriptionWeather = true, weather, ...props}) => {
  const [loaded, setLoaded] = React.useState(false)

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition(getWeather)
  }, [])

  const getWeather = (position) => {
    const { savePosition } = props;
    savePosition(position.coords.latitude, position.coords.longitude);
    fetchWeather(position.coords.latitude, position.coords.longitude).then(resp => {
      if (!!resp) {
        const {saveWeather} = props
        saveWeather(resp)
        setLoaded(true)
      }
    })
  }

  const antIcon = <LoadingOutlined style={{fontSize: 48, color: "#939698"}} spin/>;

  const saveSelectedCity = () => {
    const {saveCity} = props
    const cityData = {
      name: weather.weather.name,
      country: weather.weather.sys.country,
      temperature: Math.round(weather.weather.main.temp),
    }
    saveCity(cityData)
  }

  return (
    <div className={'currentWeatherMain'}>
      {(loaded && !!weather) ?
        <div className={'weatherBox'}>
          <p className={'degrees'}>{`${Math.round(weather.weather.main.temp)} °C`}</p>
          <p className={'locationTxt'}>{`${weather.weather.name}, ${weather.weather.sys.country}`}</p>
          {showDescriptionWeather &&
          <p className={'descriptionTxt'}>
            {`${weather.weather.weather[0].main}, Wind - ${weather.weather.wind.speed} meter per second`}
          </p>
          }
          <div className={'addBtn'}>
            <Button shape="circle" size={"large"} onClick={saveSelectedCity}>
              +
            </Button>
          </div>
        </div> :
        <div className={'weatherBox'}>
          <Spin indicator={antIcon}/>
          <p className={'locationTxt'}>loading...</p>
        </div>
      }
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    saveWeather: data => {
      dispatch(setWeather(data))
    },
    saveCity: data => {
      dispatch(setCity(data))
    },
    savePosition: (lat, lon) => {
      dispatch(setPosition(lat, lon))
    }
  }
}

function mapStateToProps(state) {
  return {
    weather: state.weather,
    state: state
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentWeather)