import {React, Component} from 'react';

import SearchBar from './SearchBar';
import TaskRow from './TaskRow';
import Statistiques from './Statistiques';

import '../css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      taskList : [
      {id:1, name : "aller dormir", isCompleted : false},
      {id:2, name : "lire mon livre", isCompleted : false},
      {id:3, name : "laver mes assiettes", isCompleted : false},
      ]
    }
  }

  handleAdd = (taskTOadd) => {
    const taskList = [...this.state.taskList];
    const id = new Date().getTime();
    taskList.unshift({id, name : taskTOadd, isCompleted : false});
    this.setState({taskList});

    console.log(taskList)
  };

  handleDelete = (id) => {
    console.log(id);
    const taskList = [...this.state.taskList];
    const tmp = taskList.filter(task => task.id !== id);
    this.setState({taskList : tmp});
  };

  handleSearch = (textToSearch) => {
    const taskList = [...this.state.taskList];
    const tmp = taskList.filter((task) => {
      return task.name.includes(textToSearch);
    });

    this.setState({taskList : tmp});
  };


  handleCompleted = (id) => {
    const taskList = [...this.state.taskList];

    taskList.forEach((task) => {
      if(task.id === id){
        if(!task.isCompleted){
          task.isCompleted = true;
        }else{
          task.isCompleted = false;
        }
      }
    })

    this.setState({taskList});
    console.log(this.getNumberTaskCompleted())
  };

  getNumberTaskCompleted = () => {
    let numberOfTaskCompleted = 0;

    this.state.taskList.forEach((task) => {
      if(task.isCompleted)
        numberOfTaskCompleted += 1;
    })

    console.log("get num")

    return numberOfTaskCompleted;
  };



  render(){
    return (
      <section className="App">
        <div className="mainContent">
          <h1>GESTIONNAIRE DE TACHES</h1>

          <div>
            <p className="ajout-rech">Ajoutez, rechercher ou supprimez des taches</p>
            <SearchBar onAddTask =  {this.handleAdd} onSearchTask = {this.handleSearch} />
          </div>

          <div className="task-box">
            {
              this.state.taskList.map(task => <TaskRow  key={task.id} task={task} onDeleteTask = {this.handleDelete} onCompletetask ={this.handleCompleted} />)
            }
          </div>
        </div>

        <Statistiques totalTask ={this.state.taskList.length} completedTask ={this.getNumberTaskCompleted()} />
      </section>
    );
  }
}

export default App;
