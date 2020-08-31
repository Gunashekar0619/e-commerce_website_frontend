import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalActions, ModalContent,Popup, Segment, Input, Card, Header, Divider, GridColumn, GridRow, Label, Container, Table, TableHeaderCell, TableCell, Checkbox, Icon, TableBody, ItemGroup } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { withCookies } from 'react-cookie';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';


class payment extends Component {
    constructor(props){
        super(props);
        const cookies = this.props.cookies.get('mr_user') 
        this.props.cookies.remove('Order')
        this.state = {
            good_qty:"",
            good :"",
            order_total:"",
            user:"",
            newcard:"",
            cardList:true,
            cardEdit : false,
            table:false,
            listofcards:[],
            selectedCard:"",
            editCardDetails :  {            // selected to edit 
                Owner:cookies.user_id,
                id : "",
                cardNumber:"",
                expiry:"",
                cardName:"",
                cvc:"",
            },
            Ufocus:"",
            current_user: {
                username:cookies.username,
                user_id:cookies.user_id,
                email:cookies.email
              },
              focus:"",
            cardDetails:{
                Owner:cookies.user_id,
                cardNumber:"",
                expiry:"",
                cardName:"",
                cvc:"",
            },
            orderDetails:"",
        }
    }
    
    orderDetails = () =>{
        console.log(this.state.good);
        // console.log();
        // this.setState({orderDetails:{
        //     user_id : this.state.current_user.user_id,
        //     cardNumber : this.selectedCard.CardNumber,
        //     Goods :this.state.
        // }})
    }
    saveCard =()=> {
        console.log("kja");
        fetch('http://127.0.0.1:8000/api/creditcards/',{
        method: 'POST',
        headers: {
            'Content-Type':'application/json',
            //'Authorization' : `Token ${token.token}`
        },
        body: JSON.stringify(this.state.cardDetails)
        }).then ( res => res.json())
        .then (res => {
            const d = res;
            console.log(d);
            this.state.listofcards.push(d);
            window.location.reload();
            console.log(this.state.listofcards);
            this.setState({newcard : d}); 
            this.setState({cardList : true})
        })
        .catch(error => console.log(error))
    }

    closeAdd = () => {
        this.setState({cardList : true})
    }

    addCard=()=>{
        this.setState({cardList: false})
    }

    checked = (card) =>{
        console.log(card)
        this.setState({selectedCard :{CardNumber: card.CardNumber,CardName:card.CardName,cvc : card.cvc , expiry:card.expiry}})
        this.setState({table:true})
    }

