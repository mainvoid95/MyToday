import React, {Component} from 'react';
import {get, post} from 'axios';
import '../App.css';
import {Link} from 'react-router-dom';
import Popup from 'react-popup';

class JournalView extends Component{
    constructor(props){
        super(props);
        this.state={
            journals:[],
            del_journal_num: null,
            journal_view_arr_num: 0,
            is_update: false,
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



    // 일기 뷰 생성
    makeJournalView = () =>{
        let j = this.state.journals[this.state.journal_view_arr_num];
        let view = (
                <div className='JournalViewBox'>
                    <nav className='JournalViewBoxNav'>
                        <a className='JournalViewBoxDate'>{j.journal_create_date}</a>
                        <Link  className='JournalViewBoxFix' to={`/journalfix/${j.journal_num}`}><a className='JournalViewBoxFix'>수정하기</a></Link>
                        <a className='JournalViewBoxDel' data-num={j.journal_num} onClick={
                            this.handledelJournal.bind(this)
                        }>삭제하기</a>
                    </nav>
                    <div className='JournalViewBoxContent' dangerouslySetInnerHTML={ {__html: j.journal_content} }/>
                </div>
            );
        return view;
    }


    //db에 쿼리 요청해서 일기 데이터 불러와서 state에 저장.
    getJournalList(){
        if(this.state.is_update === false){
            get('/api/journalview').then((response)=>{
                for(let i = 0; i < Object.keys(response.data).length; i++){
                    response.data[i].journal_create_date = response.data[i].journal_create_date.substring(0,10);
                    if(response.data[i].journal_fix_date !== null){
                        response.data[i].journal_fix_date = response.data[i].journal_fix_date.substring(0,10);
                    }
                }
                this.setState({
                    journals : response.data,
                    is_update: true,
                })
            });
        }
    }

    //일기 지우기 
    handledelJournal = e => {
        this.setState({
            del_journal_num: String(e.currentTarget.dataset.num),
        })
        console.log(this.state.del_journal_num);
        post('/api/journaldel', {
            journal_num: this.state.del_journal_num
        }).then((response) =>{
            console.log(response);
            this.setState({is_update:false})
        })
    }

    //이전 버튼 클릭시 발생하는 이벤트 journal_view_arr_num감소
    handleJournalViewPrev = () => {
            if(this.state.journal_view_arr_num > 0){
                this.setState({
                    journal_view_arr_num: this.state.journal_view_arr_num - 1,
                })
            }else{
                Popup.alert("제일 최근 작성된 일기입니다");
            }
    }
    
    //다음 버튼 클릭시 발생하는 이벤트 journal_view_arr_num증가
    handleJournalViewNext = () => {
        if(this.state.journal_view_arr_num < Object.keys(this.state.journals).length - 1){
            this.setState({
                journal_view_arr_num: this.state.journal_view_arr_num +1,
            })
        }else{
            Popup.alert("마지막 일기입니다");
        }
    }
    


    render(){
        let view = null;
        let journal_num = null;
        this.getJournalList();
        if (Object.keys(this.state.journals).length > 0){
            view = this.makeJournalView();
        }else{
            view = <div key={0}  className='JournalViewBox' >작성된 기록이 없습니다 일기를 작성해주세요 </div>
        }
        return(      
            <div>
                <nav className='JournalViewNav'>
                    <button className='JournalViewPrev' onClick={this.handleJournalViewPrev}>이전</button>
                    <button className='JournalViewNext' onClick={this.handleJournalViewNext}>다음</button>
                </nav> 
                {view}
            </div>
        )
    }
}

export default JournalView;