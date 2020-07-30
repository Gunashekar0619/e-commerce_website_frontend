import React, { Component } from 'react'
import { Table } from 'semantic-ui-react';


export default class userlist extends Component {
    constructor(props){
        super(props);
        this.state={
            profiledetails:[],
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
                console.log(typeof res.result);
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

        // const credentials=()=>{
        //     fetch('http://127.0.0.1:8000/api/user/',{
        //     method:'GET',
        //     headers:{
        //         'Content-Type':'application/json',
        //     }}).then(res=>res.json())
        //     .then (res =>{
        //         res.map(user=>{
        //             this.setState({userid : [...this.state.userid,user.id]})
        //             return 0
        //         })
        //         this.setState({credentials : res})
        //         userdetails()
        //     })
        // }
        
        // const userdetails= ()=>{
           
        //     this.state.profileid.map(id =>{
        //         fetch('http://127.0.0.1:8000/api/userdetails/',{
        //         method:'POST',
        //         headers:{
        //             'Content-Type':'application/json',
        //         },body : JSON.stringify({"user_id":id})
        //     }).then(res=> res.json())
        //     .then(res=>{
        //         this.object = res.data
        //         // set()
        //         this.setState({userdetails : [...this.state.userdetails,res.data]});
                
        //     })
        //     return 0 
        //     })
            // this.append()
            // const credentials1=()=>{
                
            //         for (let index = 0; index < object.length; index++) {
            //             const element = object[index];
            //             fetch(`http://127.0.0.1:8000/api/user/${element.user_id}/`,{
            //                 method : "Get",
            //                 headers : {
            //                 'Content-Type':'application/json',}
            //             }).then(res=>res.json())
            //                 .then(res => {
            //                     // console.log(res.username);
            //                     object.username = res.username 
            //                     object.email = res.email
            //                     console.log(object);
            //                     set()
            //                 })
            //         }     
                            
            // }
            // credentials1()
            // set =() =>{
               
            // }
        // }
    }

    // append = () =>{
    //     console.log("kjda");
    //     console.log(this.state.userdetails);
        
    //     for (let index = 0; index < this.state.userdetails.length; index++) {
    //         const element = this.state.userdetails[index];
    //         fetch(`http://127.0.0.1:8000/api/user/${element.user_id}/`,{
    //             method : "Get",
    //             headers : {
    //             'Content-Type':'application/json',}
    //             }).then(res=>res.json())
    //             .then(res => {
    //                 console.log("came");
    //                 this.state.userdetails.username = res.username 
    //                 this.state.userdetails.email = res.email
    //                 console.log(this.state.userdetails);
    //                 // this.setState({userdetails : [...this.state.userdetails,this.state.userdetails]})
    //             })
    //     }    
    // }

    render() {
        // console.log(this.state.profileid);
        // console.log(this.state.profiledetails);
        // console.log(this.state.credentials);
        console.log(this.state.profiledetails);
        let slno = 1;
        
        let length  = this.state.profiledetails.length
        let arra = this.state.profiledetails

        
        // let TableBody = () =>{
        //     if(this.state.profiledetails instanceof Array) {
        //        arra = this.state.profiledetails.map(user=>{                    
        //            return user;
        //          })
        //     }
        // }

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
                (<Table.Row key={user.user_id}>
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
            </div>
        )
    }
}
