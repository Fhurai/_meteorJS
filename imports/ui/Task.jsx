import React from "react";

export const Task = ({ task, onCheckboxClick, onDeleteClick }) => {
    return <li>
        <input
            name={"task_" + task._id}
            id={"task_" + task._id}
            type="checkbox"
            checked={!!task.isChecked}
            onClick={() => onCheckboxClick(task)}
            readOnly
        />
        <span>{task.text}</span>
        <button onClick={() => onDeleteClick(task)}>&times;</button>
    </li>
};