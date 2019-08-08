import React, {Component} from 'react';
import TaskForm from './components/TaskForm';
import Control from './components/Control';
import TaskList from './components/TaskList'
import './App.css';
import _ from 'lodash'
import {connect} from 'react-redux'
import * as actions from './actions/index'
class App extends Component{
    constructor(props) {
      super(props)
    
      this.state = {
        //  tasks:[],
         //dong mo form add edit
         taskEditing:null,
         filter:{
             name:'',
             status:-1
         },
         keyword:'',
         sort:{
             by:'',
             value:null
         }
      };
    };
    onToggleForm=()=>{
        this.props.onToggleForm()
    //them task
    //     if(this.state.isDisplayForm&&this.state.taskEditing!==null){
    //         this.setState({
    //             isDisplayForm:true,
    //             taskEditing:null
    //         });
    //     }else{
    //     this.setState({
    //         isDisplayForm:!this.state.isDisplayForm,
    //         taskEditing:null
    //     });
    // }
    // console.log(this.props.onToggleForm())

    }
    onCloseForm=()=>{
        this.setState({
            isDisplayForm:false
        });
    }
    onUpdateStatus=(id)=>{
        var tasks=this.state.tasks
        // console.log(id);
        // var index=this.findIndex(id);
        var index=_.findIndex(tasks,(task)=>{
            return task.id===id
        })
        // var {tasks}=this.state;
        if(index!==-1)
        {
            tasks[index].status=!tasks[index].status;
            this.setState({
                tasks:tasks
            });
            localStorage.setItem('tasks',JSON.stringify(tasks));
        }
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
    onDelete=(id)=>{
        var index=this.findIndex(id);
        var {tasks}=this.state;
        if(index!==-1)
        {
            tasks.splice(index, 1);
            // tasks[index].status=!tasks[index].status;
            this.setState({
                tasks:tasks
            });
            localStorage.setItem('tasks',JSON.stringify(tasks));
        }
        // this.onCloseForm();
    }
    onShowForm=()=>{
        this.setState({
            isDisplayForm:true
        });
    }
    onUpdate=(id)=>{
        // console.log(id);
        var index=this.findIndex(id);
        var {tasks}=this.state;
        var taskEditing=tasks[index];
        this.setState({
            taskEditing:taskEditing
        });
        this.onShowForm();
    }
    onFilter=(filterName,filterStatus)=>{
        filterStatus=+filterStatus
        this.setState({
            filter:{
                name: filterName.toLowerCase(),
                status:filterStatus
            }
        })
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
        var {taskEditing, filter, keyword,sort}=this.state; //=this.state.tasks
        var {isDisplayForm}=this.props
    //    if(filter){
    //        if(filter.name){
    //            tasks=tasks.filter((task)=>{
    //                return task.name.toLowerCase().indexOf(filter.name)!==-1
    //            })
    //        }
    //    }
    //     tasks=_.filter(tasks,(task)=>{
    //         return task.name.toLowerCase().indexOf(filter.name)!==-1
    //     })


    //    tasks=tasks.filter((task)=>{
    //        if(filter.status===-1){
    //            return task
    //        }else{
    //            return task.status===(filter.status===1?true:false)
    //        }
    //    })
    //    if(keyword){
    //        tasks=tasks.filter((task)=>{
    //            return task.name.toLowerCase().indexOf(keyword)!==-1;
    //        })
    //    }
       var elmTaskForm = isDisplayForm?<TaskForm  
                                        task={taskEditing}
                                        />:'';
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
                {elmTaskForm}
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
                        <TaskList 
                        // tasks={tasks} 
                        onUpdateStatus={this.onUpdateStatus}
                        onDelete={this.onDelete}
                        onUpdate={this.onUpdate}
                        onFilter={this.onFilter}
                        />
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
        isDisplayForm:state.isDisplayForm
    }
}

const mapDispatchToProps=(dispatch, props)=>{
    return {
        onToggleForm:()=>{
            dispatch(actions.toggleForm())
        },
        
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
