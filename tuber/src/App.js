import React, { Component } from 'react';
import User from './Components/User.jsx';
import Driver from './Components/Driver.jsx';
import axios from 'axios'


class App extends Component{
    constructor(props){
      super(props)
      this.state={
        drivers: [],
        view: 'none',
        overAll: 'none'
      }
    }
  componentDidMount(){
     axios.get('http://localhost:5000/users')
     .then(res=>{ this.setState({drivers: res.data})})
  }
  changeView(option){
  this.setState({
  view: option,
  overAll: 'Vision'
  })
}
  render(){
    console.log(this.state)
    return(
      <div> 
        <div className="nav">
        <span  onClick={this.changeIt}>Tuber</span>
        <div ><span onClick={()=>{this.changeView('User')}}>User</span>
        <span  onClick={()=>{this.changeView('Driver')}}>Driver</span></div>
        </div>
        <div >{this.state.overAll === "Vision" ? <div> {this.state.view === 'User'
        ? <User drivers={this.state.drivers} />
        : <Driver  />
        }</div>  : <div> </div>}
      </div>
      </div>
    )
  }
}
export default App;
