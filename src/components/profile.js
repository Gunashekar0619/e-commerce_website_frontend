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
    Select,
    Icon,
    Modal,
    // TextArea,
    GridRow,
    Segment,
    FormGroup,
    Message} from 'semantic-ui-react'

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

    upview= ()=>{
      this.setState({updatefm:!this.state.updatefm})
    }
    reload = () =>{
      window.location.reload(true);
    }
    render() {
      // const genderOptions = [
      //   { key: 'm', text: 'Male', value: 'male' },
      //   { key: 'f', text: 'Female', value: 'female' },
      //   { key: 'o', text: 'Other', value: 'other' },
      // ] 

      // console.log(this.state.token);
      // this.findtype()
        return ( <Container>
            <Menu active="profile"></Menu>        
        {this.state.isupdated ? (<div className="global">
          <Modal open="true" basic size='small'>
          <Header icon='check' content='Profile Update' />
          <Modal.Actions>
            <Button onClick={this.reload} color='green' inverted>
              <Icon name='checkmark' /> Yes
            </Button>
          </Modal.Actions>
        </Modal></div>
        ):""}
        <Divider/>
        {!this.state.updatefm? (    
        <Segment  style={{width:"50%"}}>
          <Container>
            <Header>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Profile Details</Header>
            <Grid columns="2" >
              <GridRow>
                <GridColumn width="4" >
                    <Label>Username :</Label><br/><br/>
                    <Label>Email :</Label><br/><br/>
                    <Label>Type :</Label><br/><br/>
                    <Label>Phone :</Label><br/><br/>
                    <Label>Gender :</Label><br/><br/>
                    <Label>Address :</Label><br/><br/>
                    <Label>City :</Label><br/><br/>
                    <Label>Country :</Label><br/><br/>
                </GridColumn >
                <GridColumn >
                  <Label>{this.state.current_user.username}</Label><br/><br/>
                  <Label>{this.state.current_user.email}</Label><br/><br/>
                  <Label>{this.state.userdetails.type}</Label><br/><br/>  
                    <Label>{this.state.userdetails.phone_no}</Label><br/><br/>
                    <Label>{this.state.userdetails.gender}</Label><br/><br/>
                    <Label>{this.state.userdetails.address}</Label><br/><br/>
                    <Label>{this.state.userdetails.city}</Label><br/><br/>
                    <Label>{this.state.userdetails.country}</Label><br/><br/>
                </GridColumn>    
                </GridRow>            
            </Grid><Button onClick={this.upview} floated="right">Update</Button>
            <span>&nbsp;</span><br/><span>&nbsp;</span>
            </Container>
        </Segment> ):(<Segment>
          <div><Button floated="right" onClick={this.reload}>Back</Button></div>
          <Label size="large">Edit Profile</Label>
          <Divider/>
          <Form style={{width:"100%"}}>
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
          <Form.Field
            name='gender'
            control={Select}
            placeholder={this.state.userdetails.gender}
            options={[{ text:"Male", value: 'male' },
                      { text:"Female", value: 'female'},
                      {  text:"Other", value: 'other'}]}
            label={{ children: 'Gender', htmlFor: 'form-select-control-gender' }}
           
            // search
            onChange={this.proinputchanged}
            //searchInput={{ id: 'form-select-control-gender' }}
          />
        </Form.Group><Form.Group widths={"equal"} >
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
          /></Form.Group>
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
          name='country'
          label="Country"
          control={Input}
          onChange={this.proinputchanged}
          value={this.state.userdetails.country}
        /></FormGroup>
        <FormGroup>
        <Form.Field
          id='form-button-control-public'
          control={Button}
          onClick={this.reload}
          content='Cancel'
        />
        <Form.Field
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