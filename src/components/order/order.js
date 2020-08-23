import React, { Component } from 'react'
import { Modal, ModalHeader, ModalContent, ModalActions, Grid,Image,Label,Rating, Button, Segment,TextArea, Container, Input } from 'semantic-ui-react';
import Oreo from '../images/oreo.jpeg'
import Donuts from '../images/donuts-img.jpg';
import Snickers from '../images/snickers-img.jpg';
import Dairym from '../images/dairymilk-img.jpeg';
import Diseal from '../images/diseal-img.jpg'
import Petrol from '../images/petrol-img.jpg';
import Onion from '../images/onion-img.jpg';
import Carrot from '../images/carrot.jpg';
import Water from '../images/bisleri500ml-img.png'; 
import Darkfantasy from '../images/darkfantasy-img.jpg';
import { Link } from 'react-router-dom';

export default class Order extends Component {
    constructor(props){
        super(props)
        this.state ={
            goods:"",
            quantity: 0
        }
    }
    componentDidMount = () =>{
        const { match : { params } } = this.props;
        console.log(params.id);
        fetch(`http://127.0.0.1:8000/api/Goods/${params.id}/`,{
        method: 'GET',
        headers: {
            'Content-Type':'application/json',
        }
        }).then( resp => resp.json())
        .then ( res => {this.setState({goods:res});
            console.log(this.state.goods);
      }
        )
        .catch(error => console.log(error))
    }

    imagedisplay = food =>{
        switch (food) {
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
          case "petrol":
            return(Petrol)
          case "diseal":
            return (Diseal)
          case "onion":
            return (Onion)
          case "carrot":
            return (Carrot)
          case "water":
            return (Water)
          default:
            break;
        }}


    render() {
        return (
            <Modal open style = {{marginLeft : "20%", marginTop : "10%"}}>
                <ModalHeader>
                    Order
                </ModalHeader>
                <ModalContent>
                <Grid columns = {2}>
              <Grid.Column width="6">
                <Image style={{"height":"90px"}} src={this.imagedisplay(this.state.goods.name)}></Image>
              </Grid.Column>
              <Grid.Column>
                <Label>Name</Label><span>{this.state.goods.name}</span><br/>
                <Label>Type : {this.state.goods.type}</Label><br/>
                <Label size="large"> Price : ${this.state.goods.price}</Label><br/>
                <Label><Rating icon='star' defaultRating={this.state.goods.avg_ratings} onRate={this.handleRate} maxRating={5} ></Rating></Label>
                <Label>{this.state.goods.no_of_ratings}&nbsp; Ratings</Label>
                <br/><Label>Available in : {this.state.goods.stock}</Label><br/>
                <div ><Label>Quantity </Label>
                {this.state.quantity > 0 ?
                <Button onClick={()=>{this.setState({quantity:this.state.quantity - 1})}} icon='minus' size='mini'></Button> :
                <Button disabled onClick={()=>{this.setState({quantity:this.state.quantity - 1})}} icon='minus' size='mini'></Button> }
                <Input style={{textAlign:"right"}} style={{width:"50px" ,height:"25px","border": "2px solid grey","borderRadius":" 5px" }} >
                    {this.state.quantity}
                </Input>
                {this.state.goods.stock > this.state.quantity ?
                <Button onClick={()=>{this.setState({quantity:this.state.quantity + 1})}} icon = 'plus' size='mini'></Button>:
                <Button disabled onClick={()=>{this.setState({quantity:this.state.quantity + 1})}} icon = 'plus' size='mini'></Button>}
                </div>              
              </Grid.Column>
            </Grid>
                </ModalContent>
                <ModalActions>
                 <Link to="/customer"><Button negative>Cancel</Button></Link>
                 {this.state.quantity >0 ?
                 <Link to={`/customer/purchase/${this.state.goods.id}/${this.state.quantity}`}><Button  positive>Proceed</Button></Link>:
                 <Button disabled positive>Proceed</Button>}
                </ModalActions>
            </Modal>
        )
    }
}
