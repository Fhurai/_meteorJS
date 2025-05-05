/**
 * Server Entry Point - main.js
 * 
 * This is the main server-side entry point for the Meteor application.
 * It initializes server-side functionality including:
 * - Database publications
 * - Method definitions
 * - Server startup logic
 */

import { Meteor } from 'meteor/meteor';
import { TasksCollection } from '../imports/api/TasksCollection';
import '../imports/api/TasksPublications';
import "../imports/api/TasksMethods";

/**
 * Helper function to insert a new task
 * @param {string} taskText - The text content of the task
 * @returns {Promise} Promise representing the insert operation
 */
const insertTask = (taskText) => TasksCollection.insertAsync({ 
  text: taskText,
  createdAt: new Date(),
  isChecked: false 
});

/**
 * Meteor startup hook - runs when server starts
 * Seeds the database with sample tasks if empty
 */
Meteor.startup(async () => {
  // Check if database needs seeding
  if ((await TasksCollection.find().countAsync()) === 0) {
    console.log('Seeding tasks database...');
    
    // Insert sample tasks
    const sampleTasks = [
      "First Task",
      "Second Task", 
      "Third Task",
      "Fourth Task",
      "Fifth Task",
      "Sixth Task",
      "Seventh Task",
      "Eighth Task",
      "Ninth Task",
      "Tenth Task"
    ];

    // Insert tasks sequentially
    for (const taskText of sampleTasks) {
      await insertTask(taskText);
    }

    console.log(`Added ${sampleTasks.length} sample tasks`);
  }
});

// Key Features:
// 1. Server initialization logic
// 2. Database seeding functionality
// 3. Imports all server-side API modules

// Security Notes:
// - Database operations are wrapped in Meteor methods for security
// - Direct collection operations only happen during startup

// Performance Considerations:
// - Uses async/await for database operations
// - Sequential inserts to maintain order

// File Structure:
// - Imports are organized by functionality:
//   * Collections define data structure
//   * Publications control data visibility
//   * Methods handle data modification

// Startup Logic:
// - Checks if database is empty
// - Seeds with sample data if needed
// - Uses async count() to properly check collection state