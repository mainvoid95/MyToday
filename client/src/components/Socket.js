import React from 'react';
import socketio from 'socket.io-client';
const socket = socketio.connect("https://localhost:443");

export default class Socket extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            name:'',
            msg:'',
        }
    }

    render(){
        return(
            <p>소켓 테스트 페이지</p>
        )
    }
}