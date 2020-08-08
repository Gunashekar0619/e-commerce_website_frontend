import React, { Component } from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class Response extends Component{
  state =  {
       dispaly: this.props.dispaly,
       user : this.props.user
  }
  render() {  
    return(<div>
    <Modal style={{"marginLeft":"25%", "marginTop" : "10%"}} open basic size='small'>
    <Header icon='save' content='Product' />
    <Modal.Content>
    <p>
        {this.state.dispaly}
    </p>
    </Modal.Content>
    <Modal.Actions>
        <Link to={`/${this.state.user}`}><Button color='green' inverted>
            <Icon name='checkmark' /> Okey
        </Button></Link>
    </Modal.Actions>
    </Modal>
    </div>
  )}
}

export default Response
