import React, {Component} from 'react';
import {post} from 'axios'
import {Redirect} from 'react-router-dom';
import '../App.css';


class Journal extends Component{
    constructor(props){
        super(props);
        this.state ={
            text:'',
            redirectflag:false,
            }
    }


    handleFormSubmit = (e) => {
        e.preventDefault();
        this.journalSaveProcess().then((response)=>{
            this.setState({redirectflag:true});
        });
    }
    
    journalSaveProcess = () => {
        return (
            post('/api/journalSaveProcess', {
                user_number: this.props.user_number,
                text: this.state.text
            }).then((response) =>{
            })
        )
    }

    render(){
        if(this.state.redirectflag === true){
            return <Redirect to='/' />
        }
        return(
            <div className='Journal'>
                <form onSubmit={this.handleFormSubmit}>
                    <textarea className='JournalEdit' placeholder='여기에 일기를 쓰면 됩니다!' autoFocus wrap="hard" value={this.state.text} onChange={
                            e => this.setState({text:e.target.value})
                        } /><br/>
                    <button type="submit">저장하기</button>
                </form>
            </div>
        )
    }
}
export default Journal