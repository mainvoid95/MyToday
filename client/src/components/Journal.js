import React, {Component} from 'react';
import {post} from 'axios'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 



class Journal extends Component{
    constructor(props){
        super(props);
        this.state ={
            text:''
            }
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.journalSaveProcess = this.journalSaveProcess.bind(this);
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
                    <ReactQuill theme="snow" value={this.state.text} onChange={this.handleValueChange} />
                    <button type="submit">저장하기</button>
                </form>
            </div>
        )
    }
}
export default Journal