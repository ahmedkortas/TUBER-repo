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
            boolean: true
        }
        this.currentPosition = this.currentPosition.bind(this);
        this.setIntervalFunc = this.setIntervalFunc.bind(this);
        this.handleAvail = this.handleAvail.bind(this)
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
        console.log(info,email)
      await  axios.post('http://localhost:5000/drivers/status',{email: email, info: info})
        .then(res=>{this.setState(console.log(res.data))})
        console.log(this.state)
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
                 <button onClick={this.handleAvail}>Availability</button>
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