import React, {Component} from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

class Users extends Component{
    render(){
        return(
            <TableRow>
                <TableCell>{this.props.id}</TableCell>
                <TableCell>{this.props.password}</TableCell>
                <TableCell>{this.props.email}</TableCell>
                <TableCell>{this.props.name}</TableCell>
            </TableRow>
        )
    }
}


// class UserInfo extends Component{
//     render(){
//         return(
//             <div>
//                 <p>{this.props.id}</p>
//                 <p>{this.props.password}</p>
//                 <p>{this.props.email}</p>
//                 <p>{this.props.name}</p>
//             </div>
//         )
//     }
// }

export default Users;