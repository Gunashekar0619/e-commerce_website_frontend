import React from 'react';
import { Button, Image, Modal, Message, Grid, Label , Rating } from 'semantic-ui-react';
// import ModalExampleCloseConfig from './seller/addgoods';
// import axios from 'axios';
// import { Helmet } from 'react-helmet';
import Oreo from './images/oreo.jpeg'
import Donuts from './images/donuts-img.jpg';
import Snickers from './images/snickers-img.jpg';
import Dairym from './images/dairymilk-img.jpeg';
import Diseal from './images/diseal-img.jpg'
import Petrol from './images/petrol-img.jpg';
import Onion from './images/onion-img.jpg';
import Carrot from './images/carrot.jpg';
import Water from './images/bisleri500ml-img.png'; 
import Darkfantasy from './images/darkfantasy-img.jpg';
import { Link } from 'react-router-dom';
// import customer from './customer';
import { withCookies} from 'react-cookie';


class Productinfo extends React.Component {
  constructor(props) {
    super(props);
    this.props.cookies.remove('goods')
    const token = this.props.cookies.get('mr_user')
    this.state = {
       goods: {},
       pre_page:"",
       user_type:"",
       currnt_user:{
        to1ken : token.token,
        user_id : token.user_id,
        username : token.username}   
      };
    
    this.close = this.close.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.findtype(this.state.currnt_user.user_id)
  }

  componentDidMount(){
 
    const { match : { params } } = this.props;

    fetch(`http://127.0.0.1:8000/api/Goods/${params.foodid}/`,{
      method : "Get",
      headers : {
        'Content-Type':'application/json',}
    }).then(resp => resp.json())
    .then(res =>{
      this.setState({goods : res})
    })
    this.findtype(this.state.currnt_user.user_id)
  }
  findtype = token =>{
    fetch('http://127.0.0.1:8000/api/userdetails/',{
    method: 'POST',
    headers: {
        'Content-Type':'application/json',
        //'Authorization' : `Token ${token.token}`
    },
    body: JSON.stringify({ "user_id": token })
    }).then ( res => res.json())
    .then (res => {
      const d = res.data;
      this.setState({pre_page : d.type});
    })
    .catch(error => this.setState({erro1r : true}))
  }
  handleDelete(){
    const { match : { params } ,history } = this.props;
    fetch(`http://127.0.0.1:8000/api/Goods/${params.foodid}/`,{
      method : "DELETE",
      headers : {
        'Content-Type':'application/json',}
    }).then( history.push(`/${this.state.pre_page}`))
    .catch(err => console.log(err)) 
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

  close(){
    const { history} = this.props; ///match : praram
    return (history.push(`/${this.state.pre_page}`))
  }

  updategoods() {
    
    let response = {show : false , product : this.state.goods}
    this.props.cookies.set('goods',response) 
  }

  render() {
    console.log(this.state.pre_page);

   try {if (this.props.location.history.page1) {
     this.setState({pre_page : this.setState.location.history.page1})
   }}
   catch(error) {
     
   }
    
    return (
     <div>
        <Modal 
        style = {{"maxWidth":"50%", "marginLeft": "20%" ,"marginRight":"20%","maxHeight":"300px","minHeight":"300px","marginTop" : "10%" }}
        open>
           {this.state.erro1r ? (
                            <Message negative>
                               <Message.Header>Login Required </Message.Header>
                           </Message>
                    ): "" }
          <Modal.Header>
            Product Details
          </Modal.Header>
          <Modal.Content>
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
              </Grid.Column>
            </Grid>
          </Modal.Content>
          <Modal.Actions >
            <Link to={{pathname:`/seller/${this.state.currnt_user.user_id}/addgoods`}}><Button onClick= {()=> {this.updategoods()}} positive>Edit</Button></Link>
            <Button onClick = {()=>this.handleDelete()} negative>Delete</Button>
            <Link to= {`/${this.state.pre_page}`}> <Button onClick = {()=>this.close()} color="grey">Cancel</Button></Link>
            </Modal.Actions> 
        </Modal>
     </div>
     
    );
  }
}

export default withCookies(Productinfo);
