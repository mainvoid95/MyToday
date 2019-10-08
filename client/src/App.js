import React from 'react';
import { Link, Redirect, Route, BrowserRouter as Router } from "react-router-dom";
import './App.css';
import Users from './components/Users';
import Home from './components/Home';
import UsersRegister from './components/UserRegister';
import Login from './components/Login';
import TopBar from './components/TopBar';


class App extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      mode:'main',
      refreshPage : false,
    }
    this.stateRefresh = this.stateRefresh.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this)
  }

  stateRefresh(){
    this.setState({
      refreshPage: true,
    })
  }

  componentDidMount(){
    this.callApi().then(res => this.setState({users: res})).catch(err => console.log(err));
  }

  //유저정보 가져오는 api 호출
  callApi = async () => {
    const response = await fetch('/api/users');
    const body = await response.json();
    return body;
  }
  
  contentSelector() {
    
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
                <ul>
                  <li>
                    <Link to="/">
                      홈
                    </Link>
                  </li>
                  <li>
                    <Link to="/login">
                      로그인
                    </Link>
                  </li>
                  <li>
                    <Link to="/userRegister">
                        회원가입
                    </Link>
                  </li>

                </ul>
            
            </header>
            <main>
              <Route exact path="/" component={Home} />
              <Route path='/login' component={() =><Login stateRefresh={this.stateRefresh} />} />
              <Route path="/userRegister" component={() => <UsersRegister stateRefresh={this.stateRefresh} />}/>
            </main>
          </Router>
      </div>
    )
  }
}


export default App;

