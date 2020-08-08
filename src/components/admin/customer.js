import React, { Component } from 'react'
// import user from './user'
import { Table,Grid,Sidebar, Menu ,Icon,Segment,Checkbox,Header,TransitionablePortal, Divider, Button } from 'semantic-ui-react';

export default class customer extends Component {
    constructor(props){
        super(props)
        this.state= {
            alluser  :[],
            customer : [],
            details :"",
            animation: 'swing down',
            duration: 500,
            open: false
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
    handleClick = () => this.setState((prevState) => ({ open: !prevState.open }))
    details = (user) =>{
        this.setState({details : user})
        this.handleClick()
    }
    deleteclick(id){
        console.log("delete");
        fetch(`http://127.0.0.1:8000/api/user/${id}/`,{
            method:'DELETE',
            headers:{
                'Content-Type':'application/json',
            }}).then(res=>res.json())
            .then (res =>{ console.log("user deleted");
        })    
    }
    render() {
        const { animation, duration, open } = this.state
        console.log(this.state.alluser);
        let slno = 1;
        return (
            <div>
                <Table celled striped>
                <Table.Header>
                <Table.Row>
                    <Table.HeaderCell textAlign="left"  colSpan="7">Customers</Table.HeaderCell>
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
                    return(<Table.Row key={user.user_id} onClick={()=>this.details(user)}>
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
            <TransitionablePortal
            open={this.state.open}
            transition={{ animation, duration }}
          >
            <Segment
              style={{
                left: '40%',
                position: 'fixed',
                top: '60px',
                zIndex: 1000,
                width : '314px'
              }}
            >
              <Header>{this.state.details.name}</Header>
              <Divider/>
              <div className="row">
                  <div className="column" style={{"width":"50%","paddingLeft":"10px"}}> 
                    user id     <br/>
                    Type        <br/>
                    Gender      <br/>
                    Ph.No       <br/>
                    Email       <br/>
                    Address     <br/>
                    city        <br/>
                  </div>
                  <div className="column">
                    :&nbsp;{this.state.details.user_id}<br/>
                    :&nbsp;{this.state.details.type}<br/>
                    :&nbsp;{this.state.details.gender}<br/>
                    :&nbsp;{this.state.details.phone_no}<br/>
                    :&nbsp;{this.state.details.email}<br/>
                    :&nbsp;{this.state.details.address}<br/>
                    :&nbsp;{this.state.details.city}<br/>
                  </div>
              </div>
              <Button onClick={()=>this.deleteclick(this.state.details.user_id)} negative>Delete</Button>
            </Segment>
          </TransitionablePortal>
            </div>
        )
    }
}
