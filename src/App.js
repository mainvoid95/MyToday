import React , {Component} from 'react';
import Navi from './component/Navi';
import ReadContent from './component/ReadContent';
import CreateContent from './component/CreateContent';
import UpdateContent from './component/UpdateContent';
import Subject from './component/Subject';
import Control from './component/Control';
import './App.css';


class App extends Component {
  constructor(props){
    super(props);
    this.max_content_id = 3;
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
  getReadContent(){
    var i = 0;
      while(i < this.state.contents.length){
        var data = this.state.contents[i];
        if(data.id === this.state.selected_content_id){
          return data;
        }
        i = i + 1;
      }
  }
  getContent(){
    var _title, _desc, _article, _content = null;
    if(this.state.mode === 'welcome'){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    }else if(this.state.mode === 'read'){
      _content = this.getReadContent();
      _article = <ReadContent title={_content.title} desc={_content.desc}></ReadContent>
    }else if(this.state.mode === 'create'){
      _article = <CreateContent onSubmit={
        (_title, _desc)=>{
          this.max_content_id = this.max_content_id + 1; 
          const _contents = Array.from(this.state.contents);
          _contents.push(
            {id:this.max_content_id, title:_title, desc:_desc}
          )
          this.setState({
            contents:_contents,
            mode:'read',
            selected_content_id:this.max_content_id
          });
        } 
      }></CreateContent>
    }else if(this.state.mode === 'update'){
      _content = this.getReadContent();
      _article = <UpdateContent data={_content} onSubmit={
        (_id ,_title, _desc)=>{
          var _contents = Array.from(this.state.contents);
          var i = 0;
          while(i < _contents.length){
            if(_contents[i].id === _id){
              _contents[i] = {id:_id, title:_title, desc:_desc}
              break;
            }
            i = i + 1;
          }
          this.setState({
            contents:_contents,
            mode:'read'
          });
        } 
      }></UpdateContent >
    }
    return _article;
  }
  render(){
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
        <Control onChangeMode={
          (_mode)=>{
            if(_mode === 'delete'){
              if(window.confirm('삭제하시겠습니까?')){
                var i = 0;
                const _contents = Array.from(this.state.contents);
                while(i < _contents.length){
                  if(_contents[i].id === this.state.selected_content_id){
                    _contents.splice(i,1);
                    break;
                  }
                  i = i + 1;
                }
                this.setState({
                  mode:'welcome',
                  contents:_contents,
                })
                this.max_content_id = this.max_content_id -1;
              }
            }else{
              this.setState({
                mode:_mode,
              })
            }
          }
        }></Control>
        {this.getContent()}
      </div>
    );
  }

}

export default App;
