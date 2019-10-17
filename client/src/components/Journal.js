import React, {Component} from 'react';
import {post} from 'axios'
import '../App.css';


class Journal extends Component{
    constructor(props){
        super(props);
        this.state ={
            text:''
            }
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.journalSaveProcess = this.journalSaveProcess.bind(this);
    }


    handleFormSubmit(e){
        e.preventDefault();
        this.journalSaveProcess().then((response)=>{
            this.props.stateRefresh('journaledit');
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
                    <textarea className='JournalEdit' placeholder='여기에 일기를 쓰면 됩니다! 어떤 내용이든지 상관 없어요!' autofocus wrap="hard" value={this.state.text} onChange={
                            e => this.setState({text:e.target.value})
                        } /><br/>
                    <button type="submit">저장하기</button>
                </form>
            </div>
        )
    }
}
export default Journal