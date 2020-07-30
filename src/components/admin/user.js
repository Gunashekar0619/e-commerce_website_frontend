import React,{ Component} from 'react';
import {  Menu,  Grid, GridColumn ,Sticky} from 'semantic-ui-react';
// import { Helmet } from 'react-helmet';
import { withCookies } from 'react-cookie';
import Userlist from './allusers'
// import styles from './styles.css';
// import { Route} from 'react-router-dom';
// import Users from '../Users';
import Customer from './customer';
import Seller from './seller'
import '../css/custom.css';

class User extends Component{
    state = { activeItem: 'All Users' }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
    const { activeItem } = this.state

    const table=()=>{
        if (this.state.activeItem === "All Users"){
            return (<Userlist/>)
        }else if(this.state.activeItem === "Customer"){
            return (<Customer/>)
        }else if(this.state.activeItem === "Seller"){
            return (<Seller/>)
    }}
    return ( 
        <div >
            
        <Grid style={{marginTop : "5%"}} columns="2">
        
            <GridColumn width="3"> 
            <Sticky>
                <Menu  inverted pointing vertical>
                <Menu.Item
                name='All Users'
                active={activeItem === 'All Users'}
                onClick={this.handleItemClick}
                />
                <Menu.Item
                name='Customer'
                active={activeItem === 'Customer'}
                onClick={this.handleItemClick}
                />
                <Menu.Item
                name='Seller'
                active={activeItem === 'Seller'}
                onClick={this.handleItemClick}
                />
                </Menu></Sticky>
                </GridColumn>
            <GridColumn>
            
            {table()}
            </GridColumn>
        </Grid>
        
    </div>   
    )
  }
}

export default withCookies(User)