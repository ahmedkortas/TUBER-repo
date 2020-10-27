import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;
class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDrivers: [],
            data: {},

        }
        this.available = this.available.bind(this);
        this.currentPosition = this.currentPosition.bind(this);
        this.setIntervalFunc = this.setIntervalFunc.bind(this);
    }
    available(e) {
        const filtered = this.props.drivers.filter(driver => { return (driver.location.toLowerCase() === e.target.value) });
        this.setState({ currentDrivers: filtered })
        console.log(filtered)
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
    // LONG AND ALT 
    static defaultProps = {
        center: {
            lat: 36.94592,
            lng: 10.1711872
        },
        zoom: 11
    };
    render() {
        return (
            <div>
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
                                text="My Marker"
                            />
                        }

                    </GoogleMapReact>
                </div>
            </div>
        )
    }
}
// export default GoogleApiWrapper({
//     apiKey: ("AIzaSyA0ldEuZXZKJuPmYI5b0YsWnueNgL7t0OE")
//   })(User)
export default User;