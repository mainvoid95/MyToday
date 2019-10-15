import React, {Component} from 'react';
import {get, post} from 'axios'
import '../App.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css'; 


export default class JournalFix extends Component{
    constructor(props){
        super(props);
        this.state ={
            text:''
            }
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.journalSaveProcess = this.journalSaveProcess.bind(this);
    }

    componentDidMount= () =>{
        
    }

    getJournalText = () => {
        get('/api/jounalfix').then((res) => {
            
        })
    }


    handleFormSubmit(e){
        e.preventDefault();
        this.journalSaveProcess().then((response)=>{
            this.props.stateRefresh('journaledit');
        });
    }

    handleValueChange(e) {
        this.setState({
            text:e,
        });
    }
    
    journalSaveProcess(){
        return (
            post('/api/journalSaveProcess', {
                user_number: this.props.user_number,
                text: this.state.text
            }).then((response) =>{
                console.log(response);
            })
        )
    }

    render(){
        return(
            <div className='Journal'>
                <form onSubmit={this.handleFormSubmit}>
                    <ReactQuill className='JournalEdit' theme="bubble" value={this.state.text} placeholder='여기에 일기를 쓰면 됩니다! 어떤 내용이든지 상관 없어요!' onChange={this.handleValueChange} />
                    <button type="submit">저장하기</button>
                </form>
            </div>
        )
    }
}
