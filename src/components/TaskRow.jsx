import React, {useState} from 'react';

import {Form} from 'react-bootstrap';
import { AiFillCloseCircle } from 'react-icons/ai';

const TaskRow = ({task, onDeleteTask, onCompletetask}) => {

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
			<span className="delete"> <AiFillCloseCircle onClick={handleClickToDelete} /></span>
		</div>
	);
};


export default TaskRow;