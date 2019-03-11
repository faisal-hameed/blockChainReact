import React, { Component } from 'react'

export class ValidState extends Component {
constructor(props) {
  super(props)

  this.state = {
     isValid:this.props.buttonState
  }
}


  render() {
    return      (this.state.isValid)?
    <button className="btn btn-success btn-block">Valid</button>:
     <button className="btn btn-danger btn-block">InValid</button>

    
  }
}

export default ValidState
