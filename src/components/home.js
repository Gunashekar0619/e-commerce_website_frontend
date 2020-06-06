import React, { Component } from 'react'
// import _ from 'lodash'
import Darkfantasy from './images/darkfantasy-img.jpg';
import Oreo from './images/oreo.jpeg';
import Donuts from './images/donuts-img.jpg';
import Snickers from './images/snickers-img.jpg';
import Dairym from './images/dairymilk-img.jpeg';
import Diseal from './images/diseal-img.jpg'
import Petrol from './images/petrol-img.jpg';
import Onion from './images/onion-img.jpg';
import Carrot from './images/carrot.jpg';
import Water from './images/bisleri500ml-img.png'
import { Segment, Grid, Card, Image, Button,Label, Container } from 'semantic-ui-react'
// import Food from './Food';
// import Others from './others';
// import Fuels from './Fuels';
// import Grocery from './grocery';
// import Home from './home'

export default class home extends Component {
  state={
    activeform:"home"
    
  }
  

  available=(name)=>{
    // const count = _(this.props.food).groupBy('name').values().map(
    //   (group)=>({...group[0],qty:group.length})
    // )
    // console.log(name);
    
    // console.log(count);
     
     
    return 0 
  } 

  imagedisplay = food => {
    if(food.name === "oreo"){
      return(Oreo)
    }else if(food.name === "Darkfantasy"){
      return (Darkfantasy)
    }else if(food.name === "Donuts"){
      return (Donuts)
    }else if(food.name === "Snickers"){
      return (Snickers)
    }else if(food.name === "Dairymilk"){
      return(Dairym)
    }else if(food.name === "petrol"){
      return(Petrol)
    }else if(food.name === "diseal"){
      return (Diseal)
    }else if(food.name === "onion"){
      return (Onion)
    }else if(food.name === "carrot"){
      return (Carrot)
    }else if(food.name === "water"){
      return (Water)
    }
  }

  

  render() {
    
    return (
      <Container>
        <Segment ><div><Label size="big" as='a' color='teal' ribbon >
          Foods
        </Label>
        <Button floated="right" name="food" content='More'  icon='right arrow' labelPosition='right' >
        </Button>
          </div>
        <Segment size="small" >
          <Grid columns="equal" divided>
          {this.props.food.map((food1,i) =>{
            if(i<3){
            return(
              <Grid.Column key={food1.id}>
              <Card>
                <Image src={this.imagedisplay(food1)}  style = {{"height":"170px"}} wrapped ui={false} />
                <Card.Content>
                  <Card.Header>{food1.name}</Card.Header>
                  <Card.Meta>Joined in 2016</Card.Meta>
                  <Label>Price : $ {food1.price} </Label><br/><br/>
                  <Label>Available Stock : {this.available(food1.name)}</Label>
                  <Button floated="right" >buy</Button>
                </Card.Content>
                <Card.Content extra>
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
        <Button floated="right" content='More' icon='right arrow' labelPosition='right' />
          </div>
        <Segment size="small" >
          <Grid columns="equal" divided>
          {this.props.fuel.map((food1,i) =>{
            if(i<3){
            return(
              <Grid.Column key={food1.id}>
              <Card>
                <Image src={this.imagedisplay(food1)}  style = {{"height":"170px"}} wrapped ui={false} />
                <Card.Content>
                  <Card.Header>{food1.name}</Card.Header>
                  <Card.Meta>Joined in 2016</Card.Meta>
                  <Label>Price : $ {food1.price} </Label><br/><br/>
                  <Label>Available Stock : {this.available(food1.name)}</Label>
                  <Button floated="right" >buy</Button>
                </Card.Content>
                <Card.Content extra>
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
        <Button floated="right" content='More' icon='right arrow' labelPosition='right' />
          </div>
        <Segment size="small" >
          <Grid columns="equal" divided>
          {this.props.grocery.map((food1,i) =>{
            if(i<3){
            return(
              <Grid.Column  key={food1.id}>
              <Card>
                <Image src={this.imagedisplay(food1)}  style = {{"height":"170px"}} wrapped ui={false} />
                <Card.Content>
                  <Card.Header>{food1.name}</Card.Header>
                  <Card.Meta>Joined in 2016</Card.Meta>
                  <Label>Price : $ {food1.price} </Label><br/><br/>
                  <Label>Available Stock : {this.available(food1.name)}</Label>
                  <Button floated="right" >buy</Button>
                </Card.Content>
                <Card.Content extra>
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
        <Button floated="right" content='More' icon='right arrow' labelPosition='right' />
          </div>
        <Segment size="small" >
          <Grid columns="equal" divided>
          {this.props.others.map((food1,i) =>{
            if(i<3){
            return(
              <Grid.Column  key={food1.id}>
              <Card>
                <Image src={this.imagedisplay(food1)}  style = {{"height":"170px"}} wrapped ui={false} />
                <Card.Content>
                  <Card.Header>{food1.name}</Card.Header>
                  <Card.Meta>Joined in 2016</Card.Meta>
                  <Label>Price : $ {food1.price} </Label><br/><br/>
                  <Label>Available Stock : {this.available(food1.name)}</Label>
                  <Button color="blue" floated="right" >buy</Button>
                </Card.Content>
                <Card.Content extra>
                </Card.Content>
              </Card>
             
              </Grid.Column>
            )}else return("")})
          }  
        </Grid>
        </Segment>
        </Segment>
        </Container>
      
    )
  }
}
