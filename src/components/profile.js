import React, { Component } from 'react'
import Menu from './menu'
import { withCookies } from 'react-cookie';
import '../App.css';
import {
    // Modal,
    Button,
    // Image,
    Header,
    Divider,
    Container,
    Label,
    GridColumn,
    Grid,
    Form,
    Input,
    Icon,
    Modal,
    // TextArea,
    GridRow,
    Segment,
    FormGroup,
    } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

class Profile extends Component {
  constructor(props){
    super(props);
    const cookies = this.props.cookies.get('mr_user') 
    this.state = {
      updatefm:false,
      token:cookies.token,
      current_user: {
        username:cookies.username,
        user_id:cookies.user_id,
        email:cookies.email
      },
      userdetails:"",
      profile_id:"",
      isupdated:false
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
        console.log(d);
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
      console.log(this.state.current_user);
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
    reload () { 
      window.location.reload()
    }
    render() {
        return ( <Container>
        <Menu  present = {()=>this.actform}  user = {this.state.userdetails.type} active="profile"></Menu>        
        {this.state.isupdated ? (<div className="global">
          <Modal open style={{marginTop : "10%" , marginLeft : "25%" , maxHeight : "300px"}} basic size='small'>
          <Header icon={ 'check'} content='Profile Update' />
          <Modal.Actions>
            <Button onClick={this.reload} color='green' inverted>
              <Icon  name='checkmark' /> Yes
            </Button>
          </Modal.Actions>
        </Modal></div>
        ):""}
        <Divider/>
        {!this.state.updatefm? (    
        <Segment  style={{width:"50%"}}>
          <Container>
            <Header textAlign="left">Profile Details</Header>
            <Divider/>
            <Grid columns="2" >
              <GridRow>
                <GridColumn width="4" >
                    <Label>Username </Label><br/><br/>
                    <Label>Email </Label><br/><br/>
                    <Label>Type </Label><br/><br/>
                    <Label>Phone </Label><br/><br/>
                    <Label>Gender </Label><br/><br/>
                    <Label>Address </Label><br/><br/>
                    <Label>City </Label><br/><br/>
                    <Label>Country </Label><br/><br/>
                    {this.state.userdetails.type !== "admin" ?
                    <Label>Pin Code </Label> :""}
                </GridColumn >
                <GridColumn >
                  :<Label>{this.state.current_user.username}</Label><br/><br/>
                  :<Label>{this.state.current_user.email}</Label><br/><br/>
                  :<Label>{this.state.userdetails.type}</Label><br/><br/>  
                  :<Label>{this.state.userdetails.phone_no}</Label><br/><br/>
                  :<Label>{this.state.userdetails.gender}</Label><br/><br/>
                  :<Label>{this.state.userdetails.address}</Label><br/><br/>
                  :<Label>{this.state.userdetails.city}</Label><br/><br/>
                  :<Label>{this.state.userdetails.country}</Label><br/><br/>
                  {this.state.userdetails.type !== "admin" ?
                  <span>:<Label>{this.state.userdetails.pincode}</Label></span> :""}
                </GridColumn>    
                </GridRow>            
            </Grid>
            <Divider/>
            <Link  to ={`/${this.state.userdetails.type}`}><Button active>Back</Button></Link>
            <Button onClick={this.upview} positive floated="right">Update</Button>
            </Container>
        </Segment> ):(<Segment>
          <Icon style={{position:"absolute",right:"10px",cursor:"pointer"}}  onClick={this.reload} size="large" name="x"></Icon>
        <h3 size="large">Edit Profile</h3>
        <Divider/>
        <Form style={{width:"100%",height:"370px"}}>
        <Form.Group widths='equal'>
          <Form.Field
          placeholder = 'username'
            type="text"
            name='username'
            control={Input}
            label='Username'
            onChange={this.userinputchanged}
            value={this.state.current_user.username}
          />
          <Form.Field>
            <span>Gender</span>
            <select placeholder="gender" name="gender" onChange={this.proinputchanged} value={this.state.userdetails.gender}>
            <optgroup disabled>
              <option>Select gender</option>
            </optgroup>
            <optgroup>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </optgroup>
          </select>
          </Form.Field>
        </Form.Group>
        <Form.Group widths={"equal"} >
          <Form.Field 
          name='email'
          control={Input}
          label='Email'
          onChange={this.userinputchanged}
          value={this.state.current_user.email}      
          /> 
          <Form.Field width ={10}
          name='phone_no'
          control={Input}
          label='Phone No.'
          onChange={this.proinputchanged}
          value={this.state.userdetails.phone_no}      
          />
        </Form.Group>
        <FormGroup widths={"equal"}>
          <Form.Field
            name='address'
            label="Address"
            control={Input}
            onChange={this.proinputchanged}
            value={this.state.userdetails.address}
          />
          <Form.Field
            name='city'
            label="City"
            control={Input}
            onChange={this.proinputchanged}
            value={this.state.userdetails.city}
          />
          <Form.Field
            name='state'
            label="State"
            control={Input}
            onChange={this.proinputchanged}
            value={this.state.userdetails.state}
          />
        </FormGroup>
        <FormGroup>
          {this.state.userdetails.type !== "admin" ? 
          <Form.Field
            name='pincode'
            label="Pin Code"
            control={Input}
            onChange={this.proinputchanged}
            value={this.state.userdetails.pincode}
          />:""}
          <Form.Field
            name='country'
            label="Country"
            control={Input}
            onChange={this.proinputchanged}
            value={this.state.userdetails.country}
          />
        </FormGroup><br/>
        <Divider style={{marginTop:"-9px"}}></Divider>
        <FormGroup style={{position:"absolute",right:"10px",bottom:"-6px"}}>
          <Form.Field
            negative
            id='form-button-control-public'
            control={Button}
            onClick={this.reload}
            content='Cancel'
          />
          <Form.Field
          positive
            id='form-button-control-public'
            control={Button}
            content='Update'
            onClick={this.updateclicked}
          />
        </FormGroup>
      </Form></Segment>)}
      </Container>
      )
    }
}

export default withCookies(Profile);