import React from 'react';
import { Link, Redirect, Switch, Route, BrowserRouter as Router} from "react-router-dom";
import './App.css';
import 'antd/dist/antd.css';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';

import {get, post} from 'axios';
import Home from './components/Home';
import UsersRegister from './components/UserRegister';
import Login from './components/Login';
import Jouranl from './components/Journal';
import JouranlView from './components/JournalView';
import JournalFix from './components/JournalFix';
import Clock from './components/Clock';
import Weather from './components/Weather';
import Popup from 'react-popup';
import logo from './img/logo_transparent.png'

// antd 관련 상수들 (ui관련된것들)
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;


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
      collapsed: false,
    }
  }

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

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

  closeaccount = () =>{
    post('/api/closeaccount',{user_number: this.state.user_number}).then(
        (response) => {
            if(response.data === 'success'){
                Popup.create({
                    content:'탈퇴 완료되었습니다.\n 이용해주셔서 감사합니다',
                    buttons:{
                        right:[{
                            text:'닫기',
                            action: () =>{
                                this.logout();
                            }
                        }]
                    }
                })
            }
        }).catch((err) => {
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
              className: 'leftclose',
              action: () =>{
                Popup.close();
              },
          }],
          right: [ 
            {
                text: '회원탈퇴',
                className: 'closeaccount',
                action: () =>{
                    Popup.close();
                    this.closeaccount();
                },
            },  
            {
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
        <div>
          <Menu.Item key="1">
          <Icon type="user" />
          <a className='userinfo' onClick={this.userInfoPopup}>{this.state.user_name}</a><br/> 
        </Menu.Item>
        <SubMenu
          key="sub1"
          title={
            <span>
              <Icon type="read" />
              <span>일기</span>
            </span>
          }
        >
          <Menu.Item key="2">쓰기</Menu.Item>
          <Menu.Item key="3">보기</Menu.Item>
        </SubMenu>
        </div>
      )
    }else{
      nav =(
        <div>
          <Menu.Item key="1">
          <Icon type="user" />
          <span><Link to="/login">로그인</Link></span>
        </Menu.Item>
        <Menu.Item key="2">
          <Icon type="usergroup-add" />
          <span><Link to="/userRegister">회원가입</Link></span>
        </Menu.Item>
        <SubMenu
          key="sub1"
          title={
            <span>
              <Icon type="read" />
              <span>일기</span>
            </span>
          }
        >
          <Menu.Item key="3">쓰기</Menu.Item>
          <Menu.Item key="4">보기</Menu.Item>
          <Menu.Item key="5">Alex</Menu.Item>
        </SubMenu>
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
        <p>ui 개편 작업 시작.</p>
          
        <p>어떤 프레임 워크 써야할지 고민중</p>
      </div>
    )
  }
}

export default App;



