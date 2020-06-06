//import _ from 'lodash'
import React, { Component, createRef } from 'react'
import { withCookies} from 'react-cookie';
// import Oreo from '../images/oreo-img.jpg';
import Darkfantasy from './images/darkfantasy-img.jpg';
import Oreo from './images/oreo.jpeg';
import Donuts from './images/donuts-img.jpg';
//import '../App.css'
//import Lays from '/images/lays-img.jpg';
import Snickers from './images/snickers-img.jpg';
import Dairym from './images/dairymilk-img.jpeg';
import {
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
      token: this.props.token,
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
      plist:[]      
  }    


componentDidMount(){
     console.log(this.props.list)
}
  contextRef = createRef()

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
  }
  
}

  render() {
    // this.state.flist.map(item => {
    //   if (item.type=== "Food"){
    //     return (this.setState({plist:[...this.state.plist,item] }))
    //   }
    // })

    return (
        <Container style={{"width":"1020px"}}>
          <Ref innerRef={this.contextRef}>
            <Segment raised textAlign="center">
             
            <Label size="big" as='a' color='teal' ribbon='left'>
          Grocery
        </Label>
                  <span ><Label size="large" pointing='below'>Available Food</Label></span>
                  <Container></Container>
                  <Grid columns={2} centered divided>
                    <Grid.Row>
                        { this.props.list.map(food => {   
                            return(                    
                            <Grid.Column  >
                              <Segment size="small" key={food.id} piled style={{"width":"470px","height":"140px"}} >
                              
                              <Grid columns='two'>
                              <Grid.Column width={6}>
                                  <Image rounded size="small" style={{"height":"90px"}} bordered src={this.imagedisplay(food)} />
                              </Grid.Column>      
                              <Grid.Column width={9}> 
                                <h2>{food.name} </h2>
                                <Label>Price : $ {food.price} </Label><br/>
                                <Button primary floated='right'>
                                        Order
                                      <Icon name='right chevron' />
                                      </Button>
                                <Label>Limited</Label>
                               
                               </Grid.Column>
                                </Grid>
                              </Segment>
                              <Divider/>
                            </Grid.Column>)                
                         })
                        }</Grid.Row>
                </Grid>
            </Segment>
          </Ref>
        
      </Container>
    )
  }
}

export default withCookies(Food);