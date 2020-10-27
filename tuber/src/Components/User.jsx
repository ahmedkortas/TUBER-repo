import React, {Component } from 'react';
// import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-map-react';

class User extends Component{
    constructor(props){
        super(props);
        this.state={
            currentDrivers: []
        }
      this.available = this.available.bind(this);
    }
    available(e){
        const filtered = this.props.drivers.filter(driver=>{return(driver.location.toLowerCase() === e.target.value)});
        this.setState({currentDrivers: filtered})
        console.log(filtered)
    }
render(){
    return(
        <div>
            <div>
            <h3>Select Area: </h3>
                <select  onChange={this.available}>
                  <option  ></option>
                      <option >ariana</option>
                      <option >tunis</option>
                      <option >gammarth</option>
                      <option >sokra</option>
                      <option >wed lil</option>
                </select>
            </div>
            <div>
                <ul>
                    {this.state.currentDrivers.map(driver=>{return(
                        <li>
                            <div>firstName: <br />
                            {driver.firstName}
                            </div> 
                            <div>lastName:  <br />
                            {driver.lastName}
                            </div>
                            <div>yearOfBirth:<br />
                            {driver.yearOfBirth}
                            </div>
                            <div>car brand: <br />
                            {driver.car}
                            </div>
                            <div>km/dt: <br />
                            {driver.km}
                            </div>
                            <div>gender: <br />
                            {driver.gender}
                            </div>
                            <div>rate: <br />
                            {driver.rate}
                            </div>
                        </li>
                    )})}
                </ul>
            </div>
            {/* <div style={{ height: '40vh', width: '50vw' }}>
            <Map google={this.props.google} initialCenter={{lat: 40.854885,lng: -88.081807}} zoom={14}>
 
            <Marker onClick={this.onMarkerClick}
            name={'Current location'} />

            <InfoWindow onClose={this.onInfoWindowClose}>
            </InfoWindow>
            </Map>
            </div> */}
        </div>
    )
}}
// export default GoogleApiWrapper({
//     apiKey: ("AIzaSyA0ldEuZXZKJuPmYI5b0YsWnueNgL7t0OE")
//   })(User)
export default User;