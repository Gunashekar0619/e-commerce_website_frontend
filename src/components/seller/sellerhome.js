// import _ from 'lodash'
import React, { Component, createRef } from 'react'
import { withCookies} from 'react-cookie';
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
import { Link } from 'react-router-dom';
import {
  Grid,
  Button,
  Image,
  Icon,
  Label,
  // Modal,
  // Item,
  // Rail,
  // Header,
  // Rating,
  Segment,
  // Sticky,
  //Divider,
  // Card,
  // Container,
  Divider,
  // ItemMeta,
  // GridColumn,
} from 'semantic-ui-react'

class Food extends Component {
  constructor(props){
    super(props);
    this.props.cookies.remove('goods')
    this.state = {
      page : "seller",
      goods:[],
      l : 0,
      open: false,
        token: this.props.user,
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
        updatedList: [],
        plist:[],
        // modal1 :false,
        itemsel:"",
        instock:true,
        uprate:"",
        count:0,
        userid:this.props.userid,
        user:{}
    } 
  }
   

  contextRef = createRef()

  handleRate = (e, { rating, maxRating }) =>{
    this.setState({ uprate :{rating, maxRating}})    
    fetch(`http://127.0.0.1:8000/api/Goods/${this.state.itemsel.id}/rate_goods/`,{
        method: 'POST',
        headers: {
            'Content-Type':'application/json',
            'Authorization' : `Token ${this.props.user}`
        },
        body: JSON.stringify({stars : rating })
        }).then( resp => this.getDetails())
        .catch(error => console.log(error))    
  }

  getDetails = () => {
    fetch(`http://127.0.0.1:8000/api/Goods/${this.state.itemsel.id}/`,{
        method: 'GET',
        headers: {
            'Content-Type':'application/json',
            
        }
        }).then( resp => resp.json())
        .then ( res => {this.setState({itemsel:res});
      console.log(this.state.itemsel);
      }
        )
        .catch(error => console.log(error))
}

componentDidMount= ()=>{


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
    case "Water":
      return (Water)
    default:
      break;
  }}


closeConfigShow = (closeOnEscape, closeOnDimmerClick,name) => () => {
  this.setState({ closeOnEscape, closeOnDimmerClick, open: true ,itemsel:name})  
}



stock = async (name)=>{  
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
}

close = () => this.setState({ open: false })

addgoods(){
  
  let response = {show: true,user:"seller"}
  this.props.cookies.set('goods',response)   
}
render() {
  let page1 = this.state.page
  console.log(page1);
  let arr = this.props.list  
  if(arr.length>this.state.l)
  {
    let ele = arr[this.state.l]
    this.setState({l : arr.length})
    this.setState({goods :[...this.state.goods,ele]})
  }  
  // const orderclicked =()=>{
  //   // console.log("ksgdf,ksjdgf");
  //   let done=<Order/>
  //   return done
  // }
    

  return (
    <div>
    <Label size="large" color = "brown" tag>Your Goods</Label>
    <Link to={{pathname:`/seller/${this.state.userid}/addgoods`}}><Button onClick={()=>this.addgoods()} primary floated="right" >ADD Goods</Button></Link>
    {/* <Button primary floated = "right" >Your Goods</Button> */}
    <Divider></Divider>
    <Segment >
      <Grid columns={2} centered >
        <Grid.Row >
          {this.props.list.length>0 ?
        this.props.list.map( food => {   
          return(                    
            <Grid.Column key={food.id}>
                <Segment size="small"  piled style={{"width":"450px","height":"auto"}} >
                <Grid columns='two'>
                <Grid.Column width={6}>
                  <Image rounded size="small" style={{"height":"90px"}} bordered src={this.imagedisplay(food.name)}/>
                </Grid.Column>      
                <Grid.Column width={9}> 
                <Link to={{pathname:`/product/${food.id}`,history:{page1}}}><h2>{food.name} </h2></Link>
                <Label>Price : $ {food.price} </Label><br/>
                <Label>Available Stock :  {food.stock} </Label><br/>
                <Divider/>
                <Link to={{pathname:`/product/${food.id}`,history:{page1}}}><Button primary floated='right' >
                  View Details
                  <Icon name='right chevron' />
                </Button></Link>
                </Grid.Column>
              </Grid>
            </Segment>
          <br/>
        </Grid.Column>)}):<span>- - No Items Added- -</span>}</Grid.Row>
      </Grid> 
    </Segment>
    <div>
          {/* <Route exact path = "/seller/addgoods" component={Addgoods} ></Route> */}
    </div>
    </div>
    )
  }
}

export default withCookies(Food);