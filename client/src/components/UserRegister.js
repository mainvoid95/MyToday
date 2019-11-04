import React, {Component} from 'react';
import {post} from 'axios' 
import {Redirect} from 'react-router-dom';
import '../App.css';
import Popup from 'react-popup';


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
            redirecthome:false,
        }
    }

    //폼에서 서밋을 누를경우 처리하는 함수
    //addUser함수에서 처리한 post값의 리턴값으로 팝업을 띄운다.
    handleFormSubmit = (e) =>{
        e.preventDefault()
        this.addUser().then((response)=>{
            if(response.data === 'register_success'){
                Popup.create({
                    content: `회원가입이 완료되었습니다.`,
                    buttons: {
                        right: [ {
                            text: '닫기',
                            className: 'success',
                            action:  () => {
                                Popup.close();
                                this.setState({redirecthome: true});
                            },
                        }]
                    }
                });
            }else if(response.data === 'id_exist'){
                Popup.alert('이미 등록된 아이디입니다.');
            }
            else{
                Popup.alert('비밀번호를 똑같이 입력해주세요');
            }
        })
        this.setState({
            id:'',
            pass:'',
            pass_confirm:'',
            email:'',
            name:'',
            pass_same:false,
            open:false,
        })
    }

    //input태그의 값이 변경될경우 그것을 실시간으로 반영한다
    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    handleClose = () => {
        this.setState({
            id:'',
            pass:'',
            pass_confirm:'',
            email:'',
            name:'',
            pass_same:false,
            open:false,
        })
    }
    
    // 비밀번호가 똑같이 입력되었는지 확인한뒤 동일하면 api로 db에 유저정보를 저장한다.
    addUser = () => {
        if(this.state.pass !== this.state.pass_confirm){
            Popup.alert('비밀번호를 똑같이 입력해주세요');
        }else{
            this.setState({pass_same : true});
            return post('/api/userRegister', {
                id: this.state.id,
                password: String(this.state.pass),
                email : this.state.email,
                name : String(this.state.name),
            }).then((response) =>{
                return response;
            })
        }
    }

    render(){
        if(this.state.redirecthome === true){
            return <Redirect to='/'></Redirect>  
        }
        return(
            <div className='RegisterForm'>
                <form onSubmit={this.handleFormSubmit}>
                    <h1>회원가입</h1>
                    <input className='inputName' type="text" name='id' placeholder='아이디' value={this.state.id} minLength="4"    onChange={this.handleValueChange}></input><br/>
                    <input type="password" name='pass' placeholder='비밀번호' minLength="8" value={this.state.pass} onChange={this.handleValueChange}></input><br/>
                    <input type="password" name='pass_confirm' placeholder='비밀번호 재입력'  minLength="8" value={this.state.pass_confirm} onChange={this.handleValueChange}></input><br/>
                    <input type="email" name='email' placeholder='이메일' value={this.state.email}  onChange={this.handleValueChange}></input><br/>
                    <input type="text" name='name' placeholder='이름' value={this.state.name} onChange={this.handleValueChange}></input><br/><br/>
                    <button type="submit">가입하기</button>
                </form>
            </div>
        )
    }
}

export default UserRegister