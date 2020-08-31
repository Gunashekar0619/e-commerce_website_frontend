import React, { Component } from 'react'
import { Container, Segment,Message, MessageHeader, GridRow, GridColumn,Grid ,Header, Divider, Button } from 'semantic-ui-react'
import { withCookies } from 'react-cookie';
import { Link } from 'react-router-dom';


class response extends Component {
    constructor(props){
        super(props);
        const cookies = this.props.cookies.get('mr_user');
        const order = this.props.cookies.get('Order');
        this.state={
            product : order,
            current_user: {
                username:cookies.username,
                user_id:cookies.user_id,
                email:cookies.email
              },
        }
    }
    render() {
        console.log(this.state.product);
        return (
            <div style={{"paddingTop":"7%"}}>
            <Container style={{"backgroundColor" : "white","paddingTop":"20px","paddingBottom":"10px"}} >
                <Message
                        success
                        header='Your order was successful'
                        content='Thanks for using over servies'
                    />

                <Segment>
        <Message><MessageHeader>Transaction ID : {this.state.product.transactionid}</MessageHeader></Message>
                    <Grid style={{"marginLeft":"20px","marginTop":"20px"}}>
                        <GridRow columns="2" >
                            <GridColumn>
                                <Header>Delivery Address</Header>
                                <Message>
                                    <MessageHeader>{this.state.current_user.username}</MessageHeader><br/>

                                <span>{this.state.product.user.address},<br/>
                                {this.state.product.user.city },<br/>
                                {this.state.product.user.country },</span> <br/>
                                <span>{this.state.product.user.phone_no}</span>
                                </Message>
                                </GridColumn>
                                <GridColumn>
                                <Header>Product Details</Header>
                                <Message>
                                    <MessageHeader>{this.state.product.Product.goods.name}</MessageHeader>
                                    <Grid style={{"margin" :"5px"}}>
                                    <GridRow columns="2">
                                        <Grid.Column>
                                            Quantity <br/>
                                            Price <br/>
                                        </Grid.Column>
                                        <Grid.Column>
                                            <span style={{"float":"right"}}>{this.state.product.Product.Quantity}</span><br/>
                                            <span style={{"float":"right"}}>{this.state.product.Product.goods.price}</span><br/>
                                        </Grid.Column>
                                    </GridRow>
                                    </Grid>
                                    <Divider/>
                                    <Grid style={{"padding":"0px" ,"margin":"0px","marginRight":"30px"}}>
                                    <GridRow columns="2" style={{"padding":"0px" ,"margin":"0px"}}>
                                        <Grid.Column style={{"padding":"0px" ,"margin":"0px"}}>
                                        <Header>Total </Header> <br/>
                                        </Grid.Column>
                                        <Grid.Column style={{"padding":"0px" ,"margin":"0px"}}>
                                        <Header  ><span style={{"float":"right"}}>{this.state.product.Product.total}</span></Header><br/>
                                        </Grid.Column>
                                    </GridRow>
                                    </Grid>
                                </Message>
                            </GridColumn>
                        </GridRow>
                    </Grid>
                </Segment>
                <Link to='/customer'><Button primary>Continue Shopping </Button></Link>
                <Link to='/customer'><Button floated="right" positive>Okey</Button></Link>
            </Container>
            </div>
        )
    }
}

export default withCookies(response);