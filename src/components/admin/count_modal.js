import React, { Component } from 'react'
import { Modal, Button } from 'semantic-ui-react'

export default class count_modal extends Component {
    state={
        header:this.props.header,
        status:this.props.status
    }
    
    close=()=>{
        window.location.reload();
    }
    render() {
        
        return (
        <div>
        
        </div>
    )
}
}