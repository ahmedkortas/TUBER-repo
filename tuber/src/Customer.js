import React, { Component } from 'react'
import App from './App.js'
import UserReservation from './UserReservation.js'

export default class Customer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 'Tunis Center',
            price: 'Casual Class',
            pax: 'One',
            check: ''
        };
        this.goHome = this.goHome.bind(this)
        this.handleAreaChange = this.handleAreaChange.bind(this)
        this.handlePaxChange = this.handlePaxChange.bind(this)
        this.handlePriceChange = this.handlePriceChange.bind(this)
        this.currentPosition = this.currentPosition.bind(this)
    }

    currentPosition() {
        navigator.geolocation.getCurrentPosition(data => { console.log(data) })
    }

    goReservation(event) {
        event.preventDefault();
        this.setState({ check: 'reservation' })
    }
    goHome(event) {
        event.preventDefault();
        this.setState({ check: 'home' })
    }

    handleAreaChange(event) {

        this.setState({ value: event.target.value });
    }
    handlePaxChange(event) {
        this.setState({ pax: event.target.value });
    }
    handlePriceChange(event) {
        this.setState({ price: event.target.value });
    }

    handleSubmit(event) {
        alert(("New Reservation " + this.state.pax + ' Person(s), Destination is ' + this.state.value + ' Class preference is ' + this.state.price));
        console.log("New Reservation " + this.state.pax + ' Person(s), Destination is ' + this.state.value + ' Class preference is ' + this.state.price);
        this.currentPosition()
        event.preventDefault();

    }

    render() {
        if (this.state.check === '') {
            return (

                <div>
                    <button onClick={(event) => { this.goHome(event) }}>Home</button> <br></br><br></br>
                    <div>
                        <span>Number of Person</span> &nbsp; &nbsp;
                        <select pax={this.state.pax} onChange={this.handlePaxChange}>
                            <option defaultValue="One">1</option>
                            <option value="Two">2</option>
                            <option value="Three">3</option>
                            <option value="Four">4</option>
                        </select>

                    </div> <br></br>
                    <div>
                        <span>Choose Your Area</span> &nbsp; &nbsp;
                        <select value={this.state.value} onChange={this.handleAreaChange}>
                            <option defaultValue="Tunis Center">Tunis Center</option>
                            <option value="North Banlieu">Marsa</option>
                            <option value="Ariana">Ariana</option>
                            <option value="Bardo">Bardo</option>
                        </select>

                    </div> <br></br>

                    <div className="navbar">

                        <span> Choose Your Price</span> &nbsp; &nbsp;
                        <select price={this.state.price} onChange={this.handlePriceChange}>
                            <option defaultValue="Casual Class"> Casual Beetween 5 and 12</option>
                            <option value="Confort Class"> Confort Beetween 13 and 19</option>
                            <option value="Business Class">Business Beetween 20 and 35</option>
                            <option value="Luxury Class">Luxury more than 40</option>
                        </select>
                    </div> <br></br>
                    <button onClick={(event) => { this.handleSubmit(event); this.goReservation(event) }}>Submit</button>
                </div >
            )
        }
        else if (this.state.check === 'home') {
            return (
                <App />
            )
        }
        else if (this.state.check === 'reservation') {
            return (
                <UserReservation />
            )
        }
    }
}
