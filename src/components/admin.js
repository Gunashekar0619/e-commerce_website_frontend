import React, { Component } from 'react'
import {Label, Menu ,Dropdown, Icon, Grid, GridColumn, Segment, Container } from 'semantic-ui-react'
import { withCookies } from 'react-cookie';
import Food from './Food';
import Others from './others';
import Fuels from './Fuels';
import Grocery from './grocery';
// import Bg from './images/Ternary Gradient.webm'
import Home from './home';
import User from './admin/user'
import './css/custom.css';
import Admin_Home from './admin/home'
//import Img from './images/onion-img.jpg'
// import { Link } from 'react-router-dom';
import '../App.css';

class admin extends Component {
    constructor (props){
        super(props);
        const token = this.props.cookies.get('mr_user')
        this.state = { 
            userslist:{},
            goods:[],
            food1:[],
            fuel1:[],
            veggies1:[],
            other1:[],
            alluser:[],
            admin:[],
            customer:[],
            seller:[],
            activeform : "all",
            activeItem:"all",
            menuactiveItem: 'Home',
            showgoods:false,
            showhome:true,
            showuser:false,
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
        fetch('http://127.0.0.1:8000/api/profile/getusers/',{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
            }}).then(res=>res.json())
            .then (res =>{
                this.setState({alluser : res.result})
                res.result.map(user => { 
                    if (user.type === "Customer") {
                        this.setState({customer : [...this.state.customer, user]})
                    }
                })
                res.result.map(user => { 
                    if (user.type === "seller") {
                        this.setState({seller : [...this.state.seller, user]})
                    }
                })
                res.result.map(user => { 
                    if (user.type === "admin") {
                        this.setState({admin : [...this.state.admin, user]})
                    }
                })
        })    
                    
    }
    handlemenuClick = (e, { name }) => {
        this.setState({ menuactiveItem: name })
        switch (name) {
            case "Home" : 
                this.setState({showhome: true,showgoods:false , showuser: false})
                break;
            case "Goods":
                this.setState({showgoods : true , showuser : false , showhome : false})
                break;
            case "Users":
                this.setState({showuser : true , showgoods : false , showhome : false})
                break;
            default:
                break;
        }
        }

    handleItemClick = (e, { name }) => {
        this.setState({ activeItem: name })
    }
    
    findfood=()=>{
        this.state.goods.map(item =>{
            if (item.type === "food"){
            return(
                this.setState({food1: [...this.state.food1,item]})
            )
            }else if(item.type === "grocesy"){
                return(
                    this.setState({veggies1: [...this.state.veggies1,item]})
                )}else if (item.type === "fuel"){
                   return ( this.setState({fuel1: [...this.state.fuel1,item]}))
                } else return(this.setState({other1 : [...this.state.other1,item]}))
        })
    }

    formsel = (e, { name }) => this.setState({ activeform : name })
    
    logoutclicked = () => {
        this.props.cookies.remove('mr_user')
        window.location.href = '/login'
    }
   
    profile =() =>{
        window.location.href = `/profile/${this.state.currnt_user.user_id}`
    }

    render() { 
        const trigger = (
            <span>
              <Icon name='wrench' /> Settings
            </span>
          )
        const { menuactiveItem } = this.state
        const { activeItem } = this.state
        const from2 = () => {
            if (this.state.activeItem === "all") {
                return(<Home usertype = {"admin"} food={this.state.food1} fuel={this.state.fuel1} grocery={this.state.veggies1} others={this.state.other1}/>) 
            }else if(this.state.activeItem === "food"){
                return( <Food usertype = {"admin"} list = {this.state.food1} token={this.state.currnt_user.to1ken}/>)
             }else if (this.state.activeItem === "fuels") {
                 return( <Fuels usertype = {"admin"} list = {this.state.fuel1} token={this.state.currnt_user.to1ken}/>)
             }else if (this.state.activeItem === "grocery"){
                 return(<Grocery usertype = {"admin"} list = {this.state.veggies1} token={this.state.currnt_user.to1ken}/>)
            }else if (this.state.activeItem === "others") {
                 return(<Others usertype = {"admin"} list = {this.state.other1} token={this.state.currnt_user.to1ken}/>)
            }
        }
        console.log(this.state.seller.length);
        return (
        <React.Fragment  >
            <div className="admin_background">
        <div style = {{backgroundColor :"black", width:"100%", position :"fixed",zIndex:1 }}>
            <Segment inverted>

            <Container>
            <Menu size = "large" inverted  pointing secondary >
                <Menu.Item
                    name='Home'
                    active={menuactiveItem === 'Home'}
                    onClick={this.handlemenuClick}
                />
             
                <Menu.Item
                    name='Goods'
                    active={menuactiveItem === 'Goods'}
                    onClick={this.handlemenuClick}
                />
                <Menu.Item
                    name='Users'
                    active={menuactiveItem === 'Users'}
                    onClick={this.handlemenuClick}
                />
                <Menu.Menu position='right'>
                    <Dropdown trigger={trigger} pointing className='link item'>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick = {this.profile}>Profile</Dropdown.Item>
                            <Dropdown.Item onClick = {this.logoutclicked} >Logout</Dropdown.Item>  
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Menu>
            </Menu></Container>
            </Segment>
        </div>
        {this.state.showhome ? (
            <div  style={{paddingTop:"70px"}} >
                <Admin_Home goods_len={this.state.goods.length} food={this.state.food1.length} fuel={this.state.fuel1.length} 
                grocery={this.state.veggies1.length} others={this.state.other1.length} alluser ={this.state.alluser.length} 
                seller ={this.state.seller.length} customer ={this.state.customer.length} admin ={this.state.admin} />
            </div>
        ):""}
        {this.state.showgoods ?(
        <div style = {{"zIndex" :"2"}}>
        <Segment ></Segment>
        <Grid style = {{marginTop:"4%"}} columns ={2}>
            <GridColumn width={2}>
        <Menu size='large' vertical>
            <Menu.Item
            onClick={this.formsel}
            name='all'
            active={activeItem === 'all'}
            onClick={this.handleItemClick}
            >
            <Label color='teal'></Label>
            ALL
            </Menu.Item>

            <Menu.Item
            onClick={this.formsel}
            name='food'
            active={activeItem === 'food'}
            onClick={this.handleItemClick}
            >
            <Label color='teal'></Label>
            Foods
            </Menu.Item>

            <Menu.Item
            onClick={this.formsel}
            name='fuels'
            active={activeItem === 'fuels'}
            onClick={this.handleItemClick}
            >
            <Label></Label>
            Fuels
            </Menu.Item>

            <Menu.Item
            onClick={this.formsel}
            name='grocery'
            active={activeItem === 'frocery'}
            onClick={this.handleItemClick}
            >
            <Label></Label>
            Grocery
            </Menu.Item>
            <Menu.Item
            onClick={this.formsel}
            name='others'
            active={activeItem === 'others'}
            onClick={this.handleItemClick}
            >
            <Label></Label>
            Others
            </Menu.Item>
        </Menu>
        </GridColumn>
        <GridColumn width = "13">
        {from2()}</GridColumn>
        </Grid></div>
        ):""}
        {this.state.showuser ? (<div>
            <Segment>
            </Segment>
            
            <User/>
        </div>):""}
        </div>
    </React.Fragment> 
        )
    }
}

export default withCookies(admin);