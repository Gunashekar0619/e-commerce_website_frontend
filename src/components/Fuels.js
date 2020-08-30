import _ from 'lodash'
import React, { Component, createRef } from 'react'
import { withCookies} from 'react-cookie';
import Darkfantasy from './images/darkfantasy-img.jpg';
import Oreo from './images/oreo.jpeg';
import Donuts from './images/donuts-img.jpg';
import Snickers from './images/snickers-img.jpg';
import Dairym from './images/dairymilk-img.jpeg';
import Diseal from './images/diseal-img.jpg'
import Petrol from './images/petrol-img.jpg';
import Onion from './images/onion-img.jpg';
import Carrot from './images/carrot.jpg';
import Water from './images/bisleri500ml-img.png';
import Order from './order/order'
import { Link } from 'react-router-dom';
import {
  Modal,
  Header,
  Rating,
  Message,
  Grid,
  Button,
  Image,
  Icon,
  Label,
  // Item,
  // Rail,
  Ref,
  Segment,
  // Sticky,
  //Divider,
  // Card,
  Container,
  Divider,
} from 'semantic-ui-react'

// const listfood = props => {
//   <div key = this.props.
// }
//const Placeholder = () => <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
// const newt = this.props.cookies.get('mr_user')
class Food extends Component {
  state = {
    open:false,
      token: this.props.user,
      usertype : this.props.usertype,
      length: "",
      Item :{
        "id": "",
        "owner": "",
        "name": "",
        "type": "",
        "price": "",
        "comments": "",
        "no_of_ratings": "",
        "avg_ratings": ""
      },
      flist :[],
      itemsel:"",
      updatedList: [],
      count:0,
      allitems :true,
      nearItems :[]
  }    

  updategoods() {
    let response = {show : false , product : this.state.itemsel, user : "admin"}
    this.props.cookies.set('goods',response) 
  }

  handleDelete(id){
    // const { match : { params } ,history } = this.props;
    fetch(`http://127.0.0.1:8000/api/Goods/${id}/`,{
      method : "DELETE",
      headers : {
        'Content-Type':'application/json',}
    }).then( this.close())
    .catch(err => console.log(err)) 
  }

  stock = async (name)=>{
    // console.log("1 inside");
    
     return fetch(`http://127.0.0.1:8000/api/Goods/duplicate/?name=${name}`,{
      method : "Get",
      headers : {
        'Content-Type':'application/json',
        'Authorization' : `Token ${this.state.token}`
      }
    }).then( resp => resp.json() )
    .then(res => { 
      return res.count;
    });
      // this.setState({  count : res.count})})
    // console.log(count);
  }
  
  async componentWillMount(){

    const goods = _.uniqBy(this.props.list, 'name');
  
    for (const food of goods) {
      // get the count
      let count = await this.stock(food.name);
      // console.log(count);
      let stock = food.stock;
      count = count + stock ;
      food['count'] = count;
      // console.log(food);
      this.setState({updatedList:[...this.state.updatedList,food]})
    }
  } 


  contextRef = createRef()

  NearBY = () => {
    console.log(this.props.list);
    var products = this.props.list; 
    var nearItem =[]
    products.map(item => {
      if(this.props.userDetails.pincode === item.pincode){
        nearItem.push(item)
      }
    })
    this.state.nearItems = nearItem
    console.log(this.state.nearItems);
    var duplicate= Array.from(new Set(nearItem.map(s => s.name)))
      .map(name => {
        return nearItem.find(s => s.name === name)
      })
    console.log(duplicate );
    var updateDuplicate =[]
    this.setState({allitems : false})
  }

