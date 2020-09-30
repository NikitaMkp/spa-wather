import React from 'react'
import {Spin, Button} from 'antd';
import {LoadingOutlined} from '@ant-design/icons';
import {connect} from 'react-redux'
import './CurrentWeather.scss'
import { setCity } from '../../actions';


const CurrentWeather = ({showDescriptionWeather = true, weather, ...props}) => {

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
      {!!Object.keys(weather).length?
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
    saveCity: data => {
      dispatch(setCity(data))
    },
  }
}

function mapStateToProps(state) {
  return {
    weather: state.weather,
    state: state
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentWeather)