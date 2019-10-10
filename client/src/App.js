import React from 'react';
import { Link, Redirect, Switch, Route, BrowserRouter as Router } from "react-router-dom";
import './App.css';
import Home from './components/Home';
import UsersRegister from './components/UserRegister';
import Login from './components/Login';
import Logout from './components/Logout';
import Jouranl from './components/Journal';
import JouranlList from './components/JournalList';

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
    }
    this.stateRefresh = this.stateRefresh.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.changeUserState = this.changeUserState.bind(this);
  }

  stateRefresh(e){
    this.setState({
      mode: e,
      refreshPage : false,
      is_logined: false,
      user_id:'',
      user_number:'',
      user_name:'',
    })
  }

  changeUserState(){
    this.callApi().then((res) => {
      if(res.is_logined===true){
        this.setState({
          is_logined: res.is_logined,
          user_id: res.user_id,
          user_number: res.user_number,
          user_name: res.user_name,
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

  componentDidMount(){
    this.changeUserState();
  }

  componentDidUpdate(){
    this.changeUserState();
  }

  //유저정보 가져오는 api 호출
  callApi = async () => {
    const response = await fetch('/api/getSession');
    const body = await response.json();
    // console.log(body);
    return body;
  }

  //네비게이터 
  loginedNav(){
    let nav = null;
    if(this.state.is_logined === true){
      nav = ( 
      <ul>
        <li><Link to="/">홈</Link></li>
        <li><Link to="/logout">로그아웃</Link></li>
        <li><Link to="/journal">일기</Link></li>
        <li><Link to='/journalist'>기록</Link></li>
      </ul>
      )
    }else{
      nav =(
        <ul>
          <li><Link to="/">홈</Link></li>
          <li><Link to="/login">로그인</Link></li>
          <li><Link to="/userRegister">회원가입</Link></li>
      </ul>
      )
    }
    return nav
  }

    
  render(){
    if(this.state.refreshPage === true){
      this.setState({
        refreshPage:false,
      })
      if(this.state.mode === 'journaledit'){
        return (
          <Redirect to="/journalist"/>
        )
      }else{
        return (
          <Redirect to="/"/>
        )
      }

    }
    return(
      <div>
          <Router>
            <header>
              <a>유저 번호 : {this.state.user_number} </a><br/>
              <a>유저 아이디 : {this.state.user_id} </a> <br/>
              <a>유저 이름 : {this.state.user_name} </a><br/>      
                 {this.loginedNav()}
            </header>
            <main>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path='/login' component={() =><Login stateRefresh={this.stateRefresh} />} />
                <Route path='/logout' component={() =><Logout stateRefresh={this.stateRefresh} />}/>
                <Route path="/userRegister" component={() => <UsersRegister stateRefresh={this.stateRefresh} />}/>
                <Route path="/journal" component={() => <Jouranl user_number={this.state.user_number} stateRefresh={this.stateRefresh} />} />
                <Route path="/journalist" component={()=> <JouranlList />}/>
              </Switch>
             </main>
          </Router>
      </div>
    )
  }
}


export default App;

