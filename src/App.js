import React , {Component} from 'react';
import Navi from './component/Navi';
import Content from './component/Content';
import Subject from './component/Subject';
import './App.css';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      mode:'welcome',
      selected_content_id:2,
      subject:{title:'WEB', sub:'World Wide Web'},
      welcome:{title:"welcome", desc:'React is.......'}, 
      contents:[
        {id:1, title:'HTML', desc:'HTML is HyperText MakeUp language!'},
        {id:2, title:'CSS', desc:'CSS is .....'},
        {id:3, title:'JavaScript', desc:'JavaScript is ....'}
      ]
    }
  }
  render(){
    var _title, _desc = null;
    if(this.state.mode === 'welcome'){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
    }else if(this.state.mode === 'read'){
        var i = 0;
        while(i < this.state.contents.length){
          var data = this.state.contents[i];
          if(data.id === this.state.selected_content_id){
            _title = data.title;
            _desc = data.desc;      
            break;
          }
          i = i + 1;
        }
      }
    return (
      <div className="App">
        <Subject 
        title={this.state.subject.title} 
        sub={this.state.subject.title}
        onChangePage={
          ()=>{
            this.setState({
              mode:'welcome',
            });
          }
        }
        ></Subject>
        <Navi onChangePage={
          (id)=>{
            this.setState({
              mode:'read',
              selected_content_id:Number(id),
            })
          }
        } data={this.state.contents}></Navi>
        <Content title={_title} desc={_desc}></Content>
      </div>
    );
  }

}

export default App;
