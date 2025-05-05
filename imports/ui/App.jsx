/**
 * App Component (Root Component)
 * 
 * The main React component that serves as the entry point for the application UI.
 * Manages task data subscriptions, filtering, and provides the main layout structure.
 */

import React, { useState } from 'react';
import { useTracker, useSubscribe } from 'meteor/react-meteor-data';
import { Task } from './Task';
import { TasksCollection } from '../api/TasksCollection';
import { TaskForm } from "./TaskForm";

export const App = () => {
  // Subscribe to tasks publication
  const isLoading = useSubscribe('tasks');

  // Task event handlers using Meteor methods
  const handleToggleChecked = ({ _id, isChecked }) => 
    Meteor.callAsync("tasks.toggleChecked", { _id, isChecked });
  
  const handleDelete = ({ _id }) => 
    Meteor.callAsync("tasks.delete", { _id });

  // State for filtering completed tasks
  const [hideCompleted, setHideCompleted] = useState(false);
  const hideCompletedFilter = { isChecked: { $ne: true } };

  // Reactive data fetching using useTracker
  const tasks = useTracker(() =>
    TasksCollection.find(hideCompleted ? hideCompletedFilter : {}, {
      sort: { createdAt: -1 }, // Newest tasks first
    }).fetch());

  // Loading state
  if (isLoading()) {
    return <div>Loading...</div>;
  }

  return (
    <div className="app">
      {/* Header section */}
      <header>
        <div className="app-bar">
          <div className="app-header">
            <h1>📝️ To Do List</h1>
          </div>
        </div>
      </header>

      {/* Main content area */}
      <div className="main">
        {/* Task input form */}
        <TaskForm />

        {/* Filter controls */}
        <div className="filter">
          <button onClick={() => setHideCompleted(!hideCompleted)}>
            {hideCompleted ? 'Show All' : 'Hide Completed'}
          </button>
        </div>

        {/* Task list */}
        <ul className="tasks">
          {tasks.map((task) => (
            <Task
              key={task._id}
              task={task}
              onCheckboxClick={handleToggleChecked}
              onDeleteClick={handleDelete}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

// Key Features:
// - Uses Meteor's reactive data system (useTracker, useSubscribe)
// - Implements real-time task list with sorting and filtering
// - Handles all task operations through Meteor methods
// - Responsive layout with CSS classes from main.css

// Data Flow:
// 1. Subscribes to 'tasks' publication
// 2. Reactively tracks task data from TasksCollection
// 3. Passes tasks to individual Task components
// 4. Handles user actions through Meteor method calls

// Performance Considerations:
// - useSubscribe handles subscription readiness
// - useTracker efficiently manages reactive updates
// - Sorting and filtering happen at the database level

// Security Note:
// - All data modifications go through secure Meteor methods
// - The publication controls what data is available to clients