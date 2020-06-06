import React, { Component } from 'react'
import { Menu, Dropdown, Icon } from 'semantic-ui-react'
import {withCookies} from 'react-cookie'

class Menubar extends Component {
  state = { activeItem: this.props.active }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  logoutclicked = () => {
    this.props.cookies.remove('mr_user')
    window.location.href = '/login'
    }       
  render() {
    const { activeItem } = this.state
    const trigger = (
        <span>
          <Icon name='wrench' /> Settings
        </span>
      )
    return (
      <div>
        <Menu pointing secondary>
          <Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={this.handleItemClick}
          />
            <Dropdown  name='droplist1' onClick={this.handleItemClick} text='Goods' pointing className='link item'>
            <Dropdown.Menu >
            <Dropdown.Item disabled>Categories</Dropdown.Item>
            <Dropdown.Item onClick={this.formsel} name = "food">Food</Dropdown.Item>
            <Dropdown.Item onClick={this.formsel} name = "fuel">Fuels</Dropdown.Item> 
            <Dropdown.Item onClick={this.formsel} name = "grocery">Grocery</Dropdown.Item> 
            <Dropdown.Item onClick={this.formsel} name = "others">Others</Dropdown.Item>
            </Dropdown.Menu>
            </Dropdown>

          
          <Menu.Menu position='right'>
          <Dropdown trigger={trigger} pointing className='link item'>
                            <Dropdown.Menu>
                                <Dropdown.Item>Profile</Dropdown.Item>
                                <Dropdown.Item onClick = {this.logoutclicked} >Logout</Dropdown.Item>  
                            </Dropdown.Menu>
                        </Dropdown>
          </Menu.Menu>
        </Menu>

        
      </div>
    )
  }
}
export default withCookies(Menubar);