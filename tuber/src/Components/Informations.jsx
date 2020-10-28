import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import axios from 'axios';

const AnyReactComponent = ({ text }) => <div>{text}</div>;
class Informations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            something: [],
            data: {},
            status: '',
            boolean: true,
            answer: '',
            requests: []
        }
        this.currentPosition = this.currentPosition.bind(this);
        this.setIntervalFunc = this.setIntervalFunc.bind(this);
        this.handleAvail = this.handleAvail.bind(this);
        this.refresh = this.refresh.bind(this);
        this.confirmLift = this.confirmLift.bind(this)
    }
    confirmLift(){
        const email1 = this.props.email;
        const answer = 'ok';
        axios.post('http://localhost:5000/drivers/request',{answer: answer ,email:email1})
        .then(res=>{console.log(res.data)})
    }
    refresh(){
        const emailPicker = this.props.email
        axios.post('http://localhost:5000/drivers/requests/answer',{email: emailPicker})
        .then(res=>{this.setState({requests: res.data})})
        console.log(this.state)
    }
    async handleAvail(){
        let info = ''
       await this.setState({boolean: !this.state.boolean})
        if(this.state.boolean === true){
             info = 'yes'
        }else{
             info = 'no'
        }
        const email = this.props.email;
        console.log(info,email,this.state)
      await  axios.post('http://localhost:5000/drivers/status',{email: email, info: info})
        .then(res=>{
            if(res.data.affectedRow !== 0){
                this.setState({status: info})}})  
    }
    // map refresh when component mounts
    componentDidMount() {
        this.setIntervalFunc()
        this.setState({answer: this.props.request})
        
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
                 <button onClick={this.handleAvail}>Availability</button>
                 <button onClick={this.refresh}>refresh requests</button>
                 <ul>
                     {this.state.requests.map(req=>{
                         return(
                             <li key={req.id}>
                                 {req.request}
                                 <button onClick={this.confirmLift}>Accept</button>
                             </li>
                         )
                     })}
                 </ul>
                 <div>
                     {this.props.request}
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
                                text="Driver"
                            />
                        }

                    </GoogleMapReact>
                </div>
            </div>
        )
    }
}

export default Informations;