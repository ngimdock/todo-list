import React, {useState} from 'react';
import {Button, Form} from 'react-bootstrap';

const SearchBar = (props) => {

	const {
			onAddTask, 
			onSearchTask, 
			isModifying, 
			onSetIsModifying, 
			valueModify, 
			onSetValueToModify, 
			onModifyTask,
			onSetInSearch
			} = props

	const [textValue, setTextValue] = useState("");

	const handleClickToAdd = (event) => {
		event.preventDefault();
		onAddTask(textValue);
		setTextValue("");
	};

	const handleClickToSearch = (event) => {
		event.preventDefault();

		if(textValue === ""){
			alert("Entrez la valeur a rechercher")
		}else{
			onSetInSearch(true);
			onSearchTask(textValue);
		}
	};

	const handleClickToModify = (event) => {
		event.preventDefault();
		onModifyTask()
		onSetIsModifying();
	};

// cette foction vas etre execute lors aue l'on vas modifier la valeur de formulaire
// selon 2 cas, la modification pour (ajouter et rechercher une tache) ou pour modifier une tache
	const formControl = (event) => {
		if(isModifying){
			onSetValueToModify(event.target.value);
		}else{
			setTextValue(event.target.value);
		}
	};

	let button = null;

	if(isModifying){
		button  = <button className="btns modifierBtn" onClick = {handleClickToModify} >Modifier</button>;
	}else{
		button =  <button variant="dark" type="submit" className="btns ajouerBtn" onClick={handleClickToAdd}>Ajouter</button>;	  		
	}

	return(
		<Form className="searchBar">
		  <Form.Group className="mb-3" >
		  	<div className="search-box">
			  	{
			  		isModifying ? null : <button variant="dark" type="submit" className="btns rechercheBtn" onClick={handleClickToSearch} >Rechercher</button>
			  	}
		    	<input 
		    		className="input-text" type="text" 
		    		placeholder= "ajouter ou rechercher les taches" 
		    		value={isModifying ? valueModify : textValue} 
		    		onChange= {formControl}  
		    		/>
		    	{
		    		button
		    	}
		  	</div>
		  </Form.Group>
		</Form>
	);
	
};

export default SearchBar;