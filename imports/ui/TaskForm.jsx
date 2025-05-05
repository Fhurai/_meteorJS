/**
 * TaskForm Component
 * 
 * A controlled form component for adding new tasks to the application.
 * Manages local form state and handles submission to the server via Meteor methods.
 */

import React, { useState } from "react";
import { TasksCollection } from "/imports/api/TasksCollection";

/**
 * Form component for creating new tasks
 * @returns {JSX.Element} A form with input and submit button
 */
export const TaskForm = () => {
  // Local state for controlled input
  const [text, setText] = useState("");

  /**
   * Handles form submission
   * @param {Event} e - Form submit event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input
    if (!text) return;

    // Call server method to insert new task
    await Meteor.callAsync("tasks.insert", {
      text: text.trim(), // Remove whitespace
      createdAt: new Date(), // Add timestamp
    });

    // Reset form
    setText("");
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        name="taskName"
        id="taskName"
        type="text"
        placeholder="Type to add new tasks"
        value={text}
        onChange={(e) => setText(e.target.value)}
        aria-label="New task description"
      />

      <button type="submit" disabled={!text.trim()}>
        Add Task
      </button>
    </form>
  );
};

// Key Features:
// - Controlled component pattern (React-recommended)
// - Async form submission using Meteor methods
// - Input validation (empty string check)
// - Automatic form reset after submission

// State Management:
// - Uses React useState for local form state
// - Maintains single source of truth for input value
// - Clears state after successful submission

// Error Handling:
// - Basic client-side validation
// - Errors from Meteor.callAsync propagate to error boundaries

// Accessibility:
// - Proper form labeling
// - Semantic HTML elements
// - ARIA attributes for screen readers
// - Disabled state for submit button when invalid

// Security Considerations:
// - Doesn't directly modify collection (uses Meteor method)
// - Server validates and sanitizes input
// - Client-side validation is for UX only

// Performance:
// - Minimal re-renders due to simple state
// - Async operations don't block UI