import React, {Component} from 'react';
import {get, post} from 'axios';
import '../App.css';
import {Link} from 'react-router-dom';

class JournalView extends Component{
    constructor(props){
        super(props);
        this.state={
            journals:[],
            del_journal_num: null,
        }
        this.componentDidMount = this.componentDidMount.bind(this);
        this.getJournalList = this.getJournalList.bind(this);
        this.handledelJournal = this.handledelJournal.bind(this);
    }


    componentDidMount(){
        this.getJournalList();
    }

    componentDidUpdate = () =>{
        this.getJournalList();
    }

    makeJournalList = () =>{
        let list = this.state.journals.map(
            (jlist, i) => (
                <div key={i} className='JournalViewBox'>
                    <nav className='JournalViewBoxNav'>
                        <a className='JournalViewBoxDate'>{jlist.journal_create_date}</a>
                        <Link  className='JournalViewBoxFix' to={`/journalfix/${jlist.journal_num}`}><a className='JournalViewBoxFix'>수정하기</a></Link>
                        <a className='JournalViewBoxDel' data-num={jlist.journal_num} onClick={
                            this.handledelJournal.bind(this)
                        }>삭제하기</a>
                    </nav>
                    <div className='JournalViewBoxContent' dangerouslySetInnerHTML={ {__html: jlist.journal_content} }/>
                </div>
            )
        );
        return list;
    }

    getJournalList(){
        get('/api/journalview').then((response)=>{
            for(let i = 0; i < Object.keys(response.data).length; i++){
                response.data[i].journal_create_date = response.data[i].journal_create_date.substring(0,10);
                if(response.data[i].journal_fix_date !== null){
                    response.data[i].journal_fix_date = response.data[i].journal_fix_date.substring(0,10);
                }
            }
            this.setState({
                journals : response.data,
            })
        }).catch((err)=>{
            
        });
    }


    handledelJournal = e => {
        this.setState({
            del_journal_num: String(e.currentTarget.dataset.num),
        })
        console.log(this.state.del_journal_num);
        post('/api/journaldel', {
            journal_num: this.state.del_journal_num
        }).then((response) =>{
            console.log(response);
        })
    }


    render(){
        let list = null;
        if (Object.keys(this.state.journals).length > 0){
            list = this.makeJournalList();
        }else{
            list = <div key={0}  className='JournalViewBox' >작성된 기록이 없습니다 일기를 작성해주세요 </div>
        }
        return(
            <div>
               {list}
            </div>
        )
    }
}

export default JournalView;