import React from 'react';
import { Link, Redirect, Switch, Route, BrowserRouter as Router} from "react-router-dom";
import './App.css';
import {get} from 'axios';
import Home from './components/Home';
import UsersRegister from './components/UserRegister';
import Login from './components/Login';
import Logout from './components/Logout';
import Jouranl from './components/Journal';
import JouranlView from './components/JournalView';
import JournalFix from './components/JournalFix';
import UserInfoUpdate from './components/UserInfoUpdate';
import Popup from 'react-popup';



class App extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      mode:'home',
      refreshPage : false,
      is_logined: false,
      user_id:'',
      user_number:'',
      user_name:'',
      user_email:'',
    }
  }

  stateRefresh = (e) => {
    this.setState({
      mode: e,
      refreshPage : false,
      is_logined: false,
      user_id:'',
      user_number:'',
      user_name:'',
      user_email:'',
    })
  }

  changeUserState = () => {
    get('/api/getSession').then((res) => {
      if(res.data.is_logined === true){
        this.setState({
          is_logined: res.data.is_logined,
          user_id: res.data.user_id,
          user_number: res.data.user_number,
          user_name: res.data.user_name,
          user_email: res.data.user_email,
          refreshPage: true,
        })
      }else{
        this.setState({
          user_id: '',
          user_number: '',
          user_name: '',
          refreshPage: true,
        });
      }
    }).catch(err => console.log(err));
  }

  componentDidMount = () =>{
    this.changeUserState();
  }

  componentDidUpdate = () =>{
    this.changeUserState();
  }

  logout= () => {
    get('/api/logout').then((response)=>{
      this.stateRefresh();
    }).catch((err)=>{
        console.log(err)
    });
  }

  userInfoPopup = () => {
    Popup.create({
      title: '회원정보',
      content: `아이디 : ${this.state.user_id} \n 이메일 : ${this.state.user_email} \n 이름 : ${this.state.user_name} `,
      buttons: {
          left: [{
              text: '로그아웃',
              className: 'danger',
              action: () =>{
                this.logout();
                Popup.close();
              },
          }],
          right: [ {
              text: '닫기',
              className: 'success',
              action:  () => {
                Popup.close();
              },
          }]
      }
  });
  } 

  //네비게이터 
  loginedNav=()=>{
    let nav = null;
    if(this.state.is_logined === true){
      nav = ( 
      <div className='nav'>
        <a><Link to="/">MyToday</Link></a>
        <a><Link to="/journal">일기</Link></a>
        <a><Link to='/jouranlview'>기록</Link></a>
        <a className='userinfo' onClick={this.userInfoPopup}>{this.state.user_name}</a><br/> 
      </div>
      )
    }else{
      nav =(
        <div className='nav'>
          <a><Link to="/">MyToday</Link></a>
          <a className='register'><Link to="/userRegister">회원가입</Link></a>
          <a className='login' ><Link to="/login">로그인</Link></a>
        </div>
      )
    }
    return nav
  }

    
  render(){
    if(this.state.refreshPage === true){
      this.setState({
        refreshPage:false,
      })
      return (
          <Redirect to="/"/>
      )
    }
    return(
      <div>
          <Router>
            <header>
              {this.loginedNav()}
            </header>
            <main className='main'>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path='/login' component={() =><Login stateRefresh={this.stateRefresh} />} />
                <Route path='/logout' component={() =><Logout stateRefresh={this.stateRefresh} />}/>
                <Route path="/userRegister" component={() => <UsersRegister stateRefresh={this.stateRefresh} />}/>
                <Route path="/journal" component={() => <Jouranl user_number={this.state.user_number} stateRefresh={this.stateRefresh} />} />
                <Route path="/jouranlview" component={()=> <JouranlView user_number={this.state.user_number} />}/>
                <Route path='/journalfix/:journalnum' component={(props) => <JournalFix stateRefresh={this.stateRefresh} {...props}/>} />
                <Route path="/userinfoupdate" component={()=> <UserInfoUpdate user_number={this.state.user_number} stateRefresh={this.stateRefresh} />} />
              </Switch>
              <Popup />
             </main>
          </Router>
      </div>
    )
  }
}


export default App;

