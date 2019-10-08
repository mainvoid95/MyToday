import React, {Component} from 'react';


class Control extends Component{
    render(){
      return(  
        <ul>
          <li><a href="/diray" onClick={
            (e)=>{
              e.preventDefault();
              this.props.onChangeMode('create');
            }
          }>create</a></li>
          <li><a href="/update"  onClick={
            (e)=>{
              e.preventDefault();
              this.props.onChangeMode('update');
            }
          }>update</a></li>
          <li><input type="button" value="delete"  onClick={
            (e)=>{
              e.preventDefault();
              this.props.onChangeMode('delete');
            }
          }></input></li>
        </ul>
      );
    }
  }

export default Control;