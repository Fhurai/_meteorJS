import React from "react";

export const Task = ({ task, onCheckboxClick }) => {
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
    </li>
};