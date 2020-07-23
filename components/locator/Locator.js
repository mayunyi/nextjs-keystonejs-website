import React from 'react';
import { Info, Map } from 'react-store-locator';
import mapStyle from '../locator/mapStyles.json';
import locations from '../locator/locations.json';

const myPin = (props) => (
  <div
    style={{
      
    }}
    onClick={() => props.handleLocationClick(props.id)}
  >
    {props.children}
  </div>
)

const infoStyle = {
  width: '175px',
  height: '130px',
  backgroundColor: 'transparent',
  color: '#000'
}

export default class Locator extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
      locations: locations,
      error: null,
      loading: false
    };
  }
  render(){
    const mapProps = {
      height: '720px',
      width: '100%',
      zoom: 14,
			mapOptions: {
				styles: mapStyle,
				gestureHandling: `cooperative`
			},
			onChange: this.getLocations,
      locations: this.state.locations,
      pin: myPin,
      infoStyle: infoStyle,
			mapLoaded: () => {
				this.setState({ mapLoaded: true })
			},
			googleApiKey: `xxxxxx`,
      }
      
    return(
			<div className="map-container">
        <Map {...mapProps}>
          {(location, closeLocation) => {
            return (
              <Info show={location.show}>
                <div style={infoStyle} className="map-info-box">
                  <h4>{location.name}</h4>
                  <p>{location.address}</p>
                  <p>{location.zipAndCity}</p>
                  <p>{location.country}</p>
                  <p>{location.phone}</p>
                </div>
              </Info>
            )
          }}
        </Map>
        <div className="arch"></div>
			</div>
    )
  }
}