import React, { Component } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Informations from './Informations';
class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            toggle: true,
            visible: true
        }
        this.changeView = this.changeView.bind(this);
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
        console.log(this.state)
    }
    render() {
        const { toggle } = this.state
        return (
            <div>
                <div>
                    {this.state.visible && toggle && <div><SignIn onResponse={(r, u) => { this.response(r, u) }} onUserDone={(u) => { this.responded(u) }} />
                        <h3>Not registred?</h3><h4 onClick={this.changeView}>Register</h4></div>}
                    {this.state.visible && !toggle && <div><SignUp onAccept={(a) => { this.logOn(a) }} />
                        <h3>Already registred?</h3><h4 onClick={this.changeView}>Go back</h4></div>}
                </div>
                {!this.state.visible && <div>
                    <Informations email={this.state.email}/>
                </div>}
            </div>
        )
    }
}
export default User;