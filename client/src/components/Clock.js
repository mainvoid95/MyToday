import React from 'react';

class Clock extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            today: new Date()
        }
    }

    //컴포넌트가 마운트 될때 1초간격으로 시간을 갱신함
    componentDidMount = () =>{
        this.timeid = setInterval(()=> this.getTime(), 1000);
    }
    
    componentWillUnmount =() => { 
        clearInterval(this.timeID)
    }

    getTime = () =>{
        this.setState({
            today: new Date(),
        })
    }

    //날자나 시간이 1자리수일경우 앞에 0을추가함
    make2num=(input) => {
        input = String(input);
        if(input.length === 1){
            input = "0" + input;
        }
        return input;
    }

    render(){
        return(
            <div className='clock'>
                <a>{this.state.today.getFullYear()}년 {this.state.today.getMonth() + 1}월 {this.make2num(this.state.today.getDate())}일 </a>
                <a>{this.make2num(this.state.today.getHours())}</a> : <a>{this.make2num(this.state.today.getMinutes())}</a> : <a>{this.make2num(this.state.today.getSeconds())}</a>
            </div>
        )
    }
}

export default Clock