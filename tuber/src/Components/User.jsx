import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import App from '../App.js';
import Axios from 'axios';

const AnyReactComponent = ({ text }) => <div style={{background: 'red', display: 'inline-block', borderRadius: '4px'}}>{text}</div>;
const AnyReactComponents = ({ text }) => <div style={{background: 'green', display: 'inline-block', borderRadius: '4px'}}>{text}</div>;
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
            lat: 36.88563,
            long: 10.1840075,
            name: 'Me',
            driverData: [],
            end: false

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
            if(res.data[0].available === 'ok'){
               alert('request accepted')
               Axios.post('http://localhost:5000/drivers/request/response/update',{email: this.state.email})
               .then(console.log('request updated'))
            }
        })
    }
   async sendRequest(e){
    this.setState({email: e})
     console.log(this.state)
      await  Axios.post('http://localhost:5000/drivers/request',{email: e, request: 'pick me up?',lat: this.state.lat, long: this.state.long})
        .then(res=>{
            console.log('request sent')
        })
    }
   async available(e) {
        const {lat,long} = this.state;
        const filtered = this.props.drivers.filter(driver => { return (driver.location.toLowerCase() === e.target.value) });
        this.setState({ currentDrivers: filtered ,lat: 36.88563, long:10.1840075, name: '', end: !this.state.end})
        console.log(filtered)
        const latt = [];
        const longg = [];
        let arr = []
        for(let i =0; i<filtered.length; i++){
            // latt.push(filtered[i].latt)
            // long.push(filtered[i].longi)
            arr = arr.concat({name:filtered[i].firstName,lat:filtered[i].latt,long:filtered[i].longi})
            arr.unshift({name:'Me', lat: lat,long: long})
        }
       await this.setState({driverData: arr})
        
            this.boucle(arr,0)
        console.log(this.state.driverData)
    }
    boucle(arr,i=0){
               this.setState({lat: arr[i].lat, long:arr[i].long , name: arr[i].name})
             setTimeout(() => {
                    i = i +1
                    if(i < arr.length){ 
                        this.boucle(arr,i)
                    }
                     if(i === (arr.length )){
                         i =1
                         this.boucle(arr,i)
                     } if(this.state.end === false){
                         return
                     }
             }, 3000);

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
            lng:  10.1711872
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
                                            <button onClick={()=>{this.sendRequest(driver.email)}}>Request A Tuber</button>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                    <button onClick={this.checkRes}>Check Response</button>
                    <div style={{ height: '50vh', width: '50%' }}>
                        <GoogleMapReact
                            // bootstrapURLKeys={{ key: /* YOUR KEY HERE */ }}
                            defaultCenter={this.props.center}
                            defaultZoom={this.props.zoom}
                        >
                            {
                                this.state.data && <AnyReactComponent
                                    lat={this.state.lat}
                                    lng={this.state.long}
                                    text={this.state.name}
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