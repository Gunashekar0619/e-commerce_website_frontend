import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalActions, ModalContent, Segment, Input, Dropdown, Header, Divider, GridColumn, GridRow, Label, Container } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { withCookies } from 'react-cookie';
import  Cards from 'react-credit-cards'
import './card-validator.js'
import '../css/custom.css'

class payment extends Component {
    constructor(props){
        super(props);
        const cookies = this.props.cookies.get('mr_user') 
        this.state = {
            good_qty:"",
            good :"",
            order_total:"",
            user:"",
            current_user: {
                username:cookies.username,
                user_id:cookies.user_id,
                email:cookies.email
              },
            cardDetails:{
                number:""
            }
        }
    }
    
    componentDidMount =()=>{
        const {match :{params}} =this.props;
        this.setState({good_qty : params.qty})
        fetch(`http://127.0.0.1:8000/api/Goods/${params.id}/`,{
        method: 'GET',
        headers: {
            'Content-Type':'application/json',
        }
        }).then( resp => resp.json())
        .then ( res => {this.setState({good:res});
        this.setState({order_total:((res.price) * (params.qty))})
            console.log(this.state.good);
      }
        )
        .catch(error => console.log(error))
        fetch('http://127.0.0.1:8000/api/userdetails/',{
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
            this.setState({user : d}); 
        })
        .catch(error => this.setState({erro1r : true}))
    }

    inputchange= event =>{
        let usdtl = this.state.cardDetails;
        usdtl[event.target.name] = event.target.value;
        this.setState({cardDetails: usdtl})
        console.log(usdtl);
    }
    render() {
        return (
            <div>
            <Modal open style={{marginLeft:"20%", marginTop:"5%"}}>
            <ModalHeader>
                Payment Block
            </ModalHeader>
            <ModalContent>
            <Segment>
                <Header>Order Details</Header>
                <Divider/>
                <Segment >
                <GridRow divided>
                <GridColumn style={{"width":"50%",paddingLeft:"10px",paddingRight:"10px"}} >
                <Label >Name</Label> <span style={{"float" :"right"}}>{this.state.good.name}</span><br></br>
                <Label >Location</Label> <span style={{"float":"right"}}>{this.state.good.location}</span>
                </GridColumn>
                
                <GridColumn style={{"width":"50%",paddingLeft:"10px",paddingRight:"10px"}}>
                    <Label>Price</Label> 
                    <span style={{"float":"right"}}>{this.state.good.price}</span><br/>
                    <Label>Quantity</Label> 
                    <span style={{"float":"right"}}>{this.state.good_qty}</span>
                </GridColumn>
                </GridRow>
                <Divider/>
                <Label>Order Total</Label><span style={{"float":"right"}}>{this.state.order_total}</span>
                </Segment>
                
            </Segment>
            
                <GridRow style ={{"padding":"10px"}}>
                <GridColumn style={{"width":"70%"}}>
                <span>Delivery Address</span>
                <Segment>
                    {this.state.user.address},{this.state.user.city},{this.state.user.country}
                </Segment>
                </GridColumn>
                <GridColumn style={{"width":"30%"}}>
                <span>Phone no.</span>
                <Segment>
                    {this.state.user.phone_no}
                </Segment>
                </GridColumn>
                </GridRow><br></br>
                Credit and Debit Card Details
                <Segment>
                    <div >
                    <Input className="card-container" placeholder="Name on the card" name="number"
                    value={this.state.cardDetails.number}
                     onChange={this.inputchange}></Input>
                     < Cards />
                     </div>
                    <Input placeholder="Card number"></Input><br/>
                    <Input placeholder="Expiry MM"></Input>
                    <Input placeholder="Expiry YYYY"></Input><br/>
                    <Button>Save My Card</Button>
                </Segment>
            </ModalContent>
            <ModalActions>
            <Link to={`/customer/order/${this.state.good.id}`}> <Button negative>back</Button>   </Link>
            <Button positive onClick={()=>this.GetCardType(this.state.cardDetails.number)} >Proceed</Button>
            </ModalActions>
            </Modal>


            </div>
        )
    }
}
export default withCookies(payment)