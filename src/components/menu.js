import React, { Component } from 'react'
import { Menu, Dropdown, Icon, Container } from 'semantic-ui-react'
import {withCookies} from 'react-cookie'
import { Link } from 'react-router-dom';
// import Customer from './customer'
// import Admin from './admin'
// import Sellerhome from './seller/sellerhome'

class Menubar extends Component {
  constructor(props){
    super(props);
    const userid= this.props.cookies.get('mr_user')
    this.state = { 
      activeItem: this.props.active ,
      formactive:"",
      user : this.props.user,
      page2:this.props.page,
      goods : false,
      userid:userid.user_id,
    }
    this.props.present(this.state.activeItem)
  }
  handleItemClick = (e, { name }) => {this.setState({ activeItem: name }) }

  goodsmenu() {
    switch(this.props.user){
      case "seller":
        return false
      case "customer":
        return true
        default:
          return false
    }
  }
  
  logoutclicked = () => {
    this.props.cookies.remove('mr_user')
    window.location.href = '/login'
    }
    
  
  render() {
    
    
    // const page1 = this.props.page
    // console.log(page1);
    // if (this.state.activeItem === "home"){
    //   // return <Customer active="home"/>
    // }
    const { activeItem } = this.state
    const trigger = (
        <span>
          <Icon name='wrench' /> Settings
        </span>
      )
    return (
      <Container>
        <Menu size="huge" pointing secondary>
          <Link to={`/${this.props.user}`}><Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={this.handleItemClick}
          /></Link>
          {this.goodsmenu()?
            <Dropdown name='droplist1' onClick={this.handleItemClick} text='Goods' pointing className='link item'>
            <Dropdown.Menu >
            <Dropdown.Item disabled>Categories</Dropdown.Item>
            <Dropdown.Item onClick={this.formsel} name = "food">Food</Dropdown.Item>
            <Dropdown.Item onClick={this.formsel} name = "fuel">Fuels</Dropdown.Item> 
            <Dropdown.Item onClick={this.formsel} name = "grocery">Grocery</Dropdown.Item> 
            <Dropdown.Item onClick={this.formsel} name = "others">Others</Dropdown.Item>
            </Dropdown.Menu>
            </Dropdown>
          :""}
          <Menu.Menu position='right'>
          <Dropdown trigger={trigger} pointing className='link item'>
                            <Dropdown.Menu>
                                <Link to={`/profile/${this.state.userid}`}><Dropdown.Item>Profile</Dropdown.Item></Link>
                                <Dropdown.Item onClick = {this.logoutclicked} >Logout</Dropdown.Item>  
                            </Dropdown.Menu>
                        </Dropdown>
          </Menu.Menu>
        </Menu>
      </Container>
    )
  }
}
export default withCookies(Menubar);