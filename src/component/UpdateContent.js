import React, {Component} from 'react';


class UpdateContent extends Component{
  //스테이트에 변화가 생길시 랜더가 호출됨.
  //아무런 변화가 없는상황에서 계속 호출되지 않게 하기위해 shouldcomponentUpdate라는 함수를 사용

    constructor(props){
      super(props);
      this.state={
        id:this.props.data.id,
        title:this.props.data.title,
        desc:this.props.data.desc,
      }
      //inputformhandler 호출시 bind가 없으면 e를 쓸수 없음
      //호출시 bind작업을 따로 안하고 한번만 하게 만듬.
      this.inputFormHandler = this.inputFormHandler.bind(this);
    }

    inputFormHandler(e){
      this.setState({[e.target.name]:e.target.value});
    }
    
    render(){
      return(  
        <article>
          <h2>Update</h2>
            <form action="/update_process" method="post"
            onSubmit={
              (e)=>{
                e.preventDefault();
                this.props.onSubmit(
                  this.state.id,
                  this.state.title,
                  this.state.desc
                  );
              }
            }
            >
              <input type='hidden' name='id' value={this.state.id}></input>
                <p>
                  <input type='text' name='title' placeholder='title'
                  value={this.state.title}
                  onChange={
                      this.inputFormHandler
                    }></input>
                </p>
                <p>
                  <input type='text' name='desc' placeholder='desc'
                  value={this.state.desc}
                  onChange={
                    this.inputFormHandler
                  }
                  ></input>
                </p>
                <p>
                  <input type='submit' ></input>
                </p>
            </form>
        </article>
      );
    }
  }

export default UpdateContent;