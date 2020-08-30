import React, { Component } from 'react'
import { Container, Divider } from 'semantic-ui-react'
import { withCookies } from 'react-cookie';
// import Food from './Food';
// import Others from './others';
// import Fuels from './Fuels';
// import Grocery from './grocery';
import Menubar from './menu';
import Sellerhome from './seller/sellerhome';
// import { getDefaultNormalizer } from '@testing-library/react';

class admin extends Component {
    constructor (props){
        super(props);
        const token = this.props.cookies.get('mr_user')
        this.state = { 
            goods:[],
            goods_id : [],
            activeform : "home",
            menuactiveItem: 'home',
            array : [{1:2},{4:5}],
            currnt_user:{
              to1ken : token.token,
              user_id : token.user_id,
              username : token.username}            
          };  
        // this.getthis();
        // console.log(this.array);
        this.array = [{1:2},{4:5}]
       
    }
    
    componentDidMount() { 
        fetch('http://127.0.0.1:8000/api/Goods/usergoods/',{
            method : 'POST',
            headers : {
                'content-type': 'application/json',
            },
            body : JSON.stringify({'user_id' : this.state.currnt_user.user_id})
        }).then(resp => resp.json())
        .then(res => {
            this.setState({goods_id : res.goods_id})            
            g(this.state.goods_id)
        })
        .catch(erro => console.log(erro))
        
        const g = id =>{
            
            for (let index = 0; index < id.length; index++) {     
                const element = id[index];
                fetch(`http://127.0.0.1:8000/api/Goods/${element}/`,{
                method: 'GET',
                }).then(resp => resp.json())
                .then(res =>{ this.setState({goods : [...this.state.goods,res]})
                
              })
            }   
        }
    }

    d = () =>{
        
        switch (this.state.activeform) {
            case "home":
                return (<Sellerhome list = {this.state.goods} userid = {this.state.currnt_user.user_id} ></Sellerhome>)
            default:
                break;
        }
        }
    actform = (f) =>{
        console.log(f);
        
        this.setState({activeform : f})
    }

    render() { 

        return (<React.Fragment>
            <Menubar present = {()=>this.actform} user = "seller" active={this.state.activeform}/>
            <Divider></Divider>
            <Container>
            {this.d()}
            
            </Container>
            </React.Fragment>
        
        )
    }
}

export default withCookies(admin);