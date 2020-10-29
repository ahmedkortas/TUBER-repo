import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import axios from 'axios';


const AnyReactComponent = ({ text }) => <div style={{background: 'green', display: 'inline-block', borderRadius: '4px'}}>{text}</div>;
class Informations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            something: [],
            data: {},
            status: '',
            boolean: true,
            answer: '',
            requests: [],
            lat: 36.88563,
            long: 10.1840075,
            display: {name: '', long: 10.1840075, lat: 36.88563}
        }
        this.currentPosition = this.currentPosition.bind(this);
        this.setIntervalFunc = this.setIntervalFunc.bind(this);
        this.handleAvail = this.handleAvail.bind(this);
        this.refresh = this.refresh.bind(this);
        this.confirmLift = this.confirmLift.bind(this);
        this.boucle = this.boucle.bind(this);
    }
    confirmLift() {
        const email1 = this.props.email;
        const answer = 'ok';
        axios.post('http://localhost:5000/drivers/request', { answer: answer, email: email1 })
    }
    boucle(i=0){
      setTimeout(() => {
             if(i === 0){ 
                this.setState({display : {name: 'Me', long: this.state.data.longitude, lat: this.state.data.latitude}});
                 this.boucle(1)
             }
              if(i === 1){
                this.setState({display :{name: 'Client', long: this.state.requests[this.state.requests.length -1].y, lat: this.state.requests[this.state.requests.length -1].x}})
                  this.boucle(0)
              }
      }, 5000);

}
    refresh() {
        const emailPicker = this.props.email
        axios.post('http://localhost:5000/drivers/requests/answer', { email: emailPicker })
            .then(res => { this.setState({ requests: res.data }) })
            console.log(this.state.requests)

            this.boucle(0)
            console.log(this.state.requests)
    }
    async handleAvail() {
        let info = ''
        await this.setState({ boolean: !this.state.boolean })
        if (this.state.boolean === true) {
            info = 'yes'
        } else {
            info = 'no'
        }
        const email = this.props.email;
        console.log(info, email, this.state)
        axios.post('http://localhost:5000/drivers/updatePosition',{email: email, lat: this.state.lat, long: this.state.long})
        .then(console.log('position updated'))
        await axios.post('http://localhost:5000/drivers/status', { email: email, info: info})
            .then(res => {
                if (res.data.affectedRow !== 0) {
                    this.setState({ status: info })
                }
            })
            this.setState({display : {name: 'Me', long: this.state.long, lat: this.state.lat}})
    }
    // map refresh when component mounts
    componentDidMount() {
        this.setIntervalFunc()
        this.setState({ answer: this.props.request })
    }
    setIntervalFunc() {
        setInterval(this.currentPosition, 3500)
    }

    currentPosition() {
        navigator.geolocation.getCurrentPosition(data => { this.setState({ data: data.coords, lat: data.coords.latitude, long: data.coords.longitude  }) })
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
        const {requests} = this.state
        return (
            <div>
                <button onClick={this.handleAvail}>Available</button>
                <button onClick={this.refresh}>refresh requests</button>
                <ul>
                    {this.state.requests.map(req => {
                        return (
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
                            this.state.display && <AnyReactComponent
                                lat={this.state.display.lat}
                                lng={this.state.display.long}
                                text={this.state.display.name}
                            />

                        }
                    </GoogleMapReact>
                </div>
            </div>
        )
    }
}

export default Informations;