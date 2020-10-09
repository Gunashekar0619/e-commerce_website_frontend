import React, { Component } from 'react'
import { Table,Grid,Sidebar, Popup ,Icon,Segment,Checkbox,Header,TransitionablePortal, Divider, Button } from 'semantic-ui-react';


export default class userlist extends Component {
    constructor(props){
        super(props);
        this.state={
            profiledetails:[],
            details_form:false,
            details :"",
            animation: 'scale',
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
    handleClick = () => this.setState((prevState) => ({ open: true }))
    details = (user) =>{
        this.handleClick()
        this.setState({details : user})
    }

    deleteclick(id){
      console.log("delete");
      fetch(`http://127.0.0.1:8000/api/user/${id}/`,{
          method:'DELETE',
          headers:{
              'Content-Type':'application/json',
          }}).then(res => {
            for(let i=0;i<this.state.profiledetails.length;i++){
              if(this.state.profiledetails[i].id === id){
                delete this.state.profiledetails[i];
              }
            }
          }
            )
          .catch(err => console.log(err))    
  }
    render() {
        const { animation, duration, open } = this.state
        // console.log(this.state.profiledetails);
        let slno = 1;
        
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
                (<Table.Row key={user.user_id}  >
                    <Table.Cell>{slno++}</Table.Cell>
                    <Table.Cell onClick={()=>this.details(user)} style={{cursor:"pointer"}} >{user.name} </Table.Cell>
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
                left: '70%',
                position: 'fixed',
                top: '20%',
                zIndex: 1000,
                width : '400px',
                padding: "20px",
              }}>
              <Header style={{height:"auto",marginBottom : "20px"}}>{this.state.details.name} 
              <Popup
                on='click'
                pinned 
                position='top center'
                trigger={<Icon style={{position:"absolute",right:"10px",cursor:"pointer"}} color="red" name = "trash alternate"></Icon>}>
                <div style={{"width":"90px"}}>
                    <span>Are you sure ?</span><br/>
                    <Button primary  onClick={()=>this.deleteclick(this.state.details.user_id)}>yes</Button>
                </div></Popup>
              {/* <Icon name="trash alternate" size="mini" style={{position:"absolute",right:"10px",cursor:"pointer"}} color="red" onClick={()=>this.deleteclick(this.state.details.user_id)}></Icon> */}
              {/* <Button icon="trash alternate" >Delete</Button> */}
              </Header>
              <Divider/>
              <div className="row" style={{width:"auto"}}>
                  <div className="column" style={{"width":"50%","paddingLeft":"10px"}}> 
                    User id     <br/>
                    Type        <br/>
                    Gender      <br/>
                    Ph.No       <br/>
                    Email       <br/>
                    Address     <br/>
                    City        <br/>
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
              
            </Segment>
          </TransitionablePortal>
            </div>
        )
    }
}
