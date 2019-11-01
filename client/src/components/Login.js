import React, {Component} from 'react';
import {post} from 'axios'
import {Redirect} from 'react-router-dom';
import '../App.css';
import Popup from 'react-popup';


class Login extends Component{
    constructor(props){
        super(props);
        this.state ={
            id:'',
            pass:'',
            open:false,
            redirecthome:false,
        }
    }

    handleFormSubmit = (e) => {
        e.preventDefault()
        this.loginProcess().then((response)=>{
            if(response.data === 'login_fail'){
                Popup.alert("로그인에 실패했습니다.\n 아이디나 비밀번호를 확인해주세요");
            }else if(response.data === 'login_success'){
                this.props.stateRefresh();
                this.setState({redirecthome:true});
            }else if(response.data === 'pass_is_not_same'){
                Popup.alert("로그인에 실패했습니다.\n 비밀번호가 다릅니다");
            }
        })
        this.setState({
            id:'',
            pass:'',
            open:false,
        })
    }

    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }
    
    loginProcess= () => {
        return post('/api/login', {
            id: this.state.id,
            password: this.state.pass,
        }).then((response) =>{
            return response;
        })
    }

    render(){
        if(this.state.redirecthome === true){
            return <Redirect to='/'/>
        }
        return(
            <div className='LoginForm'>
                <form onSubmit={this.handleFormSubmit}>
                    <h1>로그인</h1>
                    <input type="text" name='id' placeholder='아이디' minLength="4" value={this.state.id} onChange={this.handleValueChange}></input><br></br>
                    <input type="password" name='pass' placeholder='비밀번호'  minLength="8" value={this.state.pass} onChange={this.handleValueChange}></input> <br/><br/>
                    <button type="submit">로그인</button>
                </form>
            </div>
        )
    }
}
export default Login
