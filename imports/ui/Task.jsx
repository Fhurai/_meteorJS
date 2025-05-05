/**
 * Task Component
 * 
 * A presentational component that renders an individual task item.
 * Displays task text, a checkbox for completion status, and a delete button.
 * Delegates all user interactions to parent component callbacks.
 */

import React from "react";

/**
 * Task component that renders a single task item
 * @param {Object} props - Component props
 * @param {Object} props.task - The task object containing _id, text, and isChecked
 * @param {Function} props.onCheckboxClick - Callback for checkbox toggle events
 * @param {Function} props.onDeleteClick - Callback for delete button events
 * @returns {JSX.Element} A list item representing a single task
 */
export const Task = ({ task, onCheckboxClick, onDeleteClick }) => {
    return (
        <li>
            {/* Checkbox for task completion status */}
            <input
                name={"task_" + task._id}
                id={"task_" + task._id}
                type="checkbox"
                checked={!!task.isChecked} // Ensure boolean value
                onClick={() => onCheckboxClick(task)}
                readOnly // Read-only because state is managed by parent
            />
            
            {/* Task text display */}
            <span>{task.text}</span>
            
            {/* Delete button */}
            <button 
                className="task-delete"
                onClick={() => onDeleteClick(task)}
                aria-label={`Delete task: ${task.text}`}
            >
                &times; {/* Multiplication symbol as delete icon */}
            </button>
        </li>
    );
};

// Key Features:
// - Stateless functional component (no internal state)
// - Pure presentation with all logic handled by parent
// - Accessible DOM structure with proper labeling
// - Minimal re-renders due to simple implementation

// Props Interface:
// - task: { _id: string, text: string, isChecked: boolean }
// - onCheckboxClick: function(task)
// - onDeleteClick: function(task)

// Design Considerations:
// 1. Uses semantic HTML elements (li, input, button)
// 2. Unique IDs generated for accessibility
// 3. Read-only checkbox as state is managed upstream
// 4. Clear visual hierarchy with text and action buttons

// Styling:
// Inherits styles from parent's CSS (main.css)
// Additional styling can be added via className props

// Accessibility:
// - Proper labeling with name/id attributes
// - ARIA attributes could be added for screen readers
// - Keyboard navigation support via parent component