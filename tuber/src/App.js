import React, { Component } from 'react';
import User from './Components/User.jsx';
import Driver from './Components/Driver.jsx';
import axios from 'axios'


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      drivers: [],
      view: 'none',
      // overAll: 'none'
    }
  }
  componentDidMount() {
    axios.get('http://localhost:5000/users')
      .then(res => { this.setState({ drivers: res.data }) })
  }
  changeView(option) {
    this.setState({
      view: option,
      overAll: 'Vision'
    })
  }
  render() {
    console.log(this.state)
    if (this.state.view === 'none') {

      return (

        <div>
          <div className="nav">

            <center>   <span onClick={this.changeIt}>Welcome people to Tuber</span></center><br></br>
            <div ><span onClick={() => { this.changeView('User') }}>looking for a ride</span><br></br><br></br>
              <span onClick={() => { this.changeView('Driver') }}>You want to be a driver</span></div>
          </div>
          <div >


            {/* {this.state.overAll === "Vision" ? <div> {this.state.view === 'User'
            ? <User drivers={this.state.drivers} />
            : <Driver />
          }</div> : <div> </div>} */}

          </div>
        </div>
      )
    }
    if (this.state.view === 'User') {
      return (<User drivers={this.state.drivers} />)
    }
    else if (this.state.view === 'Driver') {
      return (<Driver />)

    }
  }
}
export default App;