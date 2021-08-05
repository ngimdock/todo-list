import {React, Component} from 'react';

import SearchBar from './SearchBar';
import TaskRow from './TaskRow';
import Statistiques from './Statistiques';

import '../css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BiUpsideDown, BiTired, BiHeartCircle } from "react-icons/bi";

class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      taskList : [],
      taskListSearch : [],

      isModifying : false, // cette variable me permet de savoir si l'utilisateur est entrain de modifier une tache

      valueModify : "", // la valeur de la tache en cours de modification
      idOftaskTomodify : null,

      inSearch: false // cette variable me permet de savoir si l'utilisateur recherche une tache pour afficher une liste differente a l'ecran

    }
  }

// cette foction permet d'ajouter une nouvelle tache
  handleAdd = (taskTOadd) => {
    this.setState({inSearch : false})
    if(taskTOadd === "" || taskTOadd.length > 20){
      alert("Le nom de la tache ne dois pas etre vide et superieur a plus de 20 caracteres " + <BiTired />)
    }else{
      const taskList = [...this.state.taskList];
      const id = new Date().getTime();
      taskList.unshift({id, name : taskTOadd, isCompleted : false});
      this.setState({taskList});
    }
  };

// cette fonction permet de supprimer une nouvelle tache
  handleDelete = (id) => {
    const taskList = [...this.state.taskList];
    const tmp = taskList.filter(task => task.id !== id);
    this.setState({taskList : tmp});
  };

  setInSearch = (value) => {
  this.setState({inSearch : value});
};

// cette fonction permet de faire la recherche des taches
  handleSearch = (textToSearch) => {
    const tmp = this.state.taskList.filter((task) => (
       task.name.includes(textToSearch)
    ));

    this.setState({taskListSearch: tmp})

    if(this.state.taskListSearch.length === 0){
      return <p className="no-task">aucune tache correspondante</p>;
    }else{
      return this.state.taskListSearch;
    }
  };

// cette fonction permet de marquer une tache comme complete ou incomplete
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
  };

// cette fonction renvoie le noumbre de tache deja realise
  getNumberTaskCompleted = () => {
    let numberOfTaskCompleted = 0;

    this.state.taskList.forEach((task) => {
      if(task.isCompleted)
        numberOfTaskCompleted += 1;
    })

    return numberOfTaskCompleted;
  };

// cette fonction permet de changer la valeur de isModifying
  setIsModifying = () => {
    this.setState({isModifying : !this.state.isModifying});
};

setValueToModify = (value) => {
  this.setState({valueModify : value})
};

// cette fonction permet de changer la valeur de idOftaskTomodify

setIdOftaskTomodify = (task) => {
  this.setState({idOftaskTomodify : task.id}) // modification de l'id

  this.state.taskList.forEach( // la valeur a ;odifier par defaut est le nom de la tache en cours de modification
    taskTmp => {
      if(taskTmp.id === task.id){
        this.setState({valueModify : task.name})
      }
    }
  )
};

// cette fonction permet de modifier une tache
 handleModify = () => {
  const taskList = [...this.state.taskList];
  const idOftaskTomodify = this.state.idOftaskTomodify;

  taskList.forEach(
    (task) => {
      if(task.id === idOftaskTomodify) {
        task.name = this.state.valueModify;
      }
    }
  )

  this.setState({taskList});
};


  render(){

    let headTitle = null;

    if(this.state.isModifying){
      headTitle = <p className="headTitle">Vous allez modifier cette tache</p>;
    }else{
      headTitle = <p className="headTitle">Ajoutez, rechercher ou supprimez des taches</p>;
    }
    return (
      <section className="App">
        <div className="mainContent">
          <h1>GESTIONNAIRE DE TACHES</h1>
          {headTitle}
          <div>
            
            <SearchBar 
                onAddTask =  {this.handleAdd} 
                onSearchTask = {this.handleSearch} 
                isModifying={this.state.isModifying}
                onSetIsModifying = {this.setIsModifying}
                valueModify={this.state.valueModify}
                onSetValueToModify = {this.setValueToModify}
                onModifyTask = {this.handleModify}
                onSetInSearch = {this.setInSearch}
                />
          </div>

          <div className="task-box">
            {
                this.state.inSearch ? (
                  <>
                    <button onClick={() => this.setInSearch(false)} className="quitter">Quiter</button>
                    {
                      this.state.taskListSearch.length === 0 ? <div> <p className="no-task">Aucune tache correspondante</p></div>:
                      this.state.taskListSearch.map(
                        (task) => {
                          return (                                                       
                            <TaskRow  
                                key={task.id}
                                task={task} 
                                onDeleteTask = {this.handleDelete} 
                                onCompletetask ={this.handleCompleted}
                                isModifying ={this.state.isModifying}
                                onSetIsModifying = {this.setIsModifying}
                                idOftaskTomodify ={this.state.idOftaskTomodify}
                                onSetIdOftaskTomodify ={this.setIdOftaskTomodify}
                                />
                          );
                        } 
                      )
                    }
                  </>

                  ) :(
                  this.state.taskList.length === 0 ? <p className="no-task">Aucune tache pour le moment <BiUpsideDown /> </p> :
                  this.state.taskList.map(
                      (task) => {
                        return (
                          <TaskRow  
                              key={task.id}
                              task={task} 
                              onDeleteTask = {this.handleDelete} 
                              onCompletetask ={this.handleCompleted}
                              isModifying ={this.state.isModifying}
                              onSetIsModifying = {this.setIsModifying}
                              idOftaskTomodify ={this.state.idOftaskTomodify}
                              onSetIdOftaskTomodify ={this.setIdOftaskTomodify}
                              />
                        );
                      } 
                  )
                )
              
            }
          </div>
        </div>

        <Statistiques 
            totalTask ={this.state.taskList.length} 
            completedTask ={this.getNumberTaskCompleted()}

            />
        <p className="by-ngimdock">By ngimdock <BiHeartCircle /> {new Date().getFullYear()}</p>
      </section>
    );
  }
}

export default App;
