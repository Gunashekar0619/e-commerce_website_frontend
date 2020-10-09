import React,{Component} from 'react'
import { Message,Modal,Label, Divider,Input,Form,Button,Select,Segment,FormGroup, Container, ModalHeader, ModalContent, ModalActions } from 'semantic-ui-react'
///import home from './home'
//import Combobox from 'react-widgets/lib/Combobox'
import { withCookies } from 'react-cookie';
import { Link } from 'react-router-dom';


class Login extends Component{
    constructor(props){
    super(props);
    this.state = {
        credentials:{   
            username:"",
            password:"",
            email :""
        },
        signupdetails:{
            user_id:"",
            gender :"",
            type:"",
            phone_no:"",
            address:"",
            city:"",
            country:"",
            state:"",
            pincode:"",
        },
        usertype : "",
        errorMessage: "",
        issignup : false,
        isloginview : true,
        erro1r : false,
        inputuser : true,
        inputpass : true,
        CP:"",
    }
    // this.gender= this.gender.bind(this);
    }
    findtype = token =>{
        fetch('http://127.0.0.1:8000/api/userdetails/',{
        method: 'POST',
        headers: {
            'Content-Type':'application/json',
            //'Authorization' : `Token ${token.token}`
        },
        body: JSON.stringify({ "user_id": token })
        }).then ( res => res.json())
        .then (res => {
          const d = res.data;
          console.log(d);
          this.setState({usertype : d}); 
          this.loadpage();
        })
        .catch(error => this.setState({erro1r : true}))
      }

      loadpage = event =>{
          if (this.state.usertype.type === "seller")
          {
            window.location.href ='/seller'
          }
          else 
            if(this.state.usertype.type === "Customer")
            {
                window.location.href = '/customer'
            }
            else
                if(this.state.usertype.type === "admin")
                {
                    window.location.href = '/admin'
                }
      }

    //   gender(event){
    //     // console.log(event.target.value);
        
    //     let value = event.target.value 
    //     console.log(value);
        
    //     this.setState({signupdetails: { gender : value  }})
    //     console.log(this.state.signupdetails);
    //   }

    inputchanged = event =>{        
        let cred = this.state.credentials;
        cred[event.target.name] = event.target.value;
        this.setState({credentials: cred});
        this.setState({inputuser : true , inputpass : true})
    }

    // waring = () =>{
    //     <Message negative>
    //         <Message.Header>Account not found </Message.Header>
    //         <p>You have entered wrong credentials</p>
    //     </Message>
    // }

    signupchange = event =>{
        let cred = this.state.signupdetails;
        console.log(cred);
        console.log(event.target.value);
        cred[event.target.name] = event.target.value;
        this.setState({signupdetails : cred});
        console.log(this.state.signupdetails);
        
    }

    confirm = event => {
        this.setState({CP : event.target.value})
        console.log(this.state.CP);
        
    }
    
    loginform = event =>{
        if (this.state.credentials.username === ""){
            this.setState({inputuser: false });}
        if (this.state.credentials.password === ""){
            this.setState({inputpass: false });}
        
        event.preventDefault();
        //console.log(this.state.credentials);     
                  
        fetch(`http://127.0.0.1:8000/api/auth/`,{
            method: 'POST',
            headers: {'content-type':'application/json'},
            body: JSON.stringify(this.state.credentials)        
        })
        .then(async res =>{
        //console.log(res.body);
        if(res.ok) {
            const response = await res.json();
            console.log(response)
            this.props.cookies.set('mr_user',response.data)            
            this.findtype(response.data.user_id)
        }else {this.setState({erro1r : true});}})
        .catch(error => {
            this.setState({erro1r : true});            
        })           
    }

    signuform = evnet => {
       this.setState({issignup: true})
    }

