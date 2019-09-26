import React , {Component} from 'react'; 


class Navi extends Component{lists
    render(){
        var lists = [];
        var data = this.props.data;
        var i = 0;
        while(i < data.length){
            lists.push(<li key={data[i].id}>
                <a 
                href={"/content/"+data[i].id}
                data-id={data[i].id}
                onClick={
                    (e)=>{
                        e.preventDefault();
                        this.props.onChangePage(e.target.dataset.id);
                    }
                }
                >{data[i].title}</a>
                </li>);
            i = i + 1;
        }
        return(
            <nav>
            <ul>
                {lists}
            </ul>
            </nav>
        );
        }
  }

export default Navi;