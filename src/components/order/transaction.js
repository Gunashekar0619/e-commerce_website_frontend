import React, { Component } from 'react'
import { withCookies } from 'react-cookie';
import { Modal, ModalHeader, ModalContent, ModalActions, Button,
   Card,Image, Grid, GridRow, GridColumn, Header, CardContent, Icon } from 'semantic-ui-react'
import Darkfantasy from '../images/darkfantasy-img.jpg';
import Oreo from '../images/oreo.jpeg';
import Donuts from '../images/donuts-img.jpg';
import Snickers from '../images/snickers-img.jpg';
import Dairym from '../images/dairymilk-img.jpeg';
import Diseal from '../images/diseal-img.jpg'
import Petrol from '../images/petrol-img.jpg';
import Onion from '../images/onion-img.jpg';
import Carrot from '../images/carrot.jpg';
import Water from '../images/bisleri500ml-img.png';

class transaction extends Component {
    constructor (props){
        super(props);
    const token = this.props.cookies.get('mr_user')
    
    this.state = {
        transactions : this.props.transactions,
        currnt_user:{
            to1ken : token.token,
            user_id : token.user_id,
            username : token.username}
        };  
    }

    imagedisplay = name =>{
        switch (name) {
          case "Oreo":
            return(Oreo)
          case "Darkfantasy":
            return (Darkfantasy)
          case "Donuts":
            return (Donuts)
          case "Snickers":
            return (Snickers)
          case "Dairymilk":
            return(Dairym)
          case "Petrol":
            return(Petrol)
          case "Diseal":
            return (Diseal)
          case "Onion":
            return (Onion)
          case "Carrot":
            return (Carrot)
          case "Water":
            return (Water)
          default:
            break;
        }}

    closeModal = () =>{
        console.log("close");
        this.props.closeHistory();
    }
    slno=0;
    render() {
      let a 
      
        return (
            <Modal open 
            style={{"marginLeft":"20%", marginTop: '5%'}}>
                <ModalHeader>Transactions <Button style={{"float":"right"}} onClick={()=>{this.closeModal()}}>Close</Button></ModalHeader>
                <ModalContent>
                {console.log(this.state.transactions)}
                {this.state.transactions.map(item=>{
                    return(
                <Card basic color={item.success ? "green" :"red"} style={{"width" : "100%"}} key = {item.id}>
                    <Card.Header style={{"backgroundColor": item.success ? "#e6f7ff":"#FAFAD2","padding":"4px"}}>
                        <div style = {{"float":"left"}}>
                        <span>ORDER PLACE</span><br/>
                        <span>{item.date} / {item.time}</span>
                        </div> 
                       
                        <div style={{"marginLeft":"40px","float":"left"}}>
                            <span>SHIP TO</span><br/>
                            <span>{item.user.username}</span>
                        </div>                       
                        <div  style={{"float":"right"}}>
                        <Icon  name="chevron down"></Icon>
                        <Icon  name="angle up"></Icon>
                        </div>  
                        <div style={{"float":"right"}}>
                        <span >Order  # </span>
                        <span>{item.transationid}</span><br></br>
                        <span>Total : </span>
                        <span>$ {item.total}</span>
                        
                        </div >
                        
                    </Card.Header>
                    
                    <CardContent>
                    
                    
                    <Grid width="100%">
                        <GridRow>
                            <GridColumn style={{"width":"25%"}}>
                            <Header style={{marginLeft:"10px"}}>Success</Header>
                            <Image src={this.imagedisplay("Oreo")} centered style = {{"marginLeft":"10px", "height":"auto","width":"100%"}}/>
                            </GridColumn>

                            <GridColumn style={{"width":"50%",paddingLeft:"30px"}}> 
                                <Header>{item.Goods}</Header>
                                <span>Sold By : </span> &nbsp;  <span>{item.seller}</span> <br/>
                                <span>Price : </span>  &nbsp;   <span>{item.price}</span> <br/>
                                <span>Quantity : </span> &nbsp; <span>{item.quantity}</span> <br/>
                            </GridColumn>

                            <GridColumn style={{"width":"25%"}}>
                                <div>
                                <Header style={{marginBottom :"0px",width :"100%",border:"1px solid"}} > 
                                  Payment Details 
                                  <Button style={{"position":"absolute",right:"0px"}} icon="angle up"></Button>
                                </Header>
                                <div>
                                  {a=item.cardNumber % 100000, 
                                    console.log(a)
                                  }
                                
                                  <span> *******{a} </span>
                                </div>
                                </div>
                                <Header style={{marginTop:"0px",border:"1px solid"}}> Delivery Address </Header>
                                <div>
                                  <span> {item.shipmentAddress.address},</span><br/>
                                  <span> {item.shipmentAddress.city},</span><br/>
                                  <span> {item.shipmentAddress.country}</span><br/>
                                <span> {item.phone_no}</span>
                                </div>
                            </GridColumn>
                        </GridRow>
                    </Grid>    
                    </CardContent>
                    
                </Card>
                )})}
              
                </ModalContent>
                <ModalActions>
                    <Button onClick={()=>{this.closeModal()}}>Close</Button>
                </ModalActions>
            </Modal>
        )
    }
}

export default withCookies(transaction)