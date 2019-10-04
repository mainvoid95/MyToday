import React, {Component} from 'react';
import {post} from 'axios'

class UserRegister extends Component{
    constructor(props){
        super(props);
        this.state ={
            id:'',
            pass:'',
            pass_confirm:'',
            email:'',
            name:'',
            pass_same:false,
        }
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
        this.handleValueChange = this.handleValueChange.bind(this)
        this.addUser = this.addUser.bind(this)
    }

    handleFormSubmit(e){
        e.preventDefault()
        this.addUser().then((response)=>{
            console.log(response.data);
        })
        this.setState({
            id:'',
            pass:'',
            pass_confirm:'',
            email:'',
            name:'',
        })
        window.location.reload();
    }

    handleValueChange(e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }
    
    addUser(){
        if(this.state.pass !== this.state.pass_confirm){
            alert('비밀번호를 똑같이 입력해주세요');
            this.setState({pass_same : false});
        }else{
            this.setState({pass_same : true});
        }
        if(this.state.pass_same){
 
        }
        return post('api/users', {
            id: this.state.id,
            password: this.state.pass,
            email : this.state.email,
            name : this.state.name
        }).then((response) =>{
            console.log(response);
        })
    }

    render(){
        return(
            <div className='RegisterForm'>
                <form onSubmit={this.handleFormSubmit}>
                    <h1>회원가입</h1>
                    <input type="text" name='id' placeholder='id' value={this.state.id} onChange={this.handleValueChange}></input>
                    <input type="password" name='pass' placeholder='password' value={this.state.pass} onChange={this.handleValueChange}></input>
                    <input type="password" name='pass_confirm' placeholder='confirm your password' value={this.state.pass_confirm} onChange={this.handleValueChange}></input>
                    <input type="email" name='email' placeholder='email' value={this.state.email}  onChange={this.handleValueChange}></input>
                    <input type="text" name='name' placeholder='name' value={this.state.name} onChange={this.handleValueChange}></input>
                    <button type="submit">가입하기</button>
                </form>
            </div>
        )
    }
}

export default UserRegister