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
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.journalSaveProcess = this.journalSaveProcess.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);

        this.quillRef = null;      // Quill instance
        this.reactQuillRef = null; // ReactQuill component
     
    }


    componentDidMount(){        
        this.setState({
            journal_num : this.props.match.params.journalnum
        }, () =>{
        post('/api/journalcontentget',{journal_num:this.state.journal_num}
        ).then((response) => {
            console.log(response);
            let text = response.data[0].journal_content;
            text = text.replace(/<br\/>/gi , "\r\n");
            this.setState({
                text: text
            })
        })});
        
    }

    componentDidUpdate(){
        
    }


    handleFormSubmit(e){
        e.preventDefault();
        this.journalSaveProcess().then((response)=>{
            this.props.stateRefresh('journaledit');
        });
    }
    
    journalSaveProcess(){
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
                    <textarea className='JournalEdit' placeholder='여기에 일기를 쓰면 됩니다! 어떤 내용이든지 상관 없어요!' wrap="hard"  value={this.state.text} onChange={
                        e => this.setState({text:e.target.value})
                    } /><br/>
                    <button type="submit">저장하기</button>
                </form>
            </div>
        )
    }
}

export default JournalFix;