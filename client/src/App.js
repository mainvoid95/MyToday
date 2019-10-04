import React from 'react';
import './App.css';
import Paper from '@material-ui/core/Paper';
import Users from './components/Users';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import {withStyles} from '@material-ui/core/styles';
import UserRegister from './components/UserRegister';

const styles = theme =>({
  root:{
    width:'100%',
    marginTop: theme.spacing(3),
    overflowX:"auto"
  },
  table:{
    minWidth: 500,
  },
  progress:{
    margin:theme.spacing(2)
  }
});


class App extends React.Component{
  state ={
    users:'',
    completed: 0
  }

  componentDidMount(){
    this.callApi().then(res => this.setState({users: res})).catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/users');
    const body = await response.json();
    return body;
  }

    
  render(){
    const {classes} = this.props;
    return(
      <div>
        <Paper className={classes.root}>
          <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>아이디</TableCell>
                        <TableCell>비밀번호</TableCell>
                        <TableCell>이메일</TableCell>
                        <TableCell>이름</TableCell>
                    </TableRow>
                </TableHead>
                  <TableBody>
                    {this.state.users ? this.state.users.map(u => {
                      return <Users id={u.user_id} pass={u.user_pass} email={u.user_email} name={u.user_name} />
                      }) : ''}
                  </TableBody>
              </Table>
          </Paper>
        <UserRegister />
      </div>
    )
    
  }
}


export default withStyles(styles)(App);

