import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import './Cities.scss'


const Cities = ({ cities, history }) => {
  const isCities = !!cities?.length

  return (
    <div className={'citiesMain'}>
      {isCities &&
      <div className={'content'} >
        <h1>Saved cities</h1>
        <div className={'boxes'}>
          {cities.map((city, index) => {
            return (
              <div
                className={'citiesBox'}
                key={`${city.name}_${index}`}
                onClick={() => {
                  history.push(`cities/${city.name}`)
                }}
              >
                <div style={{ textAlign: 'center' }}>
                  <p className={'degrees'}>{`${Math.round(city.temperature)} °C`}</p>
                  <p className={'locationTxt'}>{`${city.name}, ${city.country}`}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      }
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {}
}

function mapStateToProps(state) {
  return {
    cities: state.weather.cities,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cities)