import React, {Component} from 'react';
import {post} from 'axios'
import '../App.css';


class JournalFix extends Component{
    constructor(props){
        super(props);
        this.state ={
            text:'',
            journal_num: null,
            }
    }

    //컴포넌트가 마운트 될때 데이터베이스에서 수정하려는 일기를 가져온다
    componentDidMount = () =>{        
        this.setState({
            journal_num : this.props.match.params.journalnum
        }, () =>{
        post('/api/journalcontentget',{journal_num:this.state.journal_num}
        ).then((response) => {
            let text = response.data[0].journal_content;
            text = text.replace(/<br\/>/gi , "\r\n");
            this.setState({
                text: text
            })
        })});
        
    }

    //폼에서 서밋할때 동작하는 함수
    handleFormSubmit = (e) => {
        e.preventDefault();
        this.journalSaveProcess().then((response)=>{
            this.props.stateRefresh('journaledit');
        });
    }
    
    //일기를 api를 이용해 다시 저장한다
    journalSaveProcess = () => {
        return (
            post('/api/journalupdate', {
                text: this.state.text,
                journal_num: this.state.journal_num,
            }).then((response) =>{
                console.log(response);
            })
        )
    }

    render(){
        return(
            <div className='Journal'>
                <form onSubmit={this.handleFormSubmit}>
                    <textarea className='JournalEdit' placeholder='여기에 일기를 쓰면 됩니다!' autoFocus wrap="hard"  value={this.state.text} onChange={
                        e => this.setState({text:e.target.value})
                    } /><br/>
                    <button type="submit">저장하기</button>
                </form>
            </div>
        )
    }
}

export default JournalFix;