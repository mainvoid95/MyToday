import React from 'react';
import { Link, Redirect, Switch, Route, BrowserRouter as Router} from "react-router-dom";
import './App.css';
import {get} from 'axios';
import Home from './components/Home';
import UsersRegister from './components/UserRegister';
import Login from './components/Login';
import Jouranl from './components/Journal';
import JouranlView from './components/JournalView';
import JournalFix from './components/JournalFix';
import UserInfoUpdate from './components/UserInfoUpdate';
import NotFound from './components/NotFound';
import Popup from 'react-popup';
import github from './GitHub.png';
import mail from './mail.png';


class App extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      refreshPage : false,
      is_logined: false,
      user_id:'',
      user_number:'',
      user_name:'',
      user_email:'',
    }
  }


  stateRefresh = () => {
    this.setState({
      refreshPage : true,
      is_logined: false,
      user_id:'',
      user_number:'',
      user_name:'',
      user_email:'',
    })
  }


  changeUserState = () => {
    if(this.state.is_logined === false){
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
        }else if(res.data.is_logined === false){
          this.setState({
            is_logined : false,
            user_id: '',
            user_number: '',
            user_name: '',
            refreshPage: true,
          });
        }
      }).catch(err => console.log(err));
    }
  }

  componentDidMount = () =>{
    this.changeUserState();
  }

  componentDidUpdate = () =>{
    this.changeUserState();
  }

  //로그아웃 함수
  logout= () => {
    get('/api/logout').then((response)=>{
      this.stateRefresh();
    }).catch((err)=>{
        console.log(err);
    });
  }

  //유저 정보 팝업 함수
  userInfoPopup = () => {
    Popup.create({
      title: '회원정보',
      content: `아이디 : ${this.state.user_id} \n 이메일 : ${this.state.user_email} \n 이름 : ${this.state.user_name} `,
      buttons: {
          left: [{
              text: '닫기',
              className: '',
              action: () =>{
                Popup.close();
              },
          }],
          right: [ {
              text: '로그아웃',
              className: '',
              action:  () => {
                this.logout();
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
      <nav className='nav'>
        <a><Link to="/">MyToday</Link></a>
        <a><Link to="/journal">일기</Link></a>
        <a><Link to='/jouranlview'>기록</Link></a>
        <a className='userinfo' onClick={this.userInfoPopup}>{this.state.user_name}</a><br/> 
      </nav>
      )
    }else{
      nav =(
        <nav className='nav'>
          <a><Link to="/">MyToday</Link></a>
          <a className='register'><Link to="/userRegister">회원가입</Link></a>
          <a className='login' ><Link to="/login">로그인</Link></a>
        </nav>
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
            <div className='warp'>
              <main className='main'>
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route path='/login' component={() =><Login stateRefresh={this.stateRefresh} />} />
                  <Route path="/userRegister" component={() => <UsersRegister stateRefresh={this.stateRefresh} />}/>
                  <Route path="/journal" component={() => <Jouranl user_number={this.state.user_number} stateRefresh={this.stateRefresh} />} />
                  <Route path="/jouranlview" component={()=> <JouranlView user_number={this.state.user_number}/>}/>
                  <Route path='/journalfix/:journalnum' component={(props) => <JournalFix stateRefresh={this.stateRefresh} {...props}/>} />
                  <Route path="/userinfoupdate" component={()=> <UserInfoUpdate user_number={this.state.user_number} stateRefresh={this.stateRefresh} />} />
                  <Route component={NotFound}/>
                </Switch>
                <Popup />
              </main>
            </div>
                <footer className='Mainfooter'>
                    <a href="mailto:mainvoid95@gmail.com?Subject=문의사항" target="_top"><img src={mail} className='mailImg'/></a>
                    <a href="https://github.com/mainvoid95/MyToday"><img src={github}className='GithubImg' /></a>
                </footer>
          </Router>
      </div>
    )
  }
}


export default App;