    fullsignup = () =>{
    const user=()=>{
        fetch('http://127.0.0.1:8000/api/user/',{
            method:'POST',
            headers: {'content-type':'application/json'},
            body:JSON.stringify(this.state.credentials)
        }).then(resp => resp.json())
        .then(res => { let a = this.state.signupdetails
            a.user_id = res.id
            this.setState({signupdetails:a})
        console.log(res.id);
        profile()
        })
        .catch( err=> console.log(err) )}
    
    const profile=()=> {
        console.log("came");
        fetch('http://127.0.0.1:8000/api/profile/',{
            method:'POST',
            headers: {'content-type':'application/json',
                // 'Authorization' : `Token ${this.state.token}`
            },
            body:JSON.stringify(this.state.signupdetails)
        }).then(resp => resp.json())
        .then(res => 
                {this.istoggleview()
            console.log(this.state.signupdetails)})
        .catch( err=> console.log(err))
    }
    user();     

    
    
}
    
    home = () =>{
        window.location.href="/"
    }
   
    istoggleview = () => {
        this.setState({isloginview: !this.state.isloginview});
    }
    
    render(){
        //const {isload} = this.state;
        // if(isload){
        //     window.location.href = '/home'
        // }
        // const options = [{ text:"Male", value: 'male'},
        // { text:"Female", value: 'female'},
        // { text:"Other", value: 'other'}]  
        return (

                <div className="container" >
                <Modal open dimmer style={{minWidth:"300px",height:"auto",minHeight:"300px",marginBottom:"10%",marginTop:"5%",marginLeft : "20%" ,marginRight:"25%",padding:"20px"}}>
                {this.state.isloginview ? (<form style={{width:'100%'}} className = "ui form">                
                    <ModalHeader style={{height:"50px" ,marginTop : "5%"}}>
                    <h1 className = "ui segment " style = {{ backgroundColor:"DarkGrey", color : "black" , textAlign : "center" ,font: "small-caps bold 20px/0 serif"}}>                        Login 
                    </h1></ModalHeader>
                    <ModalContent style={{paddingLeft : "20px",paddingRight:"20px"}}>
                    {this.state.erro1r ? (
                            <Message negative>
                               <Message.Header>Account not found </Message.Header>
                               <p>You have entered wrong credentials</p>
                           </Message>
                    ): "" }
                    <span>Username</span><br/>
                    {!this.state.inputuser ? (<Label basic color='red' pointing='below'>
                                                    Please enter a value
                                                </Label>): (<div></div>)}
                    <br/><Input placeholder = 'username'
                    name = "username" fluid type = "text" value={this.state.credentials.username} onChange={this.inputchanged}/>
                    <br/>
                    <span>password</span><br/>
                    {!this.state.inputpass ? (<Label basic color='red' pointing='below'>
                                                    Please enter a value
                                                </Label>): (<div></div>)}
                    <Input fluid placeholder = 'Password'  name = "password" type = "password" value = {this.state.credentials.password} onChange={this.inputchanged}/><br/>
                    </ModalContent>
                    <ModalActions style={{paddingLeft:"20px",paddingRight:"20px"}}>
                    <button className="ui button primary" style={{float:"right"}} onClick ={this.loginform}> Login </button>
                    <a style={{float:"left",marginTop:"10px",color:"blue",cursor:"pointer"}} onClick={this.istoggleview}>
                       <u> Create Account </u>
                    </a><br/>
                    </ModalActions>
                    </form>
                    ): (<Segment style={{width:'100%'}}>
                        <h1 className = "ui segment " style = {{width:"100%",backgroundColor : 'grey' , color : "white" , textAlign : "center"}}>
                        Signup Form 
                    </h1>
                        <Divider/>
                        <Form style={{width:"100%"}}>
                      <Form.Group widths='equal'>
                        <Form.Field 
                        placeholder = 'username'
                          type="text"
                          name='username'
                          control={Input}
                          label='Username'
                          onChange={this.inputchanged}
                          value={this.state.credentials.username}
                        />
                        {/* <Form.Field
                                    name='type'
                                    control={Select}
                                    placeholder="type"
                                    options={[{ text:"seller", value: 'seller' },
                                            { text:"buyer", value: 'buyer'},
                                           ]}
                                    label={{ children: 'Type', htmlFor: 'form-select-control-gender' }}
                                    value={this.state.signupdetails.type}
                                    onChange={this.signupchange}
                                /> */}
                        <Form.Field>
                            <span>Gender</span>
                            <select placeholder="gender" name="type" value = {this.state.signupdetails.type} onChange={this.signupchange}>
                            <optgroup disabled>
                            <option>Type</option>
                            </optgroup>
                            <optgroup>
                            <option value="male">Seller</option>
                            <option value="female">Buyer</option>
                            </optgroup>
                        </select>
                        </Form.Field><Form.Field>
                            <span>Gender</span>
                            <select placeholder="gender" name="gender" value = {this.state.signupdetails.gender} onChange={this.signupchange}>
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
                        {/* <select label = "type" className="ui selection " name = "type"
                         value = {this.state.signupdetails.type} onChange={this.signupchange}>
                            <option  value="N/A">Type</option>
                            <option value="seller">Seller</option>
                            <option value="Customer">Buyer</option>
                        </select> */}

                                {/* <Dropdown 
                                    name="gender"
                                    placeholder='gender'
                                    onChange={this.signupchange}
                                    selection
                                    value={this.state.signupdetails.gender}
                                    options={ [{ text: 'male', value: 'male'},
                                                { text: 'Female', value: 'Female'},
                                                { text: 'Other', value: 'Other'},]}
                                /> */}
                        
                        {/* <select label = "gender" className="ui selection " name = "gender"
                         value = {this.state.signupdetails.gender} onChange={this.signupchange}>
                            <option value="N/A">Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select> */}
                        </Form.Group>
                        <Form.Group widths={"equal"} >
                        <Form.Field 
                            name='email'
                            control={Input}
                            label='Email'
                            placeholder="Email"
                            onChange={this.inputchanged}
                            value={this.state.credentials.email}      
                        /> 
                        <Form.Field width ={10}
                            name='phone_no'
                            label='Phone No.'
                            control={Input}
                            placeholder="Phone no"
                            onChange={this.signupchange}
                            value={this.state.signupdetails.phone_no}      
                        /></Form.Group>
                        <FormGroup widths={"equal"}>
                        <Form.Field
                            name='address'
                            label="Address"
                            placeholder="Address"
                            control={Input}
                            onChange={this.signupchange}
                            value={this.state.signupdetails.address}
                        />
                        <Form.Field
                            name='city'
                            label="City"
                            placeholder="City"
                            control={Input}
                            onChange={this.signupchange}
                            value={this.state.signupdetails.city}
                        />
                        <Form.Field
                            name='state'
                            label="State"
                            placeholder="State"
                            control={Input}
                            onChange={this.signupchange}
                            value={this.state.signupdetails.state}
                        />
                        </FormGroup>
                    <FormGroup>
                        <Form.Field
                            name='country'
                            label="Country"
                            placeholder="Country"
                            control={Input}
                            onChange={this.signupchange}
                            value={this.state.signupdetails.country}
                        />
                    <Form.Field
                            name="pincode"
                            label ="Pincode"
                            placeholder = "Pincode"
                            control = {Input}
                            type = "number"
                            value={this.state.signupdetails.pincode}
                            onChange={this.signupchange}
                        />
                        <Form.Field
                            name="password"
                            label ="Password"
                            placeholder = "Enter Password"
                            control = {Input}
                            type = "password"
                            value={this.state.credentials.password}
                            onChange={this.inputchanged}
                        />
                        <Form.Field
                            name="confirm password"
                            label="Confirm Password"
                            placeholder="re-enter password"
                            type ="password"
                            control={Input}
                            onChange={this.confirm}
                        />
                    </FormGroup>
                    <Divider></Divider>
                <div style={{"height":"40px"}}>
                <Button positive floated="right" onClick={this.fullsignup}>Signup </Button>
                <span onClick={()=>{this.setState({isloginview : true})}} style = {{'color':"blue",cursor:"pointer"}} > <u>I already have Account?</u></span>
                </div>
                </Form></Segment>)}
                
            </Modal>
        </div>       
        )
    }
}

export default withCookies(Login);