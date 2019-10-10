import React from 'react';
import { Link, Redirect, Switch, Route, BrowserRouter as Router } from "react-router-dom";
import './App.css';
import Home from './components/Home';
import UsersRegister from './components/UserRegister';
import Login from './components/Login';
import Logout from './components/Logout';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      mode:'main',
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

  stateRefresh(){
    this.setState({
      mode:'main',
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
              <a>유저 번호 : {this.state.user_number} </a><br/>
              <a>유저 아이디 : {this.state.user_id} </a> <br/>
              <a>유저 이름 : {this.state.user_name} </a><br/>
                <ul>
                  <li>
                    <Link to="/">
                      홈
                    </Link>
                  </li>
                  <li>
                   {this.state.is_logined ? (<Link to="/logout">로그아웃</Link>): <Link to="/login">로그인</Link>}
                  </li>
                  {this.state.is_logined ? '' : (<li>
                    <Link to="/userRegister">
                        회원가입
                    </Link>
                  </li>)}
                  
                </ul>
            </header>
            <main>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path='/login' component={() =><Login stateRefresh={this.stateRefresh} />} />
                <Route path='/logout' component={() =><Logout stateRefresh={this.stateRefresh} />}/>
                <Route path="/userRegister" component={() => <UsersRegister stateRefresh={this.stateRefresh} />}/>
              </Switch>
             </main>
          </Router>
      </div>
    )
  }
}


export default App;

