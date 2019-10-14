import React, {Component} from 'react';
import {get} from 'axios';
import style from '../App.css';
import {Link, Route} from 'react-router-dom';

class JournalView extends Component{
    constructor(props){
        super(props);
        this.state={
            journals:[],
        }
        this.componentDidMount = this.componentDidMount.bind(this);
        this.getJournalList = this.getJournalList.bind(this);
    }

    componentDidMount(){
        this.getJournalList();
    }

    getJournalList(){
        get('/api/journalview').then((response)=>{
            console.log(response.data);
            for(let i = 0; i < Object.keys(response.data).length; i++){
                response.data[i].journal_create_date = response.data[i].journal_create_date.substring(0,10);
                if(response.data[i].journal_fix_date !== null){
                    response.data[i].journal_fix_date = response.data[i].journal_fix_date.substring(0,10);
                }
            }
            this.setState({
                journals : response.data,
            })
            console.log(this.state.journals);
        }).catch((err)=>{
            console.log(err)
        });
    }

    delJournalList(){
        
    }

    render(){
        const list = this.state.journals.map(
            (jlist) => (
                <div className='JournalViewBox'>
                    <nav className='JournalViewBoxNav'>
                        <a className='JournalViewBoxDate'>{jlist.journal_create_date}</a>
                        <a className='JournalViewBoxDel' >삭제하기</a>
                    </nav>
                    <div className='JournalViewBoxContent' dangerouslySetInnerHTML={ {__html: jlist.journal_content} }/>
                </div>
            )
        );
        return(
            <div >
               {list}
            </div>
        )
    }
}

export default JournalView;