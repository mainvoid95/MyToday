import React from 'react';

class Clock extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            today: new Date()
        }
    }

    componentDidMount = () =>{
        this.timeid = setInterval(()=> this.getTime(), 1000);
    }
    
    componentWillUnmount =() => { //종료되면 반복하는것도 클리어시키기
        clearInterval(this.timeID)
    }

    getTime = () =>{
        this.setState({
            today: new Date(),
        })
        
    }

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