  AllItems = () =>{
    this.setState({allitems : true})
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
      case "Petrol":
        return(Petrol)
      case "Diseal":
        return (Diseal)
      case "Onion":
        return (Onion)
      case "Carrot":
        return (Carrot)
      case "water":
        return (Water)
      default:
        break;
    }}

  closeConfigShow = (closeOnEscape, closeOnDimmerClick,name) => () => {
    this.setState({ closeOnEscape, closeOnDimmerClick, open: true ,itemsel:name})
  }
 
  close = () => this.setState({ open: false })
  render() {
    // this.state.flist.map(item => {
    //   if (item.type=== "Food"){
    //     return (this.setState({plist:[...this.state.plist,item] }))
    //   }
    // })

    const orderclicked =()=>{
      console.log("ksgdf,ksjdgf");
      let done=<Order/>
      return done
    }
    const { open, closeOnEscape, closeOnDimmerClick } = this.state  
    return (
        <Container style={{"width":"1020px"}}>
          <Ref innerRef={this.contextRef}>
            <Segment raised >
            <Label size="big" as='a' color='teal' ribbon>Fuel</Label>
            {this.state.allitems ?
                <Label style={{marginLeft :"34%"}} size="large" pointing='below'>Goods in  Stock</Label> :
               <Label style={{marginLeft :"34%"}} size="large" pointing='below'>Goods Near BY </Label> }
               {this.state.usertype !== "admin" ? 
               <Button.Group floated="right">
                <Button primary onClick={()=>this.AllItems()}>All</Button>
                <Button.Or />
                <Button onClick={()=>this.NearBY()}  primary>Near by</Button>
              </Button.Group>:""}
                  {!this.state.open ? (
                  this.state.allitems ? <Segment raised >
                  {this.state.usertype !== "admin" ? 
                  <Message negative>
                    <Message.Header>Select NearBY to see the goods which is Available in your area</Message.Header>
                    <Button style={{position : "absolute",right : "6px",top : "5px"}} onClick={()=>this.NearBY()} primary>NearBY</Button>
                  </Message>:""}
                  <Grid columns={2} centered divided>
                    <Grid.Row >
                        { this.state.updatedList.map( food => {   
                            return(                    
                            <Grid.Column key={food.id}>
                              <Segment size="small" piled style={{"width":"450px","height":"auto"}} >
                              <Grid columns='two'>
                              <Grid.Column width={6}>
                                  <Image onClick={this.closeConfigShow(true, false,food)} rounded size="small" style={{"height":"90px"}} bordered src={this.imagedisplay(food.name)}/>
                              </Grid.Column>      
                              <Grid.Column width={9}> 
                                <h2>{food.name} </h2>
                                <Label>Price : $ {food.price} </Label><br/>
                               <Label>Available Stock :  {food.count} </Label><br/>
                            <Label>Location : {food.location}</Label>
                               {/* <Label><Rating icon='star' defaultRating={this.state.food.avg_ratings} onRate={this.handleRate} maxRating={5} ></Rating></Label> */}
                              {/* <Label>{this.state.itemsel.no_of_ratings}&nbsp; Ratings</Label>  */}
                               </Grid.Column>
                               
                                </Grid>
                                <Divider/>
                               {this.state.usertype === "admin" ? ( <div>
                                <Button onClick={this.closeConfigShow(true, false,food)} floated="right">Product Details</Button>
                                </div>): (<div>{food.pincode === this.props.userDetails.pincode ?
                              food.count > 0 ?(<Link to={{pathname:`/customer/order/${food.id}`}} ><Button 
                                positive
                                floated = "right">Order</Button></Link> ):(<Button 
                                  basic color='red'
                                floated = "right">Out of Stock</Button> ) :""}
                                <Button onClick={this.closeConfigShow(true, false,food)} floated="right">Product Details</Button></div>)}
                                <br/><br></br>
                              </Segment>
                              <Divider/>
                            </Grid.Column>)
                         })}</Grid.Row>
                </Grid> 
            </Segment> : <Segment raised >
                  <Grid columns={2} centered divided>
                    <Grid.Row >
                        { this.state.nearItems.map( food => {   
                            return(                    
                            <Grid.Column key={food.id}>
                              <Segment size="small" piled style={{"width":"450px","height":"auto"}} >
                              <Grid columns='two'>
                              <Grid.Column width={6}>
                                  <Image onClick={this.closeConfigShow(true, false,food)} rounded size="small" style={{"height":"90px"}} bordered src={this.imagedisplay(food.name)}/>
                              </Grid.Column>      
                              <Grid.Column width={9}> 
                                <h2>{food.name} </h2>
                                <Label>Price : $ {food.price} </Label><br/>
                               <Label>Available Stock :  {food.stock} </Label><br/>
                            <Label>Seller Name : {food.ownerName}</Label><br/>
                            <Label>Location : {food.location}</Label>
                               {/* <Label><Rating icon='star' defaultRating={this.state.food.avg_ratings} onRate={this.handleRate} maxRating={5} ></Rating></Label> */}
                              {/* <Label>{this.state.itemsel.no_of_ratings}&nbsp; Ratings</Label>  */}
                               </Grid.Column>
                               
                                </Grid>
                                <Divider/>
                               {this.state.usertype === "admin" ? ( <div>
                                <Button onClick={this.closeConfigShow(true, false,food)} floated="right">Product Details</Button>
                                </div>): (<div>
                              {food.stock > 0 ?(<Link to={{pathname:`/customer/order/${food.id}`}} ><Button 
                                positive
                                floated = "right">Order</Button></Link> ):(<Button 
                                  basic color='red'
                                floated = "right">Out of Stock</Button> )}
                                <Button onClick={this.closeConfigShow(true, false,food)} floated="right">Product Details</Button></div>)}
                                <br/><br></br>
                              </Segment>
                              <Divider/>
                            </Grid.Column>)
                         })}</Grid.Row>
                </Grid> 
            </Segment> ):(<div>
            <Segment raised >
            <Modal
            style={{ "width":"600px","height":"330px" , marginLeft : "25%", marginTop : "10%"}}
          open={open}
          closeOnEscape={closeOnEscape}
          closeOnDimmerClick={closeOnDimmerClick}
          onClose={this.close}
        >
          <Modal.Header>Product details
            <Button floated="right" onClick={this.close}>Back</Button>
          </Modal.Header>
          <Modal.Content>
              <Grid columns={2} style={{"bordercolor":"red"}}>
                <Grid.Column width={5}>     
            <Image rounded size="small" style={{"height":"100px"}} bordered src={this.imagedisplay(this.state.itemsel)} />
            </Grid.Column>
            <Grid.Column>
            <Header>{this.state.itemsel.name}</Header>
            <Label>Type : {this.state.itemsel.type}</Label><br/>
            <Label size="large"> Price : ${this.state.itemsel.price}</Label><br/>
            <Label><Rating icon='star' defaultRating={this.state.itemsel.avg_ratings} onRate={this.handleRate} maxRating={5} ></Rating></Label>
            <Label>{this.state.itemsel.no_of_ratings}&nbsp; Ratings</Label>
            <br/><Label>Available in : {this.state.itemsel.count}</Label><br/>
            <Label>Location : {this.state.itemsel.location}</Label>
            </Grid.Column>
            </Grid>
            </Modal.Content>
            <Modal.Actions>
            {this.state.usertype === "admin" ?(<div>
              <Button negative onClick = {() => this.handleDelete( this.state.itemsel.id)}>DELETE</Button>
              <Link to={{pathname:`/seller/${this.state.itemsel.id}/addgoods`}}><Button onClick= {()=> {this.updategoods()}} positive>Edit</Button></Link>
              </div>
            ): (<div>{this.state.itemsel.pincode === this.props.userDetails.pincode ?
              this.state.itemsel.stock ?(<Button style={{marginBottom:"10px"}}
                positive
                floated = "right">Order</Button> ):(<Button style={{marginBottom:"10px"}}
                  basic color='red'
                floated = "right">Out of Stock</Button> ) : <Message style={{textAlign:"center"}} warning> <Message.Header>This Product is not Available in your location</Message.Header> </Message>}</div>)}
              
            </Modal.Actions>
        </Modal>
        </Segment>
        </div>)} 
            </Segment>
          </Ref>
        
      </Container>
    )
  }
}

export default withCookies(Food);