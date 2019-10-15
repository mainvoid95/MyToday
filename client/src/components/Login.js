import React, {Component} from 'react';
import {post} from 'axios'
import '../App.css';


class Login extends Component{
    constructor(props){
        super(props);
        this.state ={
            id:'',
            pass:'',
            open:false,
        }
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
        this.handleValueChange = this.handleValueChange.bind(this)
        this.loginProcess = this.loginProcess.bind(this)
    }

    handleFormSubmit(e){
        e.preventDefault()
        this.loginProcess().then((response)=>{
            this.props.stateRefresh('home');
        })
        this.setState({
            id:'',
            pass:'',
            open:false,
        })
    }

    handleValueChange(e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }
    
    loginProcess(){
        return post('/api/login', {
            id: this.state.id,
            password: this.state.pass,
        }).then((response) =>{
            console.log(response);
        })
    }

    render(){
        return(
            <div className='LoginForm'>
                <form onSubmit={this.handleFormSubmit}>
                    <h1>로그인</h1>
                    <input type="text" name='id' placeholder='아이디' value={this.state.id} onChange={this.handleValueChange}></input><br></br>
                    <input type="password" name='pass' placeholder='비밀번호' value={this.state.pass} onChange={this.handleValueChange}></input> <br/><br/>
                    <button type="submit">로그인</button>
                </form>
            </div>
        )
    }
}
export default Login