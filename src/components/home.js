import React, { Component } from 'react'

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
import Food from './Food';
import Others from './others';
import Fuels from './Fuels';
import Grocery from './grocery';
import { Link } from 'react-router-dom';
// import Home from './home';
// import Itemdisplay from './itemdisplay'
import { withCookies } from 'react-cookie';
import { Segment, Grid, Card, Image, Button,Label,Icon, Header,Modal,Rating ,Container } from 'semantic-ui-react'

export default  withCookies (class home extends Component {
  constructor (props){
    super(props);
    const token = this.props.cookies.get('mr_user')
    const usertype = this.props.usertype
    const goods= {
      food : this.props.food,
      fuel : this.props.fuel,
      grocery: this.props.grocery,
      others: this.props.others,
    }
    console.log(goods);
    this.state={
      activeform:"home",
      open:false,
      display:"",
      itemsel:"",
      form:true,
      goods: goods,
      admin: false,
      customer:true,
      nearby:{
        food:this.props.food,
        fuel:this.props.fuel,
        grocery:this.props.grocery,
        others:this.props.others
      },
      currnt_user:{
        usertype : usertype,
        to1ken : token.token,
        user_id : token.user_id,
        username : token.username}
    }
  }
  
  closeConfigShow = (closeOnEscape, closeOnDimmerClick,name) => () => {
    this.setState({ closeOnEscape, closeOnDimmerClick, open: true ,itemsel:name})    
  }
  close = () => this.setState({ open: false })

  componentDidMount(){
    if (this.state.currnt_user.usertype === "admin"){
      this.setState({ admin : true})
    }else if(this.state.currnt_user.usertype === "customer"){
      this.setState({ customer: true })
      
    console.log(this.state.goods);
    let FoodNear = this.state.goods.food
    let FuelNear = this.state.goods.fuel
    let GroceryNear = this.state.goods.grocery
    let OtherNear = this.state.goods.others
    console.log(FoodNear);

    this.state.nearby.food = []
    FoodNear.map(item => {
      if(this.props.userDetails.pincode === item.pincode){
        
        this.state.nearby.food.push(item)
      }
    })

    this.state.nearby.fuel =[]
    FuelNear.map(item => {
      if(this.props.userDetails.pincode === item.pincode){
        this.state.nearby.fuel.push(item)
      }
    })

    this.state.nearby.grocery =[]
    GroceryNear.map(item => {
      if(this.props.userDetails.pincode === item.pincode){
        this.state.nearby.grocery.push(item)
      }
    })

    this.state.nearby.others =[]
    OtherNear.map(item => {
      if(this.props.userDetails.pincode === item.pincode){
        this.state.nearby.others.push(item)
      }
    })
    }
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


  updategoods() {
    let response = {show : false , product : this.state.itemsel, user : "admin"}
    this.props.cookies.set('goods',response) 
  }
  imagedisplay = food =>{
    switch (food.name) {
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
  getDetails = () => {
    fetch(`http://127.0.0.1:8000/api/Goods/${this.state.itemsel.id}/`,{
      method: 'GET',
      headers: {
        'Content-Type':'application/json',
        'Authorization' : `Token ${this.props.user}`
      }
      }).then( resp => resp.json())
      .then ( res => {this.setState({itemsel:res});
      console.log(this.state.itemsel);
    })
    .catch(error => console.log(error))
  }

  reload = ()=>{
     window.location.reload(true)
  }

  render() {  
  function displayform (formactive) {
      this.setState({ form : false ,display : formactive})
     }
     console.log(this.state.goods);
    //  console.log(this.props.food);
    const { open, closeOnEscape, closeOnDimmerClick } = this.state
    return ( <Container>
    {this.state.form?( <Container>
       <Segment ><div><Label size="big" as='a' color='teal' ribbon >
          Foods
        </Label>
        <Button floated="right" name="food" onClick={displayform.bind(this,"food")} content='More'  icon='right arrow' labelPosition='right' >
        </Button>
          </div>
        <Segment size="small" >
          <Grid columns="equal" divided>
          {this.state.nearby.food.map((food1,i) =>{
            if(i<3){
            return(
              <Grid.Column key={food1.id}>
              <Card onClick={this.closeConfigShow(true, false,food1)} style={{"height":"auto"}}>
                <Image src={this.imagedisplay(food1)} centered style = {{"height":"180px"}} wrapped ui={false} />
                <Card.Content>
                  <Card.Header>{food1.name}</Card.Header>
                  <Card.Meta>{food1.type}</Card.Meta>
                  <Label style={{position:"absolute",right:"10px",bottom:"80px"}}>Price : $ {food1.price} </Label><br></br>
                  <Button primary onClick={this.closeConfigShow(true, false,food1)} >Product Details</Button>
                  {!this.state.admin ?(<Link to={{pathname:`/customer/order/${food1.id}`}} ><Button positive floated="right" >buy</Button></Link>):""}
                </Card.Content>
              </Card>
              </Grid.Column>
            )}else{return("")}})
          }  
        </Grid>
        </Segment>
        </Segment>
        <Segment ><div><Label size="big" as='a' color='teal' ribbon >
          Fuel
        </Label>
        <Button floated="right" onClick={displayform.bind(this,"fuel")} content='More' icon='right arrow' labelPosition='right' />
          </div>
        <Segment size="small" >
          <Grid columns="equal" divided>
          {this.state.nearby.fuel.map((food1,i) =>{
            if(i<3){
            return(
              <Grid.Column key={food1.id}>
              <Card onClick={this.closeConfigShow(true, false,food1)} style={{"height":"auto"}}>
                <Image src={this.imagedisplay(food1)}  style = {{"height":"220px"}}  ui={false} />
                <Card.Content>
                  <Card.Header>{food1.name}</Card.Header>
                  <Card.Meta>{food1.type}</Card.Meta>
                  <Label style={{position:"absolute",right:"10px",bottom:"80px"}}>Price : $ {food1.price} </Label><br></br>
                  <Button primary onClick={this.closeConfigShow(true, false,food1)} >Product Details</Button>
                  {!this.state.admin ?(<Link to={{pathname:`/customer/order/${food1.id}`}} ><Button positive floated="right" >buy</Button></Link>):""}
                </Card.Content>
              </Card>
              </Grid.Column>
            )}else{return("")}})
          }
        </Grid>
        </Segment>
        </Segment>
        <Segment ><div><Label size="big" as='a' color='teal' ribbon >
          Grocerys
        </Label>
        <Button floated="right" onClick={displayform.bind(this,"grocery")} content='More' icon='right arrow' labelPosition='right' />
          </div>
        <Segment size="small" >
          <Grid columns="equal" divided>
          {this.state.nearby.grocery.map((food1,i) =>{
            if(i<3){
            return(
              <Grid.Column  key={food1.id}>
              <Card onClick={this.closeConfigShow(true, false,food1)} style={{"height":"auto"}}>
                <Image src={this.imagedisplay(food1)} centered bordered rounded style = {{"height":"220px"}}  ui={false} />
                <Card.Content>
                  <Card.Header>{food1.name}</Card.Header>
                  <Card.Meta>{food1.type}</Card.Meta>
                  <Label style={{position:"absolute",right:"10px",bottom:"80px"}}>Price : $ {food1.price} </Label><br></br>
                  <Button primary onClick={this.closeConfigShow(true, false,food1)}>Product Details</Button>
                  {!this.state.admin ?(<Link to={{pathname:`/customer/order/${food1.id}`}} ><Button positive floated="right" >buy</Button></Link>):""}
                </Card.Content>
              </Card>
              </Grid.Column>
            )}else return("")})
          }  
        </Grid>
        </Segment>
        </Segment>
        <Segment ><div><Label size="big" as='a' color='teal' ribbon >
          Others
        </Label>
        <Button floated="right" onClick={displayform.bind(this,"others")} content='More' icon='right arrow' labelPosition='right' />
          </div>
        <Segment size="small" >
          <Grid columns="equal" divided>
          {this.state.nearby.others.map((food1,i) =>{
            if(i<3){
            return(
              <Grid.Column  key={food1.id}>
              <Card onClick={this.closeConfigShow(true, false,food1)} style={{"height":"auto"}}>
              <Image rounded size="small" centered style={{"height":"220px"}} bordered src={this.imagedisplay(food1)} />
                <Card.Content>
                  <Card.Header>{food1.name}</Card.Header>
                  <Card.Meta>{food1.type}</Card.Meta>
                  <Label style={{position:"absolute",right:"10px",bottom:"80px"}}>Price : $ {food1.price} </Label><br></br>
                  <Button primary onClick={this.closeConfigShow(true, false,food1)}>Product Details</Button>
                  {!this.state.admin ?(<Link to={{pathname:`/customer/order/${food1.id}`}} ><Button positive floated="right" >buy</Button></Link>):""}
                </Card.Content>
              </Card>
              </Grid.Column>
            )}else return("")})
          }  
        </Grid>
        </Segment>
        </Segment>
        </Container>):(<div>
        {this.state.currnt_user.usertype === "customer" ?<Button circular onClick={this.reload}>
        <Icon name='arrow alternate circle left outline' size='large' /> Back
        </Button>:""}
        {(() => { 
        switch (this.state.display) {
          case "food":               
            return( <Food user={this.state.currnt_user.to1ken} userDetails={this.props.userDetails} list ={this.props.food} usertype={this.state.currnt_user.usertype}/> );
          case "fuel":   
            return( <Fuels user={this.state.currnt_user.to1ken} userDetails={this.props.userDetails} list ={this.props.fuel} usertype={this.state.currnt_user.usertype}/> );
          case "grocery":   
            return( <Grocery user={this.state.currnt_user.to1ken} userDetails={this.props.userDetails} list ={this.props.grocery} usertype={this.state.currnt_user.usertype}/> );
          case "others":   
            return( <Others user={this.state.currnt_user.to1ken} userDetails={this.props.userDetails} list ={this.props.others} usertype={this.state.currnt_user.usertype}/> );
          default:
              return console.log("error");
        }
      })()}
            </div>)}
        {this.state.open?(<div>
            <Segment raised >
            <Modal
            style={{ "width":"600px","height":"auto" , marginLeft : "25%", marginTop : "10%"}}
          open={open}
          closeOnEscape={closeOnEscape}
          closeOnDimmerClick={closeOnDimmerClick}
          onClose={this.close}
        >
          <Modal.Header>Product details
            <Button style={{position:"absolute",right:"5px",top:"15px"}} onClick={this.close}>Back</Button>
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
            <Label> Location : {this.state.itemsel.location} </Label><br/>
            <Label> In Stock : {this.state.itemsel.stock} </Label>
            {/* <br/><Label>Available in : {this.state.itemsel.count}</Label><br/> */}
            </Grid.Column>
            </Grid>
            </Modal.Content>
            <Modal.Actions style={{padding:"5px"}}>
            {this.state.admin ?(<div>
              <Button negative onClick = {() => this.handleDelete( this.state.itemsel.id)}>DELETE</Button>
              <Link to={{pathname:`/seller/${this.state.currnt_user.user_id}/addgoods`}}><Button onClick= {()=> {this.updategoods()}} positive>Edit</Button></Link>
              </div>
            ): (<div>
            {this.state.itemsel.stock ?(<Button.Group>
                <Button negative onClick={this.close}>Cancel</Button>
                <Button.Or />
                <Link to={{pathname:`/customer/order/${this.state.itemsel.id}`}} ><Button positive>Order</Button></Link>
              </Button.Group>):(<Button 
                basic color='red'
              floated = "right">Out of Stock</Button> )}</div>)}
            
            
            </Modal.Actions>
        </Modal>
        </Segment>
        </div>):""}
        {/* {displayform()} */}
        </Container>
    )
  }
})
