import React from 'react';
import {get} from 'axios'
import {Redirect} from 'react-router-dom';


class Logout extends React.Component{
    componentDidMount = () => {
        get('/api/logout').then((response)=>{
            this.props.stateRefresh('home');
        }).catch((err)=>{
            console.log(err)
        });
    }

    render(){
        return(
            <div>
                로그아웃 완료
                <Redirect to='/'/>
            </div>
        )
    }
}

export default Logout