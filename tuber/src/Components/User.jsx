import React, {Component } from 'react';

class User extends Component{
    constructor(props){
        super(props);
        this.state={
            currentDrivers: []
        }
      this.available = this.available.bind(this);
    }
    available(e){
        const filtered = this.props.drivers.filter(driver=>{return(driver.location === e.target.value)});
        this.setState({currentDrivers: filtered})
        console.log(filtered)
    }
render(){
    return(
        <div>
            <div>
            <h3>Select Area: </h3>
                <select  onChange={this.available}>
                  <option  ></option>
                      <option >ariana</option>
                      <option >tunis</option>
                      <option >gammarth</option>
                      <option >sokra</option>
                </select>
            </div>
            <div>
                <ul>
                    {this.state.currentDrivers.map(driver=>{return(
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
                    )})}
                </ul>
            </div>
        </div>
    )
}}
export default User;