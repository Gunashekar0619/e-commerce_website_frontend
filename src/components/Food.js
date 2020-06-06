// import _ from 'lodash'
import React, { Component, createRef } from 'react'
import { withCookies} from 'react-cookie';
import Darkfantasy from './images/darkfantasy-img.jpg';
import Oreo from './images/oreo.jpeg';
import Donuts from './images/donuts-img.jpg';
import Snickers from './images/snickers-img.jpg';
import Dairymilk from './images/dairymilk-img.jpeg';
import Order from './order'
// import Itemdisplay from './itemdisplay';
import {
  Grid,
  Button,
  Image,
  Icon,
  Label,
  Modal,
  // Item,
  // Rail,
Header,
Rating,
  Segment,
  // Sticky,
  //Divider,
  // Card,
  Container,
  Divider,
  // ItemMeta,
  // GridColumn,
} from 'semantic-ui-react'

// const listfood = props => {
//   <div key = this.props.
// }
//const Placeholder = () => <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
// const newt = this.props.cookies.get('mr_user')
// function Orderclicked(props){
//   console.log("kajf");
  
//   return(<div>

//   </div>)
// }

class Food extends Component {
  state = {
    open: false,
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
      plist:[],
      // modal1 :false,
      itemsel:"",
      instock:true,
      uprate:"",
  }    


  contextRef = createRef()

  handleRate = (e, { rating, maxRating }) =>{
    this.setState({ uprate :{rating, maxRating}})    
    // console.log(this.state.itemsel.id);
    // console.log(this.props.user);
    // console.log("1st"+rating);
    fetch(`http://127.0.0.1:8000/api/Goods/${this.state.itemsel.id}/rate_goods/`,{
        method: 'POST',
        headers: {
            'Content-Type':'application/json',
            'Authorization' : `Token ${this.props.user}`
        },
        body: JSON.stringify({stars : rating })
        }).then( resp => this.getDetails())
        // .then(res => {
        //   // console.log("res1"+ res.result.stars);        
        //   this.setState({itemsel:{avg_ratings:res.result.stars}})
        //   // console.log("res 2"+this.state.itemsel.avg_ratings);
        //   this.getDetails()
        // })
        .catch(error => console.log(error))    
  }

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
      }
        )
        .catch(error => console.log(error))
}
imagedisplay = food => {
  if(food === "oreo"){
    return(Oreo)
  }else if(food === "Darkfantasy"){
    return (Darkfantasy)
  }else if(food === "Donuts"){
    return (Donuts)
  }else if(food === "Snickers"){
    return (Snickers)
  }else if(food === "Dairymilk"){
    return(Dairymilk)
  }else {let r = this.state.itemsel.name
  return(r) } 
}


// available=(name)=>{
//   const count = _(this.props.food).groupBy('name').values().map(
// //     (group)=>({...group[0],
// //       qty:group.length})
// //   )
   
//    console.log(count);
   
//   return 0 
//  } 
closeConfigShow = (closeOnEscape, closeOnDimmerClick,name) => () => {
  this.setState({ closeOnEscape, closeOnDimmerClick, open: true ,itemsel:name})
  console.log(this.itemsel);
  
}

close = () => this.setState({ open: false })

componentDidMount(){
  
}
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
        <Segment textAlign="center">
           <Label attached="top left" size="big" as='a' color='teal' ribbon>
                Foods
               </Label> <span ><Label size="large" pointing='below'>Available Food</Label></span>
            {!this.state.open ? (<Segment raised >
                  <Grid columns={2} centered divided>
                    <Grid.Row>
                        { this.props.list.map(food => {   
                            return(                    
                            <Grid.Column key={food.id}>
                              <Segment size="small" onClick={this.closeConfigShow(true, false,food)} piled style={{"width":"450px","height":"140px"}} >
                              <Grid columns='two'>
                              <Grid.Column width={6}>
                                  <Image rounded size="small" style={{"height":"90px"}} bordered src={this.imagedisplay(food.name)}/>
                              </Grid.Column>      
                              <Grid.Column width={9}> 
                                <h2>{food.name} </h2>
                                <Label>Price : $ {food.price} </Label><br/>
                                <Button primary onClick={this.closeConfigShow(true, false,food)} floated='right'>
                                        Order
                                      <Icon name='right chevron' />
                                      </Button>
                                      <Label>Available Stock : </Label>
                               </Grid.Column>
                                </Grid>
                              </Segment>
                              <Divider/>
                            </Grid.Column>)
                         })}</Grid.Row>
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
            <Image rounded size="small" style={{"height":"90px"}} bordered src={this.imagedisplay(this.state.itemsel.name)} />
            </Grid.Column>
            <Grid.Column>
            <Header>{this.state.itemsel.name}</Header>
            <Label>Type : {this.state.itemsel.type}</Label><br/>
            <Label size="large"> Price : ${this.state.itemsel.price}</Label><br/>
            <Label><Rating icon='star' defaultRating={this.state.itemsel.avg_ratings} onRate={this.handleRate} maxRating={5} ></Rating></Label>
            <Label>{this.state.itemsel.no_of_ratings}&nbsp; Ratings</Label>
            <br/><Label>Available in :</Label><Label> loading........</Label><br/>
            {this.state.instock?(<Button onClick={orderclicked}
              positive
              floated = "right">Order</Button> ):(<Button onClick={orderclicked}
                basic color='red'
              floated = "right">Out of Stock</Button> )}
            
            <Button floated="right">Add to Cart</Button>
            </Grid.Column>
            </Grid>
            </Modal.Content>
        </Modal>
        </Segment>
        </div>)} 
          </Segment>
          
        
      </Container>
    )
  }
}

export default withCookies(Food);