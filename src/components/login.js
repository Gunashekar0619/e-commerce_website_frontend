import React,{Component} from 'react'
import { Dropdown, Message,Label, Divider,Input } from 'semantic-ui-react'
///import home from './home'
//import Combobox from 'react-widgets/lib/Combobox'
import { withCookies } from 'react-cookie';


class Login extends Component{
    state = {
        credentials:{   
            username:"",
            password:""
        },
        signupdetails:{
            user_id:"",
            Gender :"",
            type:"",
            phone_no:"",
            address:"",
            city:"",
            country:""
        },
        usertype : "",
        errorMessage: "",
        issignup : false,
        isloginview : true,
        erro1r : false,
        inputuser : true,
        inputpass : true
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
        cred[event.target.name] = event.target.value;
        this.setState({signupdetails : cred});
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
            //console.log(response)
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
    signup = event => {
        fetch('http://127.0.0.1:8000/api/user/',{
            method:'POST',
            headers: {'content-type':'application/json'},
            body:JSON.stringify(this.state.credentials)
        }).then(resp => resp.json())
        .then(res => {
            console.log(res.username)
        }

        )
        .catch(
            err=> this.home()
        )

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
        return (

                <div >
                <div className = " ui segment Widthform" >
                {this.state.isloginview ? (<form className = "ui form">                
                    <h1 className = "ui segment " style = {{backgroundColor : 'grey' , color : "white" , textAlign : "center"}}>
                        Login 
                    </h1>
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
                    name = "username" type = "text" value={this.state.credentials.username} onChange={this.inputchanged}/>
                    <br/>
                    <span>password</span><br/>
                    {!this.state.inputpass ? (<Label basic color='red' pointing='below'>
                                                    Please enter a value
                                                </Label>): (<div></div>)}
                    <input className = "Input" name = "password" type = "password" value = {this.state.credentials.password} onChange={this.inputchanged}/><br/>
                    <button className="ui button" onClick ={this.loginform}> Login </button>
                    <Divider horizontal>Or</Divider>
                    <p onClick={this.istoggleview}>
                        Create Account
                    </p><br/>
                   
                    </form>
                    ): (<form className = "ui form ">
                    <h1> Signup </h1>
                    <span>Username</span><br/>
                    <input className = "Input" name = "username" type = "text" value = {this.state.credentials.username} onChange= {this.inputchanged} /><br/>
                    <span>password</span><br/>
                    <input className = "Input" name = "password" type = "password" value = {this.state.credentials.password} onChange= {this.inputchanged}/><br/>
                    <span>Gender</span>

                    <span>Type</span><br/>
                    <Dropdown
                        placeholder='Type'
                        value = {this.state.credentials.type}
                        onChange= {this.type}
                        fluid
                        search
                        selection
                        options={[{ key : '1', text: 'Customer' },{ key : '2', text: 'Seller' }]}
                    /><br/>
                    <span>Address</span><br/>                    
                    <input className = "Input" placeholder="address" name = "address" type = "text" value = {this.state.signupdetails.address} onChange= {this.signupchange} /><br/>
                    <span>City</span><br/>
                    <input className = "Input" name = "city" type = "text" value = {this.state.signupdetails.city} onChange= {this.signupchange} /><br/>
                    <span>Country</span><br/>
                    <input className = "Input" name = "county" type = "text" value = {this.state.signupdetails.country} onChange= {this.signupchange} /><br/>
                    <span>Phone_no</span><br/>
                    <input className = "Input" name = "phone_no" type = "text" value = {this.state.signupdetails.phone_no} onChange= {this.signupchange} /><br/>
                    <button className="ui button">create account</button>
                    <p onClick = {this.istoggleview}>
                        Back
                    </p>               
                </form>)}
                <button className="ui button" onClick= {this.home}>Home</button>
                </div>
                </div>  
               
        )
    }
}

export default withCookies(Login);