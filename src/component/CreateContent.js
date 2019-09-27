import React, {Component} from 'react';


class CreateContent extends Component{
  //스테이트에 변화가 생길시 랜더가 호출됨.
  //아무런 변화가 없는상황에서 계속 호출되지 않게 하기위해 shouldcomponentUpdate라는 함수를 사용
    shouldComponentUpdate(newProps, newState){
      if(this.props.data === newProps.data){
        return false;
      }
      return true;
    }
    render(){
      return(  
        <article>
          <h2>Create</h2>
            <form action="/create_process" method="post"
            onSubmit={
              (e)=>{
                e.preventDefault();
                this.props.onSubmit(
                  e.target.title.value, 
                  e.target.desc.value
                  );
              }
            }
            >
                <p>
                  <input type='text' name='title' placeholder='title'></input>
                </p>
                <p>
                  <input type='text' name='desc' placeholder='desc'></input>
                </p>
                <p>
                  <input type='submit' ></input>
                </p>
            </form>
        </article>
      );
    }
  }

export default CreateContent;