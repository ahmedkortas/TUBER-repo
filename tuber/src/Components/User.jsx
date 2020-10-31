import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import App from '../App.js';
import Axios from 'axios';
import '../Styles/user.css'


const AnyReactComponent = ({ text }) => <div><img src="https://jillyscarwash.com/wp-content/uploads/2018/09/jillys-marker-map-pin-300x300.png" alt="logo" width='30px' height='30px'/>{text}</div>;
class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDrivers: [],
            chairs: 1,
            data: {},
            check: '',
            answer: '',
            email: '',
            lat: null,
            long: null,
            name: 'Me',
            driverData: [],
            end: false,
            dr:{lat: null, long: null,name: ''}

        }

        this.available = this.available.bind(this);
        this.currentPosition = this.currentPosition.bind(this);
        this.setIntervalFunc = this.setIntervalFunc.bind(this);
        this.availableChairs = this.availableChairs.bind(this);
        this.goHome = this.goHome.bind(this);
        this.checkRes = this.checkRes.bind(this);
        this.boucle = this.boucle.bind(this)
    }


    checkRes(){
        Axios.post('http://localhost:5000/drivers/request/response',{email: this.state.email})
        .then(res=>{
            console.log(res.data)
            if(res.data.length >0 && res.data[0].available === 'ok'){
                //alert with the driver email
               alert(`request accepted a tuber driver will be on the way hold on You can contact him on this email ${this.state.email}`)
               Axios.post('http://localhost:5000/drivers/request/response/update',{email: this.state.email})
               .then(console.log('request updated'))
            }else if (res.data.length === 0){ 
                console.log('No Reponse')
            }
        })
    }


    async sendRequest(e) {
        this.setState({ email: e })
        console.log(this.state)
        alert('your request has been sent successfully wait for your driver response it should not take long  ')
        await Axios.post('http://localhost:5000/drivers/request', { email: e, request: 'pick me up ?', lat: this.state.lat, long: this.state.long })
            .then(res => {
                console.log('request sent')
            })
            
    }


    available(e) {
        const {lat,long} = this.state;
        const filtered = this.props.drivers.filter(driver => { return (driver.location.toLowerCase() === e.target.value) });
        this.setState({ currentDrivers: filtered , name: '', end: !this.state.end,dr: { lat: null, long: null , name: ''}})
        console.log(filtered)
        let arr = []
        for(let i =0; i<filtered.length; i++){
            arr = arr.concat({name:filtered[i].firstName,lat:filtered[i].latt,long:filtered[i].longi})
            console.log(arr)
        }
        this.setState({driverData: arr})
        
            this.boucle(arr,0)
    }

    
    boucle(arr,i=0){

             setTimeout(()=>{
                 if(i ===0){
                    this.setState({dr: { lat: arr[i].lat, long:arr[i].long , name: arr[i].name}})
                    this.boucle(arr,i+1)
                 }
                     if(i < arr.length){ 
                        this.setState({dr: { lat: arr[i].lat, long:arr[i].long , name: arr[i].name}})
                        this.boucle(arr,i+1)
                    }
                     if(i === arr.length ){
                        this.setState({dr: { lat: this.state.lat, long: this.state.long , name: 'Me'}})
                        console.log(this.state)
                         this.boucle(arr,i=0)
             }}, 2000);
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
        navigator.geolocation.getCurrentPosition(data => { this.setState({ data: data.coords, lat: data.coords.latitude, long: data.coords.longitude }) })
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

                <div className='main'>
                    <h3 className="homeButton" onClick={(event) => { this.goHome(event) }}>Home</h3> <br></br><br></br>

                    <div>
                        <h3 className="PassengerN">Select Number Of Pasangers: </h3>
                        <select className="select" onChange={this.availableChairs}>
                            <option ></option>
                            <option >1</option>
                            <option >2</option>
                            <option >3</option>
                            <option >4</option>
                        </select>
                    </div>
                    <div>
                        <h3 className="PassengerN">Select Area: </h3>
                        <select className="select" onChange={this.available}>
                            <option  ></option>
                            <option >ariana</option>
                            <option >tunis</option>
                            <option >gammarth</option>
                            <option >sokra</option>
                        </select>
                    </div>
                    <div>
                        <ul className="list">
                            {this.state.currentDrivers.map(driver => {
                                return (
                                    <center>
                                        <li className="list">
                                            <div>firstName: &nbsp;
                                            {driver.firstName}
                                            </div>
                                            <div>lastName: &nbsp;
                                            {driver.lastName}
                                            </div>
                                            <div>yearOfBirth: &nbsp;
                                            {driver.yearOfBirth}
                                            </div>
                                            <div>car brand: &nbsp;
                                            {driver.car}
                                            </div>
                                            <div>km/dt: &nbsp;
                                            {driver.km}
                                            </div>
                                            <div>gender: &nbsp;
                                            {driver.gender}
                                            </div>
                                            <div>rate: &nbsp;
                                            {driver.rate}
                                            </div> <br></br>
                                            <div>
                                                <button onClick={() => { this.sendRequest(driver.email) }}>Request A Tuber</button>
                                            </div>
                                            <hr className="line"></hr>
                                        </li>
                                    </center>
                                )
                            })}
                        </ul>
                    </div>
                    <button className="response" onClick={this.checkRes}>Check Response</button>
                    <div className="map">
                        <GoogleMapReact
                            // bootstrapURLKeys={{ key: /* YOUR KEY HERE */ }}
                            defaultCenter={this.props.center}
                            defaultZoom={this.props.zoom}
                        >
                            {
                                this.state.data && <AnyReactComponent
                                    lat={this.state.dr.lat}
                                    lng={this.state.dr.long}
                                    text={this.state.dr.name}
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