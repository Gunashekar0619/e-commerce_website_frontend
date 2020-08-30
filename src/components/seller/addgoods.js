import React, { Component } from 'react'
import { Header, Button,Icon,  Container, Input, Form, Segment, Divider } from 'semantic-ui-react'
import Menubar from '../menu'
import { Link } from 'react-router-dom'
import { withCookies} from 'react-cookie';
import Response from "../response"
import user from '../admin/user';

class Goodsform extends Component {
  constructor(props){
    super(props)
    const form = this.props.cookies.get('goods')
    const user = this.props.cookies.get('mr_user')
    this.user(user.user_id,form.show)
    this.state = { 
    user_id:user.user_id,
    form : form.show,
    user : form.user,
    Modal :false,
    dispaly:"",
    product : {
              name :"",
              type :"" ,
              price:"",
              stock:"",
              owner:user.user_id,
              pincode:"",
              location:""
            }}
  }
  componentDidMount(){
  try{if(this.state.form){
    this.setState({form: true})
    console.log("error");
  }else {this.setState({form : false})
  let goods = this.props.cookies.get('goods')
  this.setState({product : goods.product})
  }
  }
  catch(error){
    console.log(error);
   }
  }
  user(user,form){
    if (form){
    fetch(`http://127.0.0.1:8000/api/userdetails/`,{
      method: 'post',
      headers: {
          'Content-Type':'application/json',
      },
      body: JSON.stringify({user_id : user })
      }).then( resp => resp.json())
      .then ( res => {let a = this.state.product;
        a.location = res.data.address;
        a.pincode = res.data.pincode
        this.setState({product:a})}
      )
      .catch(error => console.log(error))
   }}
  inputchanged = event =>{        
    let cred = this.state.product;
    cred[event.target.name] = event.target.value;
    this.setState({product: cred});
  }

  addproduct() {
  fetch('http://127.0.0.1:8000/api/Goods/',{
    method:'POST',
    headers: {'content-type':'application/json',
        // 'Authorization' : `Token ${this.state.token}`
    },
    body:JSON.stringify(this.state.product)
  }).then(resp => resp.json())
  .then(res => {console.log(res)
                this.setState({Modal : true , dispaly : "Product Added Successfully"})
                })
  .catch( err=> this.setState({Modal : true , dispaly : "Product not Added Successfully"}))
  }

  updateproduct(){
    fetch(`http://127.0.0.1:8000/api/Goods/${this.state.product.id}/`,{
    method:'PUT',
    headers: {'content-type':'application/json',
        // 'Authorization' : `Token ${this.state.token}`
    },
    body:JSON.stringify(this.state.product)
  }).then(resp => resp.json())
  .then(res => {console.log(res)
                this.setState({Modal : true , dispaly : "Product updated Successfully"})
                })
  .catch( err=> console.log(err))
  }

  
  render() {
    console.log(this.state.product);
    // const NameOptions = [
    //   { key: 'g', text: 'Oreo', value: 'Oreo' },
    //   { key: 'fo', text: 'Darkfantasy', value: 'Darkfantasy' },
    //   { key: 'fu', text: 'Donuts', value: 'Donuts' },
    //   { key: 'sn', text: 'Snickers', value: 'Snickers' },
    //   { key: 'da', text: 'Dairymilk', value: 'Dairymilk' },
    //   { key: 'pe', text: 'Petrol', value: 'Petrol' },
    //   { key: 'di', text: 'Diseal', value: 'Diseal' },
    //   { key: 'on', text: 'Onion', value: 'Onion' },
    //   { key: 'ca', text: 'Carrot', value: 'Carrot' },
    //   { key: 'wa', text: 'Water', value: 'Water' },
    // ]

    console.log(this.state.form);
    console.log(this.state.product);
    
    return (
      <Container>
        <Menubar present = {()=>this.actform} user = {this.state.user} active={this.state.activeform}/>
    <Segment  inverted><Header textAlign = "center">{this.state.form ? "Add Products" :"Update Goods"}</Header></Segment>
      <Segment><Form>
        <Link to= {`/${this.state.user}`}><Button circular><Icon size ="large" name = "arrow alternate circle left outline"/>Back</Button></Link><br/><br/><br/>
      <Form.Group widths='equal'>
      <Form.Field>
        <span>Product Name</span>
      <select className="ui selection" placeholder="name" name="name" onChange={this.inputchanged} value={this.state.product.name}>
        <optgroup disabled>
          <option>Select Name</option>
        </optgroup>
        <optgroup>
          <option value="Oreo">Oreo</option>
          <option value="Darkfantasy">Darkfantasy</option>
          <option value="Donuts">Donuts</option>
          <option value="Snickers">Snickers</option>
          <option value="Dairymilk">Dairymilk</option>
          <option value="Petrol">Petrol</option>
          <option value="Diseal">Diseal</option>
          <option value="Onion">Onion</option>
          <option value="Carrot">Carrot</option>
          <option value="Water">Water</option>
        </optgroup>
      </select></Form.Field>
      {/* <Form.Field
          name="name"
          control={Select}
          options={NameOptions}
          label={{ children: 'Product Name', htmlFor: 'form-select-control-gender' }}
          placeholder='Product Name'

          search
          onChange={this.inputchanged}
          value={this.state.product.name}
          searchInput={{ id: 'form-select-control-gender' }}
        /> */}
      </Form.Group>
      <Form.Field>
      <span>Product Type</span>
      <select className="ui selection " name="type" onChange={this.inputchanged} value={this.state.product.type}>
        <optgroup disabled>
          <option>Select Type </option>
        </optgroup>
        <optgroup>
          <option value="Grocery">Grocery</option>
          <option value="Food">Food</option>
          <option value="Fuel">Fuel</option>
          <option value="Other">Others</option>
        </optgroup>
      </select>
      </Form.Field>
      {/* <Form.Field
        name="type"
          control={Select}
          options={ [{ text: 'Gocery', value: 'grocery'},
                      { text: 'Food', value: 'food'},
                      { text: 'Fuel', value: 'fuel'},
                      { text: 'Others', value: 'others'}]}
          label={{ children: 'Good Type', htmlFor: 'form-select-control-gender' }}
          placeholder='Good Type'
          // value={this.state.product.type}
          search
          onChange={this.inputchanged}
          searchInput={{ id: 'form-select-control-gender' }}
        /> */}
      <Form.Group>
        
      <Form.Field
        name="price"
        id='form-input-control-price'
        control={Input}
        label='Price Rs.'
        placeholder='Price'
        value= {this.state.product.price}
        onChange={this.inputchanged}
      />
      <Form.Field 
        name = "stock"
        id='form-input-control-quantity'
        control={Input}
        label='Quantity (if grocery : 1kg = 1):'
        placeholder='Quantity' 
        value={this.state.product.stock}
        onChange={this.inputchanged}
      />
      </Form.Group>
      <Divider/>
      {this.state.form ?
      (<Button onClick={()=>this.addproduct()} positive>Add</Button >):(<Button onClick={()=>this.updateproduct()} positive>Update</Button>)
      }
      <Link to={`/${this.state.user}`}><Button negative>Cancel</Button></Link>
    </Form>
    </Segment>
    {this.state.Modal? <Response dispaly= {this.state.dispaly} user = {this.state.user}/>:""}
    </Container>
  )
    
  }
}

export default withCookies(Goodsform)
