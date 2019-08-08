import React, {Component} from 'react';
import {connect} from 'react-redux'
import * as actions from './../actions/index'
class TaskForm extends Component{
    constructor(props) {
      super(props)
    
      this.state = {
         id:'',
         name:'',
         status:true
      };
    };
    
    onCloseForm=()=>{
        this.props.onCloseForm();
    }
    onChange=(event)=>{
        var target = event.target;
        var name = target.name;
        var value = target.value;
        if(name==='status'){
            value=target.value==='true'?true:false;
        }
        this.setState({
            [name]:value
        });
    }
    onSubmit=(event)=>{
        event.preventDefault();
        // this.props.onSubmit(this.state);
        this.props.onAddTask(this.state)
        //huy bo va close form
        this.onClear();
        this.onCloseForm();
    }
    onClear=()=>{
        this.setState({
            name: '',
            status: false
        });
    }
    componentWillMount(){
        if(this.props.task){
            this.setState({
                id: this.props.task.id,
                name: this.props.task.name,
                status: this.props.task.status
            });
        }
    }
    componentWillReceiveProps(nextProps){
        // console.log(nextProps)
        if(nextProps&&nextProps.task){
            this.setState({
                id: nextProps.task.id,
                name: nextProps.task.name,
                status: nextProps.task.status
            });
            //sua->them
        }else if(nextProps&&nextProps.task===null){
            this.setState({
                id: '',
                name: '',
                status: false
            });
        }
    }
    render(){
        var {id}=this.state;
    return(
        <div className="panel panel-warning">
        <div className="panel-heading">
            <h3 className="panel-title">
                {/* {id} */}
                {id===''?'Them cong viec':'Cap nhat cong viec'}
                <span className="fa fa-times-circle text-right" onClick={this.onCloseForm}></span>
            </h3>
        </div>
        <div className="panel-body">
            <form onSubmit = {this.onSubmit}>
                <div className="form-group">
                    <label>Tên :</label>
                    <input 
                    type="text" className="form-control"
                    name='name' value={this.state.name}
                    onChange={this.onChange}
                     />
                </div>
                <label>Trạng Thái :</label>
                <select className="form-control" 
                name='status' value={this.state.status}
                onChange={this.onChange}
                required="required">
                    <option value={true}>Kích Hoạt</option>
                    <option value={false}>Ẩn</option>
                </select>
                <br/>
                <div className="text-center">
                    <button type="submit" className="btn btn-warning">Save</button>&nbsp;
                    <button type="button" className="btn btn-danger" onClick={this.onClear}>Hủy Bỏ</button>
                </div>
            </form>
        </div>
        </div>
    )
  }
}
const mapStateToProps = state=>{
    return{
        
    }
}
const mapDispatchToProps=(dispatch, props)=>{
    return{
        onAddTask:(task)=>{
            dispatch(actions.addTask(task))
        },
        onCloseForm:()=>{
            dispatch(actions.closeForm())
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(TaskForm);
