import React, { Component } from 'react'
import { Card, Grid, CardHeader,Transition, CardContent,Modal,Button, GridRow, GridColumn, Label, Icon} from 'semantic-ui-react'


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
               
            <Modal className="modal" style={{marginTop :"15%", marginLeft:"40%",width:"230px"}} open ={this.state.details}>
                <Modal.Header>
                    {this.state.header}
                    <Icon style={{position:"absolute",right:"10px",cursor:"pointer"}}  onClick={this.close} size="small" name="x"></Icon>
                </Modal.Header>
                <Modal.Content>
                    {this.state.header=== "Users" ? (
                    <Grid style={{ width:"auto" , "height":"auto",marginLeft:"10px"}}>
                        <GridRow columns={2}>
                        <GridColumn >
                            <GridRow style={{marginBottom :"5px"}}>
                                <Label>Customers</Label>
                            </GridRow>
                            <GridRow>
                                <Label>Sellers</Label>
                            </GridRow>
                        </GridColumn>
                        <GridColumn>
                            <GridRow style={{marginBottom :"10px"}}>
                            :<Label style={{position:"absolute",right:"0px"}} >{ this.props.customer}</Label>
                            </GridRow>
                            <GridRow>
                            :<Label style={{position:"absolute",right:"0px"}}>{this.props.seller}</Label>
                            </GridRow>
                        </GridColumn>
                        </GridRow>
                    </Grid>):(
                    <Grid style={{ width:"auto" , "height":"auto",marginLeft:"10px"}}>
                        <GridRow columns={2}>
                            <GridColumn>
                            <GridRow style={{marginBottom :"5px"}}>
                                <Label>Foods</Label>
                            </GridRow>
                            <GridRow style={{marginBottom :"5px"}}>
                                <Label>Fuels</Label>
                            </GridRow>
                            <GridRow style={{marginBottom :"5px"}}>
                                <Label>Grocery</Label>
                            </GridRow>
                            <GridRow>
                                <Label>Others</Label>
                            </GridRow>
                            </GridColumn>
                        <GridColumn>
                        <GridRow style={{marginBottom :"10px"}}>
                            :<Label style={{position:"absolute",right:"0px"}}>{ this.props.food}</Label>
                            </GridRow>
                            <GridRow style={{marginBottom :"10px"}}>
                            :<Label style={{position:"absolute",right:"0px"}}>{this.props.fuel}</Label>
                            </GridRow>
                            <GridRow style={{marginBottom :"10px"}}>
                            :<Label style={{position:"absolute",right:"0px"}}>{ this.props.grocery}</Label>
                            </GridRow>
                            <GridRow style={{marginBottom :"10px"}}>
                            :<Label style={{position:"absolute",right:"0px"}}>{this.props.others}</Label>
                        </GridRow>                        
                        </GridColumn>
                        </GridRow>
                    </Grid>    
                    )}
                </Modal.Content>
            </Modal>
            </div>
        )
    }
}
