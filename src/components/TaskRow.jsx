import React, {useState} from 'react';

import {Form} from 'react-bootstrap';
import { AiFillCloseCircle, AiFillEdit } from 'react-icons/ai';

const TaskRow = (props) => {

	const {
			task, 
			onDeleteTask, 
			onCompletetask, 
			isModifying , 
			onSetIsModifying, 
			idOftaskTomodify, 
			onSetIdOftaskTomodify
			} = props;

	const [checkValue, setCheckValue] = useState(false);

	const handleClickToDelete = () => {
		console.log("hello guy");
		onDeleteTask(task.id);
	};

	const handleCheckChange = () => {
		onCompletetask(task.id);
	};

	let className = "taskRow";

	className = task.isCompleted ? className + " taskRow-completed" : className;

	return (
		<div className={className} >
			<span> <Form.Check variant="dark" type="checkbox" value ={checkValue} onClick={handleCheckChange} /></span>
			<span className="task-name">{task.name}</span>
			<span className="delete"> 
				{
					isModifying ? null : <AiFillEdit className="modifier" onClick={()=> {onSetIsModifying(); onSetIdOftaskTomodify(task)}} /> 
				}
				<AiFillCloseCircle onClick={handleClickToDelete} className="delete" />
			</span>
		</div>
	);
};


export default TaskRow;