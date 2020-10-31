import React, { Component } from 'react'
import axios from 'axios';
import '../Styles/signIn.css'


class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            visible: true
        }

        this.saveChange = this.saveChange.bind(this);
        this.sendAuto = this.sendAuto.bind(this)
    }


    saveChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    sendAuto(e) {
        e.preventDefault();
        const { email, password } = this.state
        this.props.onUserDone(email)
        axios.post('http://localhost:5000/drivers/signin', { email, password })
            .then(res => {
                if (res.data === 'OK') {
                    this.setState({ visible: false })
                } else {
                    this.setState({ visible: true })
                }
                this.props.onResponse(res.data)
            })
    }

    
    render() {
        const { email, password, visible } = this.state
        return (
            <div className="signin">
                { visible && <div >
                    <h1 className="registration1">Log In</h1>
                    <div className="inputs">
                        <form className="signInForm" onSubmit={this.sendAuto} className="singIn">
                            <input className="inputEmail" type="text" placeholder="Email" name='email' onChange={this.saveChange} />
                            <input className="inputPassword" type="password" placeholder="Password" name='password' onChange={this.saveChange} />
                            <button id="btn" type="submit" className="button">Sign in</button>
                        </form>
                    </div>
                </div>}
            </div>
        )
    }
}
export default SignIn;