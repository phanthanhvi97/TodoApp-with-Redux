import React, {Component} from 'react';
import TaskForm from './components/TaskForm';
import Control from './components/Control';
import TaskList from './components/TaskList'
import './App.css';
import {connect} from 'react-redux'
import * as actions from './actions/index'
class App extends Component{
    constructor(props) {
      super(props)
    
      this.state = {
         keyword:'',
         sort:{
             by:'',
             value:null
         }
      };
    };
    onToggleForm=()=>{
        if(this.props.itemEditing&&this.props.itemEditing.id!==''){
            this.props.onOpenForm()
        }else{
            this.props.onToggleForm()
        }
        this.props.onClearTask({
            id:'',
            name:'',
            status:true
        })
        
     }
    onCloseForm=()=>{
        this.setState({
            isDisplayForm:false
        });
    }
    findIndex=(id)=>{
        var {tasks}=this.state;
        var result=-1;
        tasks.forEach((task, index)=>{
            if(task.id===id){
                return result=index;
            }
        });
        return result;
    }
    onShowForm=()=>{
        this.setState({
            isDisplayForm:true
        });
    }
    onSearch=(keyword)=>{
        // console.log(keyword)
        this.setState({
            keyword:keyword
        })
    }
    onSort=(sort)=>{
        // console.log(sort)
        this.setState({
            sort:{
                by:sort.by,
                value:sort.value
            }
        },()=>{
            // console.log(this.state.sort)
        })
        
    }
  render(){
        var {isDisplayForm}=this.props
    //    if(keyword){
    //        tasks=tasks.filter((task)=>{
    //            return task.name.toLowerCase().indexOf(keyword)!==-1;
    //        })
    //    }
    //    var elmTaskForm = isDisplayForm?<TaskForm task={taskEditing}/>:'';
    //    console.log(sort)
    //sap xep
    //    if(sort.by==='name'){
    //     tasks.sort((a,b)=>{
    //         //a dung trc b
    //        if(a.name>b.name){
    //             return sort.value
    //         }
    //        else if(a.name<b.name){
    //             return -sort.value
    //        }
    //        else{
    //            return 0
    //        }
    //     })
    //    }else{
    //     tasks.sort((a,b)=>{
    //         if(a.status>b.status){
    //              return -sort.value
    //          }
    //         else if(a.status<b.status){
    //              return sort.value
    //         }
    //         else{
    //             return 0
    //         }
    //      })
    //    }       
    return(
      <div className="container">
        <div className="text-center">
            <h1>Quản Lý Công Việc</h1>
            <hr/>
        </div>
        <div className="row">
            <div className={isDisplayForm?"col-lg-4":""}>
                <TaskForm/>
            </div>
            <div className={isDisplayForm?"col-lg-8":"col-lg-12"}>
                <button type="button" className="btn btn-primary" onClick={this.onToggleForm}>
                    <span className="fa fa-plus mr-5"></span>Thêm Công Việc
                </button>
                <button type="button" className="btn btn-danger ml-5" onClick={this.onGenerateData}>
                    <span>Reset</span>
                </button>
                <div className="row mt-15">
                    <Control onSearch={this.onSearch} onSort={this.onSort}/>
                </div>
                <div className="row mt-15">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <TaskList />
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
  }
}

const mapStateToProps = state=>{
    return {
        isDisplayForm:state.isDisplayForm,
        itemEditing:state.itemEditing
    }
}

const mapDispatchToProps=(dispatch, props)=>{
    return {
        onToggleForm:()=>{
            dispatch(actions.toggleForm())
        },
        onClearTask:(task)=>{
            dispatch(actions.editTask(task))
        },
        onOpenForm:()=>{
            dispatch(actions.openForm())
        },        
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
