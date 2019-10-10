import React, {Component} from 'react';
import {post} from 'axios'


class Login extends Component{
    constructor(props){
        super(props);
        this.state ={
             
        }
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
        this.handleValueChange = this.handleValueChange.bind(this)
        this.loginProcess = this.loginProcess.bind(this)
    }

    handleFormSubmit(e){
        e.preventDefault()
        this.loginProcess().then((response)=>{
            this.props.stateRefresh();
        })
        this.setState({
            id:'',
            pass:'',
            pass_same:false,
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
            <div className='Login'>
                <form onSubmit={this.handleFormSubmit}>
                    <h1>로그인</h1>
                    <input type="text" name='id' placeholder='id' value={this.state.id} onChange={this.handleValueChange}></input><br></br>
                    <input type="password" name='pass' placeholder='password' value={this.state.pass} onChange={this.handleValueChange}></input> <br></br>
                    <button type="submit">Login</button>
                </form>
            </div>
        )
    }
}
export default Login