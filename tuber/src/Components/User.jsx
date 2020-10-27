import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import App from '../App.js';
import Axios from 'axios';

const AnyReactComponent = ({ text }) => <div>{text}</div>;
class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDrivers: [],
            chairs: 1,
            data: {},
            check: ''

        }
        this.available = this.available.bind(this);
        this.currentPosition = this.currentPosition.bind(this);
        this.setIntervalFunc = this.setIntervalFunc.bind(this);
        this.availableChairs = this.availableChairs.bind(this);
        this.goHome = this.goHome.bind(this);
    }
   async sendRequest(e){
      await  Axios.post('http://localhost:5000/drivers/request',{name: e, request: 'pick me up?'})
        .then(res=>{
            console.log(res)
        })
    }
    available(e) {
        const filtered = this.props.drivers.filter(driver => { return (driver.location.toLowerCase() === e.target.value) });
        this.setState({ currentDrivers: filtered })
        console.log(filtered)
        console.log(this.state)
    }
    availableChairs(e) {
        this.setState({ chairs: e.target.value })
    }
    // map refresh when component mounts
    componentDidMount() {
        this.setIntervalFunc()
    }

    setIntervalFunc() {
        setInterval(this.currentPosition, 3500)
    }

    currentPosition() {
        navigator.geolocation.getCurrentPosition(data => { this.setState({ data: data.coords }) })
    }

    goHome(event) {
        event.preventDefault();
        this.setState({ check: 'home' })
    }
    // LONG AND ALT 
    static defaultProps = {
        center: {
            lat: 36.94592,
            lng: 10.1711872
        },
        zoom: 11
    };
    render() {
        if (this.state.check === 'home') {
            return (
                <App />
            )
        }
        else if (this.state.check === '') {
            return (
                <div>
                    <button onClick={(event) => { this.goHome(event) }}>Home</button> <br></br><br></br>
                    <div>
                        <h3>Select Number Of Pasangers: </h3>
                        <select onChange={this.availableChairs}>
                            <option ></option>
                            <option >1</option>
                            <option >2</option>
                            <option >3</option>
                            <option >4</option>
                        </select>
                    </div>
                    <div>
                        <h3>Select Area: </h3>
                        <select onChange={this.available}>
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
                            {this.state.currentDrivers.map(driver => {
                                return (
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
                                        <div>
                                            <button onClick={()=>{this.sendRequest(driver.firstName)}}>Request A Tuber</button>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                    <div style={{ height: '50vh', width: '50%' }}>
                        <GoogleMapReact
                            // bootstrapURLKeys={{ key: /* YOUR KEY HERE */ }}
                            defaultCenter={this.props.center}
                            defaultZoom={this.props.zoom}
                        >
                            {
                                this.state.data && <AnyReactComponent
                                    lat={this.state.data.latitude}
                                    lng={this.state.data.longitude}
                                    text="Client"
                                />
                            }

                        </GoogleMapReact>
                    </div>
                </div>
            )
        }

    }
}

export default User;