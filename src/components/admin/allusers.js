import React, { Component } from 'react'
import { Table,Grid,Sidebar, Menu ,Icon,Segment,Checkbox,Header,TransitionablePortal, Divider, Button } from 'semantic-ui-react';


export default class userlist extends Component {
    constructor(props){
        super(props);
        this.state={
            profiledetails:[],
            details_form:false,
            details :"",
            animation: 'swing down',
            duration: 500,
            open: false
        }
    }

    object = {}
    componentDidMount(){
        const profile=()=>{
        fetch('http://127.0.0.1:8000/api/profile/getusers/',{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
            }}).then(res=>res.json())
            .then (res =>{
                // console.log(typeof res.result);
                this.setState({ profiledetails : res.result})
                // res.map(user=>{
                //     this.setState({profileid : [...this.state.profileid,user.user_id]})
                //     return 0;
                // })
                // this.setState({profiledetails:res});
                // credentials()
            })
        }
        profile()
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
          }}).then(console.log("user deleted"))
          .catch(err => console.log(err))    
  }
    render() {
        const { animation, duration, open } = this.state
        // console.log(this.state.profiledetails);
        let slno = 1;
        
        let length  = this.state.profiledetails.length
        let arra = this.state.profiledetails

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
                {arra.map(user =>
                (<Table.Row key={user.user_id} onClick={()=>this.details(user)} >
                    <Table.Cell>{slno++}</Table.Cell>
                    <Table.Cell>{user.name}</Table.Cell>
                    <Table.Cell>{user.type}</Table.Cell>
                    <Table.Cell>{user.gender}</Table.Cell>
                    <Table.Cell>{user.email}</Table.Cell>
                    <Table.Cell>{user.phone_no}</Table.Cell>
                    <Table.Cell>{user.address}</Table.Cell>
                    <Table.Cell>{user.city}</Table.Cell>
                </Table.Row>),
            )}
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
