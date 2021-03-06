//import _ from 'lodash'
import React, { Component, createRef } from 'react'
import { withCookies} from 'react-cookie';
// import Oreo from '../images/oreo-img.jpg';
// import Darkfantasy from './images/darkfantasy-img.jpg';
// import Oreo from './images/oreo.jpeg';
import Diseal from './images/diseal-img.jpg'
import Petrol from './images/petrol-img.jpg';
import Donuts from './images/donuts-img.jpg';
//import '../App.css'
//import Lays from '/images/lays-img.jpg';
import Snickers from './images/snickers-img.jpg';
import Dairym from './images/dairymilk-img.jpeg';
import Order from './order'
import {
  Modal,
  Header,
  Rating,
  
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
      plist:[] ,
      itemsel:""     
  }    


componentDidMount(){
   //  console.log(this.props.list)
}
  contextRef = createRef()

imagedisplay = food => {
  if(food.name === "petrol"){
    return(Petrol)
  }else if(food.name === "diseal"){
    return (Diseal)
  }else if(food.name === "Donuts"){
    return (Donuts)
  }else if(food.name === "Snickers"){
    return (Snickers)
  }else if(food.name === "Dairymilk"){
    return(Dairym)
  }
  
}
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
                  <span ><Label size="large" pointing='below'>Available Fuel</Label></span>
                  {!this.state.open ? (<Segment raised >                  
                  <Grid columns={2} centered divided>
                    <Grid.Row>
                        { this.props.list.map(food => {   
                            return(                    
                            <Grid.Column key={food.id} >
                              <Segment size="small" onClick={this.closeConfigShow(true, false,food)}  piled style={{"width":"450px","height":"140px"}} >
                              <Grid columns='two'>
                              <Grid.Column width={6}>
                                  <Image rounded size="small" style={{"height":"90px"}} bordered src={this.imagedisplay(food)} />
                              </Grid.Column>      
                              <Grid.Column width={9}> 
                                <h2>{food.name} </h2>
                                <Label>Price : $ {food.price} </Label><br/>
                                <Button primary onClick={this.closeConfigShow(true, false,food)} floated='right'>
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
                </Segment> ):(<div>
            <Segment raised >
            <Modal
            style={{"width":"600px","height":"500px"}}
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
            <Image rounded size="small" style={{"height":"90px"}} bordered src={this.imagedisplay(this.state.itemsel)} />
            </Grid.Column>
            <Grid.Column>
            <Header>{this.state.itemsel.name}</Header>
            <Label>Type : {this.state.itemsel.type}</Label><br/>
            <Label size="large"> Price : ${this.state.itemsel.price}</Label><br/>
            <Rating icon='star' defaultRating={this.state.itemsel.avg_ratings} maxRating={5} />
            <Button onClick={orderclicked}
              positive
              floated = "right">Order</Button> 
            <Button floated="right">Add to Cart</Button>
            </Grid.Column>
            </Grid>
            </Modal.Content>
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