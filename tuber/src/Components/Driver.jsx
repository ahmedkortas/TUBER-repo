import React, { Component } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Informations from './Informations';
import App from '../App.js';
import '../Styles/driver.css'
class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            toggle: true,
            visible: true,
            check: ''
        }
        this.changeView = this.changeView.bind(this);
        this.goHome = this.goHome.bind(this);
    }
    changeView() {
        this.setState({ toggle: !this.state.toggle })
    }
    response(r) {
        if (r === 'OK') {
            this.setState({ visible: false })
        } else {
            this.setState({ visible: true })
        }
    }
    responded(u) {
        this.setState({ email: u })
    }
    async logOn(a, u) {
        await this.setState({ toggle: a, email: u })
    }
    goHome(event) {
        event.preventDefault();
        this.setState({ check: 'home' })
    }
    render() {
        const { toggle } = this.state
<<<<<<< HEAD
        if (this.state.check === '') {
            return (
                <div>
                    <div><button onClick={(event) => { this.goHome(event) }}>Home</button> <br></br><br></br></div>
                    <div>
                        {this.state.visible && toggle && <div><SignIn onResponse={(r, u) => { this.response(r, u) }} onUserDone={(u) => { this.responded(u) }} />
                            <h3>Not registred?</h3><h4 onClick={this.changeView}>Register</h4></div>}
                        {this.state.visible && !toggle && <div><SignUp onAccept={(a) => { this.logOn(a) }} />
                            <h3>Already registred?</h3><h4 onClick={this.changeView}>Go back</h4></div>}
                    </div>
                    {!this.state.visible && <div>
                        <Informations email={this.state.email} request={this.props.request} />
                    </div>}
=======
        if(this.state.check === ''){
        return (
            <div className="main">
                <div><h3 className="homeButton" onClick={(event) => { this.goHome(event) }}>Home</h3> <br></br><br></br></div>
                <div className="view">
                    {this.state.visible && toggle && <div className="component"><SignIn onResponse={(r, u) => { this.response(r, u) }} onUserDone={(u) => { this.responded(u) }} />
                        <h3 className="registration">Not registred?</h3><h4 onClick={this.changeView} className="registration">Register</h4></div>}
                    {this.state.visible && !toggle && <div className="component"><SignUp onAccept={(a) => { this.logOn(a) }} />
                        <h3 className="registration">Already registred?</h3><h4 onClick={this.changeView} className="registration">Go back</h4></div>}
>>>>>>> 9d2f00b17cc890b4120fc3af53a4599e2d615cfb
                </div>
            )
        } else if (this.state.check === 'home') {
            return (<App />)
        }
    }
}
export default User;