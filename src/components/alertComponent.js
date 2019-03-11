import React, { Component } from 'react'
import Alert from 'react-bootstrap/Alert'
export class AlertComponent extends Component {
    constructor(props) {
        super(props)
        console.log('alert ', props)
        this.state = {
            message: props.message,
            code: props.code
        }
    }

    render() {

        if (this.state.code === 500) {
            return (
                <Alert dismissible variant="danger">
                    {this.state.message}
                </Alert>)
        }
        else {
            return (
                <div></div>
            )
        }





    }
}

export default AlertComponent
