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
    this.state={
      activeform:"home",
      open:false,
      display:"",
      itemsel:"",
      food3:this.props.food,
      form:true,
      goods: {},
      admin: false,
      customer:true,
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

  available=(name)=>{
    // const count = _(this.props.food).groupBy('name').values().map(
    //   (group)=>({...group[0],qty:group.length})
    // )
    // console.log(name);
    
    // console.log(count);
     
     
    return 0 
  } 

  componentDidMount(){
    if (this.state.currnt_user.usertype === "admin"){
      this.setState({ admin : true})
    }else if(this.state.currnt_user.usertype === "customer"){
      this.setState({ customer: true })
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
  // imagedisplay = food => {
  //   if(food.name === "Oreo"){
  //     return(Oreo)
  //   }else if(food.name === "Darkfantasy"){
  //     return (Darkfantasy)
  //   }else if(food.name === "Donuts"){
  //     return (Donuts)
  //   }else if(food.name === "Snickers"){
  //     return (Snickers)
  //   }else if(food.name === "Dairymilk"){
  //     return(Dairym)
  //   }else if(food.name === "petrol"){
  //     return(Petrol)
  //   }else if(food.name === "diseal"){
  //     return (Diseal)
  //   }else if(food.name === "onion"){
  //     return (Onion)
  //   }else if(food.name === "carrot"){
  //     return (Carrot)
  //   }else if(food.name === "water"){
  //     return (Water)
  //   }
  // }

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

  // display1(qwe){
  //   if(qwe === "food"){
  //     console.log("done");
      
      
  //     return (<Food user={this.props.user}></Food>)
  //   }else return(console.log("error")
  //   )
  // } 
// food2 = "foods";
  render() {  
  function displayform (formactive) {
      this.setState({ form : false ,display : formactive})
     }
    
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
          {this.props.food.map((food1,i) =>{
            if(i<3){
            return(
              <Grid.Column key={food1.id}>
              <Card onClick={this.closeConfigShow(true, false,food1)} style={{"height":"auto"}}>
                <Image src={this.imagedisplay(food1)} centered style = {{"height":"180px"}} wrapped ui={false} />
                <Card.Content>
                  <Card.Header>{food1.name}</Card.Header>
                  <Card.Meta>{food1.type}</Card.Meta>
                  <Label>Price : $ {food1.price} </Label><br/><br/>
                  
                  {!this.state.admin ?(<Button floated="right" >buy</Button>):""}
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
          {this.props.fuel.map((food1,i) =>{
            if(i<3){
            return(
              <Grid.Column key={food1.id}>
              <Card onClick={this.closeConfigShow(true, false,food1)} style={{"height":"auto"}}>
                <Image src={this.imagedisplay(food1)}  style = {{"height":"220px"}}  ui={false} />
                <Card.Content>
                  <Card.Header>{food1.name}</Card.Header>
                  <Card.Meta>{food1.type}</Card.Meta>
                  <Label>Price : $ {food1.price} </Label><br/><br/>
                  
                  {!this.state.admin ?(<Button floated="right" >buy</Button>):""}
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
          {this.props.grocery.map((food1,i) =>{
            if(i<3){
            return(
              <Grid.Column  key={food1.id}>
              <Card onClick={this.closeConfigShow(true, false,food1)} style={{"height":"auto"}}>
                <Image src={this.imagedisplay(food1)} centered bordered rounded style = {{"height":"220px"}}  ui={false} />
                <Card.Content>
                  <Card.Header>{food1.name}</Card.Header>
                  <Card.Meta>{food1.type}</Card.Meta>
                  <Label>Price : $ {food1.price} </Label><br/><br/>
                  
                  {!this.state.admin ?(<Button floated="right" >buy</Button>):""}
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
          {this.props.others.map((food1,i) =>{
            if(i<3){
            return(
              <Grid.Column  key={food1.id}>
              <Card onClick={this.closeConfigShow(true, false,food1)} style={{"height":"auto"}}>
              <Image rounded size="small" centered style={{"height":"220px"}} bordered src={this.imagedisplay(food1)} />
                <Card.Content>
                  <Card.Header>{food1.name}</Card.Header>
                  <Card.Meta>{food1.type}</Card.Meta>
                  <Label>Price : $ {food1.price} </Label><br/><br/>
                
                  {!this.state.admin ?(<Button color="blue" floated="right" >buy</Button>):""}
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
            return( <Food user={this.state.currnt_user.to1ken} list ={this.props.food} usertype={this.state.currnt_user.usertype}/> );
          case "fuel":   
            return( <Fuels user={this.state.currnt_user.to1ken} list ={this.props.fuel} usertype={this.state.currnt_user.usertype}/> );
          case "grocery":   
            return( <Grocery user={this.state.currnt_user.to1ken} list ={this.props.grocery} usertype={this.state.currnt_user.usertype}/> );
          case "others":   
            return( <Others user={this.state.currnt_user.to1ken} list ={this.props.others} usertype={this.state.currnt_user.usertype}/> );
          default:
              return console.log("error");
        }
      })()}
            </div>)}
        {this.state.open?(<div>
            <Segment raised >
            <Modal
            style={{ "width":"600px","height":"300px" , marginLeft : "25%", marginTop : "10%"}}
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
            <Label> Location : {this.state.itemsel.location} </Label>
            {/* <br/><Label>Available in : {this.state.itemsel.count}</Label><br/> */}
            </Grid.Column>
            </Grid>
            </Modal.Content>
            <Modal.Actions>
            {this.state.admin ?(<div>
              <Button negative onClick = {() => this.handleDelete( this.state.itemsel.id)}>DELETE</Button>
              <Link to={{pathname:`/seller/${this.state.currnt_user.user_id}/addgoods`}}><Button onClick= {()=> {this.updategoods()}} positive>Edit</Button></Link>
              </div>
            ): (<div>
              {/* <Button floated="right">Add to Cart</Button> */}
            {this.state.instock?(<Button 
              positive
              floated = "right">Order</Button> ):(<Button 
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
