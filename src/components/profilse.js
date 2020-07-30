import React, { Component } from 'react'
import { Header, Image, Modal } from 'semantic-ui-react'
import { withCookies } from 'react-cookie';

class Profile extends Component{
    constructor(props){
        super(props)
        const cookies = this.props.cookies.get('mr_user') 
        this.state = {
            user :{},
            profile_id:"",
            userdetails:"",
            current_user: {
                username:cookies.username,
                user_id:cookies.user_id,
                email:cookies.email
              },
              erro1r : false,
              
        }
    }

    componentDidMount(){
        const profile = () => fetch('http://127.0.0.1:8000/api/userdetails/',{
        method: 'POST',
        headers: {
            'Content-Type':'application/json',
            //'Authorization' : `Token ${token.token}`
        },
        body: JSON.stringify({ "user_id": this.state.current_user.user_id })
        }).then ( res => res.json())
        .then (res => {
          const d = res.data;
          console.log(d.profile_id);
          this.setState({profile_id : d.profile_id})
          this.setState({userdetails : d}); 
        })
        .catch(error => this.setState({erro1r : true}))   
        profile()
  
        const user = () => fetch(`http://127.0.0.1:8000/api/user/${this.state.current_user.user_id}/`,{
        method: 'GET',
        headers: {
            'Content-Type':'application/json',
            //'Authorization' : `Token ${token.token}`
        }     
        }).then ( res => res.json())
        .then (res => {
          const d = res.data;
          console.log(d.profile_id);
          this.setState({current_user : {username:d.username,
            email:d.email}}) 
        })
        .catch(error => this.setState({erro1r : true}))
        user()
      }

      userinputchanged = event => {
        // console.log(this.state.current_user);
        
        let usdtl = this.state.current_user;
        usdtl[event.target.name] = event.target.value;
        this.setState({current_user: usdtl})
      }
  
      proinputchanged = event => {
        console.log(this.state.userdetails);
        
        let usdtl = this.state.userdetails;
        usdtl[event.target.name] = event.target.value;
        this.setState({userdetails: usdtl})
      }


      updateclicked = () =>{
        // console.log("clicked");
        // console.log(this.state.current_user);
        // console.log(this.state.userdetails);
        (fetch(`http://127.0.0.1:8000/api/user/${this.state.current_user.user_id}/update12/`,{
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            // 'Authorization' : `Token ${this.state.token}`
        },
        body : JSON.stringify({"username":this.state.current_user.username,"email":this.state.current_user.email})
        }).then( resp => resp.json())
        .then ( res => {this.setState({current_user:res});
                  // console.log("usertabe");
        })
        .catch(error => console.log(error)))
  
        const profile=()=>(fetch(`http://127.0.0.1:8000/api/profile/${this.state.current_user.user_id}/`,{
        method: 'post',
        headers: {
            'content-type': 'application/json',
            'Authorization' : `Token ${this.state.token}`
        },
        body : JSON.stringify(this.state.userdetails)
        }).then( resp => resp.json())
        .then ( res => {this.setState({userdetails:res})
        this.updated()
          // console.log("protable");        
        })
        .catch(error => console.log(error)))
        // usertable();
        profile();
      }
      updated = () =>{
        this.setState({isupdated:true})
        
      }
  
      actform = (f) =>{
        console.log(f);
        
        this.setState({activeform : f})
    }
    
      upview= ()=>{
        this.setState({updatefm:!this.state.updatefm})
      }
      reload = () =>{
        window.location.reload(true);
      }
    render(){
    return(
        <Modal 
        style={{"maxHeight": "400px"}}
         open>
        <Modal.Header>Select a Photo</Modal.Header>
        <Modal.Content image>
            <Image wrapped size='medium' src='https://react.semantic-ui.com/images/avatar/large/rachel.png' />
            <Modal.Description>
            <Header>Default Profile Image</Header>
            <p>
                We've found the following gravatar image associated with your e-mail
                address.
            </p>
            <p>Is it okay to use this photo?</p>
            </Modal.Description>
        </Modal.Content>
        </Modal>
    )
    }
}

export default withCookies(Profile)