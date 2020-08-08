import React, { Component } from 'react'
import { Card, Grid, CardHeader,Transition, CardContent,Modal,Button, GridRow, GridColumn, Label} from 'semantic-ui-react'


export default class home extends Component {
    state={
        header:'',
        details:false,
        count_item:[]
    }
    userClicked = ()=>{
        this.setState({details:true,header:"Users"})
    }
    goodClicked = ()=>{
        this.setState({details:true,header:"Goods"})
    }
    close=()=>{
        this.setState({details:false})
    }
    render(){
        return (
            <div>
                <Grid>
                    <Grid.Row columns={2} style={{"marginTop":"200px"}}>
                        <Grid.Column>
                            <Card style={{"float" :"right","backgroundImage":"linear-gradient(to top,black,grey, black)"}}>
                            <CardHeader className="head">
                                Total Users
                            </CardHeader>
                            
                            <CardContent className="count" style={{"fontSize":"70px","padding":"15px"}}>
                                {this.props.alluser}
                            </CardContent>
                            
                            
                                <button onClick ={this.userClicked}>More...</button>
                            
                            </Card>
                        </Grid.Column>
                        <Grid.Column>
                        <Card style={{"float" :"left","backgroundImage":"linear-gradient(to top,black,grey, black)"}}>
                            <CardHeader className="head">
                                Total Goods
                            </CardHeader>
                            <CardContent className="count" style={{"fontSize":"70px","padding":"15px"}}>
                                {this.props.goods_len}
                            </CardContent>
                            <button onClick ={this.goodClicked}>More...</button>
                            </Card>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                {/* {this.state.details ?(<Count header={this.state.header} status={true}/>):""} */}
               
            <Modal className="modal" style={{marginTop :"15%", marginLeft:"40%",width:"300px"}} open ={this.state.details}>
                <Modal.Header>
                    {this.state.header}
                </Modal.Header>
                <Modal.Content>
                    {this.state.header=== "Users" ? (
                    <Grid style={{"height":"100px",marginLeft:"10px"}}>
                        <GridRow columns={2}>
                        <GridColumn>
                            <GridRow >
                                <Label>Customers</Label>
                            </GridRow>
                            <GridRow>
                                <Label>Sellers</Label>
                            </GridRow>
                        </GridColumn>
                        <GridColumn>
                            <GridRow>
                            :<Label>{ this.props.customer}</Label>
                            </GridRow>
                            <GridRow>
                            :<Label>{this.props.seller}</Label>
                            </GridRow>
                        </GridColumn>
                        </GridRow>
                    </Grid>):(
                    <Grid style={{marginLeft:"10px"}}>
                        <GridRow columns={2}>
                            <GridColumn>
                            <GridRow>
                                <Label>Foods</Label>
                            </GridRow>
                            <GridRow>
                                <Label>Fuels</Label>
                            </GridRow>
                            <GridRow>
                                <Label>Grocery</Label>
                            </GridRow>
                            <GridRow>
                                <Label>Others</Label>
                            </GridRow>
                            </GridColumn>
                        <GridColumn>
                        <GridRow>
                            :<Label>{ this.props.food}</Label>
                            </GridRow>
                            <GridRow>
                            :<Label>{this.props.fuel}</Label>
                            </GridRow>
                            <GridRow>
                            :<Label>{ this.props.grocery}</Label>
                            </GridRow>
                            <GridRow>
                            :<Label>{this.props.others}</Label>
                        </GridRow>                        
                        </GridColumn>
                        </GridRow>
                    </Grid>    
                    )}
                </Modal.Content>
                <Modal.Actions style={{}}>
                    <Button onClick={this.close}>
                        Close
                    </Button>
                </Modal.Actions>
            </Modal>
            </div>
        )
    }
}
