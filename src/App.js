import React from 'react';
import './App.css';
import Users from './components/Users';

const user = [
  {
  'id':'test',
  'password':'testtest',
  'email':'test@test.email',
  'name':'이름'
  },
  {
    'id':'test',
    'password':'testtest',
    'email':'test@test.email',
    'name':'이름'
    },
    {
      'id':'test',
      'password':'testtest',
      'email':'test@test.email',
      'name':'이름'
      },
      
]

class App extends React.Component{
  render(){
    return(
      <div>
      {user.map((u)=>{
        return <Users id={u.id} password={u.password} email={u.email} name={u.name}/>
      }) }
      </div>
    )
    
  }
}


export default App;
