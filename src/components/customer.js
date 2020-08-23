import React, { Component } from 'react'
import { Menu ,Responsive,Dropdown, Icon,Divider,Segment,Container } from 'semantic-ui-react'
import { withCookies } from 'react-cookie';
import Food from './Food';
import Others from './others';
import Fuels from './Fuels';
import Grocery from './grocery';
import Home from './home';
import Itemdisplay from './itemdisplay'
import Transaction from './order/transaction';
// import { wait } from '@testing-library/react';

class admin extends Component {
    constructor (props){
        super(props);
        const token = this.props.cookies.get('mr_user')
        this.state = { 
            goods:[],
            food1:[],
            fuel1:[],
            veggies1:[],
            other1:[],
            history:false,
            activeform : "home",
            transactions : [],
            menuactiveItem: 'home',
            currnt_user:{
              to1ken : token.token,
              user_id : token.user_id,
              username : token.username}
          };  
    }
    
    componentDidMount() { 
        fetch('http://127.0.0.1:8000/api/Goods/',{
            method: 'GET',
            headers: {
                'Authorization' : `Token ${this.state.currnt_user.to1ken}`
            }
          }).then(resp => resp.json())
          .then(res =>{ this.setState({goods:res})
                        this.findfood() 
                    
                     })
    }

    //handleItemClick = (e, { name }) => this.setState({ menuactiveItem: name })
    
    findfood=()=>{
        this.state.goods.map(item =>{
            if (item.type === "Food"){
            return(
                this.setState({food1: [...this.state.food1,item]})
            )
            }else if(item.type === "Grocery"){
                return(
                    this.setState({veggies1: [...this.state.veggies1,item]})
                )}else if (item.type === "Fuel"){
                   return ( this.setState({fuel1: [...this.state.fuel1,item]}))
                } else return(this.setState({other1 : [...this.state.other1,item]}))
        })
    }

    formsel = (e, { name }) => this.setState({ activeform : name, menuactiveItem: name })
    
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
        const trigger = (
            <span>
              <Icon name='wrench' /> Settings
            </span>
          )
        const { menuactiveItem } = this.state

         

        const displayform = () => {
            if(this.state.activeform === "home"){
                return <Home usertype = {"customer"} food={this.state.food1} fuel={this.state.fuel1} grocery={this.state.veggies1} others={this.state.other1}/>
            }else if(this.state.activeform === "food"){             
                return( <Food usertype = {"customer"} user={this.state.currnt_user.to1ken} list = {this.state.food1}/>)
             }else if (this.state.activeform === "fuel") {
                 return( <Fuels usertype = {"customer"} user={this.state.currnt_user.to1ken} list = {this.state.fuel1}/>)
             }else if (this.state.activeform === "grocery"){
                 return(<Grocery  usertype = {"customer"} user={this.state.currnt_user.to1ken} list = {this.state.veggies1}/>)
            }else if (this.state.activeform === "others") {
                 return(<Others usertype = {"customer"} user={this.state.currnt_user.to1ken} list = {this.state.other1}/>)
            }else if (this.state.activeform === "friends") {
                 return(<Itemdisplay usertype = {"customer"} list = {this.state.other1}/>)
            }else if (this.state.activeform === "profile") {
                window.location.href = `/profile/${this.state.currnt_user.user_id}`
            }
        }
        return (<React.Fragment>
            <div style = {{backgroundColor :"black", width:"100%", position :"fixed",zIndex:1 }}>
            <Segment inverted>

            <Container>
                    <Menu  size = "large" inverted  pointing secondary  >
                    <Menu.Item
                        name='home'
                        active={menuactiveItem === 'home'}
                        onClick={this.formsel}
                    />
                    <Dropdown  name='droplist1' onClick={this.handleItemClick} text='Categories' pointing className='link item'>
                            <Dropdown.Menu >
                                <Dropdown.Item disabled>Categories</Dropdown.Item>
                                <Dropdown.Item onClick={this.formsel} name = "food">Food</Dropdown.Item>
                                <Dropdown.Item onClick={this.formsel} name = "fuel">Fuels</Dropdown.Item> 
                                <Dropdown.Item onClick={this.formsel} name = "grocery">Grocery</Dropdown.Item> 
                                <Dropdown.Item onClick={this.formsel} name = "others">Others</Dropdown.Item>
                            </Dropdown.Menu>
                    </Dropdown>
                    
                    <Menu.Menu position='right'>
                        <Menu.Item
                            name="Cart"
                            icon="cart"
                        />
                        <Dropdown trigger={trigger} pointing className='link item'>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => this.history()}>History</Dropdown.Item>
                                <Dropdown.Item name='profile' onClick={this.formsel}>Profile</Dropdown.Item>
                                <Dropdown.Item onClick = {this.logoutclicked} >Logout</Dropdown.Item>  
                            </Dropdown.Menu>
                        </Dropdown>
                        
                    </Menu.Menu>
                    </Menu>
                    </Container>
            </Segment>
           
            </div> 
            <div style={{paddingTop:"100px"}}>
                {displayform()}
            </div>
            {this.state.history ? 
            <Transaction history = {this.state.history} closeHistory = {this.closeHistory} transactions = {this.state.transactions} /> : "" }
            </React.Fragment>
        )
    }
}

export default withCookies(admin);