import React, {useState} from 'react';
import {Button, Form} from 'react-bootstrap';

const SearchBar = ({onAddTask, onSearchTask}) => {

	const [textValue, setTextValue] = useState("");

	const handleClickToAdd = (event) => {
		event.preventDefault();
		onAddTask(textValue);
		setTextValue("");
	};

	const handleClickToSearch = (event) => {
		event.preventDefault();
		console.log("je suis dans le onClickToSearch")
		onSearchTask(textValue);
	};

	return(
		<Form className="searchBar">
		  <Form.Group className="mb-3">
		  	<div className="search-box">
		  		<Button variant="dark" type="submit" onClick={handleClickToSearch}>Rechercher</Button>
		    	<Form.Control className="input-text" type="text" placeholder="ajouter ou rechercher les taches" value={textValue} onChange= {(event) => setTextValue(event.target.value)}  />
		  		<Button variant="dark" type="submit" onClick={handleClickToAdd}>Ajouter</Button>		  		
		  	</div>
		  </Form.Group>
		</Form>
	);
};

export default SearchBar;