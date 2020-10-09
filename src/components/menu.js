import React, { Component } from 'react'
import { Menu, Dropdown, Icon, Container ,Segment} from 'semantic-ui-react'
import {withCookies} from 'react-cookie'
import { Link } from 'react-router-dom';
import Transaction from './order/transaction';

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
      transactions : [],
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
    closeHistory = () => {
      this.setState({history :false})
  }
    
    history = () => {
      fetch('http://127.0.0.1:8000/api/ordered/getdata/',{
          method: 'GET',
          headers: {
              // 'Authorization' : `Token ${this.state.currnt_user.to1ken}`
          }
        })
        .then(resp => resp.json())
        .then(res =>{ this.setState({goods:res.data})
                      console.log(res);
                      res.data.map(h => {
                          if (this.state.currnt_user.user_id === h.user.user_id) {
                               this.state.transactions.push(h)
                          }
                      })
                      this.setState({history:true})
                  })  
          .catch(res=>{
              console.log(res);
          })      
          this.setState({history:true})
          console.log(this.state.transactions)
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
      <React.Fragment  >
      <div style = {{backgroundColor :"black", width:"100%",zIndex:1 }}>
      <Segment inverted>
      <Container>
        <Menu  size = "large" inverted pointing secondary>
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
            {this.props.user === "admin" ? "" :
            this.goodsmenu()?
            <Menu.Item onClick={() => this.history()}>History</Menu.Item> :""}
          <Dropdown trigger={trigger} style={{"color":"white"}} pointing className='link item'>
              <Dropdown.Menu>
                  <Link to={{pathname:`/profile/${this.state.userid}`}}><Dropdown.Item selected > Profile <Icon style={{ position:"absolute",right:"2px" }} name="caret right"></Icon></Dropdown.Item></Link>
                  <Dropdown.Item onClick = {this.logoutclicked} >Logout</Dropdown.Item>  
              </Dropdown.Menu>
          </Dropdown>
          </Menu.Menu>
        </Menu>
      </Container>
      </Segment>
      </div>
      {this.state.history ? 
            <Transaction history = {this.state.history} closeHistory = {this.closeHistory} transactions = {this.state.transactions} /> : "" }
      </React.Fragment>
    )
  }
}
export default withCookies(Menubar);