import React, { Component } from 'react'
// import user from './user'
import { Table } from 'semantic-ui-react';

export default class customer extends Component {
    constructor(props){
        super(props)
        this.state= {
            alluser  :[],
            customer : []
        }
    }

    componentDidMount(){
        fetch('http://127.0.0.1:8000/api/profile/getusers/',{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
            }}).then(res=>res.json())
            .then (res =>{
               this.setState({alluser : res.result})
                // result.map(user => { 
                //     if (user.type === "customer") {
                //         this.setState({customer : [...this.state.customer, user]})
                //     }
                // })
        })    
    }
    
    render() {
        console.log(this.state.alluser);
        let slno = 1;
        return (
            <div>
                <Table celled striped>
                <Table.Header>
                <Table.Row>
                    <Table.HeaderCell textAlign="left"  colSpan="7">All Users</Table.HeaderCell>
                </Table.Row>
                </Table.Header>

                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>sl.no</Table.HeaderCell>
                        <Table.HeaderCell>Username</Table.HeaderCell>
                        <Table.HeaderCell>Type</Table.HeaderCell>
                        <Table.HeaderCell>Gender</Table.HeaderCell>
                        <Table.HeaderCell>Email</Table.HeaderCell>
                        <Table.HeaderCell>Phone Number</Table.HeaderCell>
                        <Table.HeaderCell>Address</Table.HeaderCell>
                        <Table.HeaderCell>City</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                              
                <Table.Body>
                {this.state.alluser.map(user=>{
                    if(user.type === "Customer"){
                    return(<Table.Row key={user.user_id}>
                    <Table.Cell>{slno++}</Table.Cell>
                    <Table.Cell>{user.name}</Table.Cell>
                    <Table.Cell>{user.type}</Table.Cell>
                    <Table.Cell>{user.gender}</Table.Cell>
                    <Table.Cell>{user.email}</Table.Cell>
                    <Table.Cell>{user.phone_no}</Table.Cell>
                    <Table.Cell>{user.address}</Table.Cell>
                    <Table.Cell>{user.city}</Table.Cell>
                </Table.Row>)
            }else{return null}})}

          </Table.Body>
                

            </Table>
            </div>
        )
    }
}