    componentDidMount =()=>{
        function seller(id) {
            fetch(`http://127.0.0.1:8000/api/Goods/${params.id}/`,{
        method: 'GET',
        headers: {
            'Content-Type':'application/json',
        }
        }).then( resp => resp.json())
        .then ( res => {this.setState({good:res});
        this.setState({order_total:((res.price) * (params.qty))})
        
      }
        )
        .catch(error => console.log(error))
        }
        const {match :{params}} =this.props;
        this.setState({good_qty : params.qty})
        fetch(`http://127.0.0.1:8000/api/Goods/${params.id}/`,{
        method: 'GET',
        headers: {
            'Content-Type':'application/json',
        }
        }).then( resp => resp.json())
        .then ( res => {this.setState({good:res});
        this.setState({order_total:((res.price) * (params.qty))})
        
      }
        )
        .catch(error => console.log(error))

        

        fetch('http://127.0.0.1:8000/api/userdetails/',{
        method: 'POST',
        headers: {
            'Content-Type':'application/json',
            //'Authorization' : `Token ${token.token}`
        },
        body: JSON.stringify({ "user_id": this.state.current_user.user_id })
        }).then ( res => res.json())
        .then (res => {
            const d = res.data;
            this.setState({user : d}); 
        })
        .catch(error => this.setState({erro1r : true}))

        fetch('http://127.0.0.1:8000/api/creditcards/sad/',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({"user_id":this.state.current_user.user_id})
        }).then(res=>res.json())
            .then (res =>{
               this.setState({listofcards : res.data})
        })   
    }

    editClicked = id => { 
        this.setState({cardEdit : true })
        this.setState({cardList: false})
        console.log("edit");

        this.state.listofcards.map(card =>  {
            console.log(card);
            if(card.id === id){
                this.setState({editCardDetails:{
                    Owner:this.state.current_user.user_id,
                    cardNumber : card.CardNumber,
                    expiry: card.expiry,
                    cardName: card.CardName,
                    cvc: card.cvc,
                    id:card.id
                }})
            }
        })
        console.log(this.state.editCardDetails);
    }

    editCancel = () =>{
        this.setState({cardEdit :false})

    }

    updateClicked = id =>{
        fetch(`http://127.0.0.1:8000/api/creditcards/${id}/`,{
            method:'put',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify(this.state.editCardDetails)
        }).then(res=>res.json())
            .then (res =>{
                console.log("updated");
                this.setState({cardEdit : false})
                console.log(res)
                this.setState({cardList : true})
        })  
    }
    
    updateClose = () =>{
        this.setState({cardEdit : false })
        console.log("close");
        this.setState({cardList: true})
    }

    updatechange = event =>{
        let usdtl = this.state.editCardDetails;
        usdtl[event.target.name] = event.target.value;
        this.setState({editCardDetails: usdtl})
        console.log(usdtl);
    }

    deleteClicked = id => {
        fetch(`http://127.0.0.1:8000/api/creditcards/${id}/`,{
            method:'DELETE',
            headers:{
                'Content-Type':'application/json',
            },
        }).then (res =>{
            window.location.reload();
        })
    }

    updateInputFocus = (e) => {
        this.setState({Ufocus: e.target.name});
      }
    
    inputchange = event =>{
        let usdtl = this.state.cardDetails;
        usdtl[event.target.name] = event.target.value;
        this.setState({cardDetails: usdtl})
        console.log(usdtl);
    }
    handleInputFocus = (e) => {
        this.setState({focus: e.target.name});
    }

    OrderClicked = result =>{
        var TID= Math.floor(100000000000 + Math.random() * 900000000000);
        var product = { goods: this.state.good,
                    total: this.state.order_total,
                    Quantity: this.state.good_qty }
        var order = {user : this.state.user,
                     Product : product,
                    transactionid:TID   }
        var success = result
        var transactionData = {
            quantity: product.Quantity,
            phone_no:this.state.user.phone_no,
            user : this.state.current_user.user_id,
            cardNumber : this.state.selectedCard.CardNumber,
            Goods : this.state.good.name,
            price : this.state.good.price,
            shipmentAddress : this.state.user.address + ',' + this.state.user.city + ',' + this.state.user.country,
            seller : this.state.good.owner,
            transationid : TID,
            success : success,
            total : product.total,
        }
        console.log(transactionData);
        fetch('http://127.0.0.1:8000/api/ordered/',{
            method:'post',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify(transactionData)
        }).then (res =>{
            updategood()
        })
        var updatedStock = this.state.good.stock - this.state.good_qty
        var item = this.state.good
        item.stock = updatedStock;
        console.log(item);
        console.log(this.state.good_qty);
        console.log(updatedStock);
        function updategood(){
            if(success === true){
            fetch(`http://127.0.0.1:8000/api/Goods/${item.id}/`,{
            method:'put',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify(item)
        }).then (res =>{
            console.log(res);
        })
        }}
        this.props.cookies.set('Order',order)  
    
    }
    render() {
        console.log(this.state.editCardDetails);
        return (
            <div>
            <Modal open style={{marginLeft:"20%", marginTop:"5%",}}>
            <ModalHeader style={{ }}>
                Payment Block
            </ModalHeader>
            <ModalContent>
            <Segment>
                <Header>Order Details</Header>
                <Divider/>
                <Segment >
                <GridRow divided>
                <GridColumn style={{"width":"50%",paddingLeft:"10px",paddingRight:"10px"}} >
                <Label >Name</Label> <span style={{"float" :"right"}}>{this.state.good.name}</span><br></br>
                <Label >Location</Label> <span style={{"float":"right"}}>{this.state.good.location}</span>
                </GridColumn>
                
                <GridColumn style={{"width":"50%",paddingLeft:"10px",paddingRight:"10px"}}>
                    <Label>Price</Label> 
                    <span style={{"float":"right"}}>{this.state.good.price}</span><br/>
                    <Label>Quantity</Label> 
                    <span style={{"float":"right"}}>{this.state.good_qty}</span>
                </GridColumn>
                </GridRow>
                <Divider/>
                <Label>Order Total</Label><span style={{"float":"right"}}>{this.state.order_total}</span>
                </Segment>
                
            </Segment>
            
                <GridRow style ={{"padding":"10px"}}>
                <GridColumn style={{"width":"70%"}}>
                <span>Delivery Address</span>
                <Segment>
                    {this.state.user.address},{this.state.user.city},{this.state.user.country}
                </Segment>
                </GridColumn>
                <GridColumn style={{"width":"30%"}}>
                <span>Phone no.</span>
                <Segment>
                    {this.state.user.phone_no}
                </Segment>
                </GridColumn>
                </GridRow><br></br>
                Credit and Debit Card Details
                <Segment>
                    
                {this.state.cardList ? <div>
                    List of cards
                    <Table style={{"width":"fluid"}}>
                        <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>sl.no</Table.HeaderCell>
                            <Table.HeaderCell>CardNumber</Table.HeaderCell>
                            <Table.HeaderCell>Name on Card</Table.HeaderCell>
                            <Table.HeaderCell>Expiry</Table.HeaderCell>
                            <Table.HeaderCell>CVC</Table.HeaderCell>
                            <Table.HeaderCell></Table.HeaderCell>
                            <Table.HeaderCell></Table.HeaderCell>
                        </Table.Row>
                        </Table.Header>
                        <TableBody>
                        {this.state.listofcards.map(card => {
                            return(
                        <Table.Row key={card.id} disabled={this.state.table}>
                            <Table.Cell>{card.id}</Table.Cell>
                            <Table.Cell onClick={()=>this.checked(card)}>{card.CardNumber}</Table.Cell>
                            <Table.Cell>{card.CardName}</Table.Cell>
                            <Table.Cell>{card.expiry}</Table.Cell>
                            <Table.Cell>{card.cvc}</Table.Cell>
                            <Table.Cell><Icon onClick={()=>this.editClicked(card.id)} name ="edit"></Icon></Table.Cell>
                            <Table.Cell><Popup
                                on='click'
                                pinned
                                position='top center'
                                trigger={<Icon name = "trash alternate"></Icon>}>
                                <div style={{"width":"90px"}}>
                                    <span>Are you sure ?</span><br/>
                                    <Button primary float="right" onClick = {()=>this.deleteClicked(card.id)}>yes</Button>
                                </div></Popup>
                            </Table.Cell>
                        </Table.Row>)})}
                        </TableBody>
                    </Table>
                    
                    <Button onClick={this.addCard.bind()} disabled={this.state.table} positive>Add card</Button>
                    {this.state.table ? <div>
                    <Divider/>
                    < Cards
                        cvc={this.state.selectedCard.cvc}
                        expiry={this.state.selectedCard.expiry}
                        focused={""}
                        name={this.state.selectedCard.CardName}
                        number={this.state.selectedCard.CardNumber}
                     /> 
                    <Button positive onClick={()=>{this.setState({table:false})}}>Select other card </Button> </div>:""}
                    </div> :
                    this.state.cardEdit ? 
                    <GridRow>
                    <GridColumn style={{width:"60%",paddingLeft:"10%"}}>
                    
                    <Card style={{padding:"10px",width:"80%"}} >
                    <span > Edit Card</span>
                    <Input className="card-container" placeholder="Card Number" name="cardNumber"
                     style={{"margin":"10px"}}
                    max = {16} type="number"
                    value={this.state.editCardDetails.cardNumber}
                    onChange={this.updatechange}
                    onFocus={this.updateInputFocus}
                     ></Input>

                    <Input placeholder="Name on the Card" 
                    name="cardName" style={{"margin":"10px"}}
                    value={this.state.editCardDetails.cardName}
                    type="text"
                    maxLength = {15}
                    onChange={this.updatechange}
                    onFocus={this.updateInputFocus}
                    ></Input>

                    <div style={{"margin":"10px"}}>
                    <Input style={{width:"40%"}}
                     placeholder="MM/YY"
                     name="expiry"
                     type="number"
                     maxLength = {5}
                     value={this.state.editCardDetails.expiry}
                     onChange={this.updatechange}
                     onFocus={this.updateInputFocus}></Input>

                    <Input placeholder="cvc" style={{width:"40%",float:"right"}}
                     name="cvc"
                     type="number"
                     pattern="[0-9]{3}"
                     maxLength = {3}
                     value={this.state.editCardDetails.cvc}
                     onChange={this.updatechange}
                     onFocus={this.updateInputFocus}></Input><br/>
                     </div>
                    
                    </Card>
                    <Button primary onClick={()=>this.updateClicked(this.state.editCardDetails.id)}>Update Card</Button>
                    <Button negative onClick={()=>this.updateClose()}>Cancel</Button>
                    </GridColumn>
                    <GridColumn>
                    < Cards
                        cvc={this.state.editCardDetails.cvc}
                        expiry={this.state.editCardDetails.expiry}
                        focused={this.state.focus}
                        name={this.state.editCardDetails.cardName}
                        number={this.state.editCardDetails.cardNumber}
                        focused={this.state.focus}
                     />
                     </GridColumn>
                     </GridRow> : 
                    <GridRow>
                    <GridColumn style={{width:"60%",paddingLeft:"10%"}}>
                    
                    <Card style={{padding:"10px",width:"80%"}} >
                    <span>Add card</span>
                    <Input className="card-container" placeholder="Card Number" name="cardNumber"
                     style={{"margin":"10px"}}
                     type="number"
                    value={this.state.cardDetails.cardNumber}
                    onChange={this.inputchange}
                    onFocus={this.handleInputFocus}
                     ></Input>

                    <Input placeholder="Name on the Card" 
                    name="cardName" style={{"margin":"10px"}}
                    value={this.state.cardDetails.cardName}
                    type="text"
                    maxLength = {15}
                    onChange={this.inputchange}
                    onFocus={this.handleInputFocus}
                    ></Input>

                    <div style={{"margin":"10px"}}>
                    <Input style={{width:"40%"}}
                    placeholder="MM/YY"
                     name="expiry"
                     type="number"
                     pattern="[0-9]{2}/[0-9]{4}" 
                     value={this.state.cardDetails.Expiry}
                     onChange={this.inputchange}
                     onFocus={this.handleInputFocus}></Input>

                    <Input placeholder="cvc" style={{width:"40%",float:"right"}}
                     name="cvc"
                     type="number"
                     pattern="[0-9]{3}"
                     value={this.state.cardDetails.CVV}
                     onChange={this.inputchange}
                     onFocus={this.handleInputFocus}></Input><br/>
                     </div>
                    
                    </Card>
                    <Button disabled={(!this.state.cardDetails.cardNumber) &&
                        (!this.state.cardDetails.cardName) && (!this.state.cardDetails.cvc) && 
                       ( !this.state.cardDetails.expiry)} onClick={this.saveCard.bind()} primary>Save My Card</Button>
                    <Button negative onClick={this.closeAdd.bind()} >Cancel</Button>
                    </GridColumn>
                    <GridColumn>
                    < Cards
                        cvc={this.state.cardDetails.cvc}
                        expiry={this.state.cardDetails.expiry}
                        focused={this.state.focus}
                        name={this.state.cardDetails.cardName}
                        number={this.state.cardDetails.cardNumber}
                        focused={this.state.focus}
                     />
                     </GridColumn>
                     </GridRow>
                }
                </Segment>
            </ModalContent>
            <ModalActions>
               <span style ={{ border : "solid"}}> Total : <Input>{this.state.order_total}</Input></span>
            <Link to={`/customer/order/${this.state.good.id}`}> <Button negative onClick={()=>this.OrderClicked(false)}>back</Button>   </Link>
            <Link to={'/customer/response'}><Button positive disabled={!this.state.table} onClick={()=>this.OrderClicked(true)} >Order</Button></Link>
            </ModalActions>
            </Modal>


            </div>
        )
    }
}
export default withCookies(payment)