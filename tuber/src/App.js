import React, { Component } from 'react'
import Customer from './Customer.js'
import Driver from './Driver.js'
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      check:''
    }
    this.goCustomer=this.goCustomer.bind(this);
    this.goDriver=this.goDriver.bind(this);
  }
goCustomer(event){
  event.preventDefault();
  this.setState({check:'customer'})
}
goDriver (event){
  event.preventDefault();
  this.setState({check : 'driver'})
}
  render() {
    if(this.state.check === ''){
    return (
      <div>
       <center> <h1>Welcome people to Tuber</h1></center>
      <center><div>
       <button onClick={(event)=>{this.goCustomer(event)}}>looking for a ride</button>
       <button onClick={(event)=>{this.goDriver(event)}}>You want to be a driver</button>
       </div></center> 
      </div>
    )
  }
  else if (this.state.check === 'customer'){
return(
 
<Customer />

)
  }
  else if(this.state.check === 'driver'){
    return(
      <Driver />
    )
  }

  
  }
}

