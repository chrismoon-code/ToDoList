import React from 'react';
import axios from 'axios'
class TaskList extends React.Component{
    state = { /*definitions of states must be done outside of the render() in order for it to be defined*/
        task : "" ,/* use semicolon instead of equals for assigning values to methods within the state class.*/
        taskList: []
    }
    componentDidMount(){
        this.getTaskList()
    }
    getTaskList = () => { /*get receives information which is done with .then (variable) => responseofrequest.data*/
            axios.get("http://localhost:4000/tasks")
            .then((response) => response.data)
            .then((response) => this.setState({taskList: response}))
            /*Need to assign the variable to the data of the response, 
            then you need to set state with the value of taskList with response and having response be assigned to it.*/
    } 
    onDeleteClick = task_id => { /*onDeleteClick variable contains the entire function and when called will do what is defined*/
        axios.delete(`http://localhost:4000/deleteTask/${task_id}`) /*use delete to delete server resources.*/
        .then((response) => {
            this.getTaskList()
        });
    }
    onAddTask = () => {  /*post sends information*/
        axios.post("http://localhost:4000/addTask",{ /*using axios we post a request 
        where the server is looking and within the body we provide a subcomponent called task which contains 
        this.state.task which references the task used in this js file */
            task: this.state.task
        }).then((response) => {
            this.getTaskList()
        });
        
    }
    render()/*className is using the library imported from index.html,styles for elements other than buttons must be done in divs*/
    {
        return( 
        <div>
            <h3> ToDoList </h3>
            <div className='input ui'>
            <input value = {this.state.task} placeholder = "Your Task" onChange = {e => this.setState({ 
            /* update/set state of task*/
                task: e.target.value 
            })}/>
            </div>
            <button className = "ui primary button basic" onClick = {
                () => this.onAddTask()
            }> Submit </button>
            <hr />  
            <div className="ui cards">
            {this.state.taskList.map((task) => ( /*this will map out all the values of the tasks into the card format by capturing all the html 
            needed to make it and mapping each value of tasklist, 
            each value of taskList is considered as a sql entry, .task or .taskid will isolate the value for each table respectively.*/
                    <div className="card">
                        <div className = "content">
                            <div className= "meta"> 
                            {task.task} 
                            </div>
                            <div className="description">
                            </div>
                        </div>
                        <div className="extra content">
                            <div className="ui two buttons">
                                <div className="ui basic green button" onClick = {
                                    () => this.onDeleteClick(task.task_id)
                                }>Finish</div>
                                <div className="ui basic red button" onClick = {
                                    () => this.onDeleteClick(task.task_id) /*() is being defined as deleteclick function and is ran*/
                                }>Delete</div>
                            </div>
                        </div>
                    </div>))}   
            </div>
        </div>

        )
    }
}
export default TaskList