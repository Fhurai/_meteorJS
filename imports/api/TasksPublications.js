/**
 * Tasks Publications Module
 * 
 * Defines the server-side publication for tasks data.
 * Controls what task data is available to clients through subscriptions.
 */

import { Meteor } from "meteor/meteor";
import { TasksCollection } from "./TasksCollection";

/**
 * Publishes all tasks to authenticated clients
 * @returns {Mongo.Cursor} Cursor representing the set of documents to publish
 */
Meteor.publish("tasks", function() {
  // Note: Using function() instead of arrow function to preserve Meteor's this context
  
  // Security consideration: In a production app, you would typically:
  // 1. Add authentication check: if (!this.userId) return this.ready();
  // 2. Filter tasks by owner: return TasksCollection.find({ userId: this.userId });
  
  return TasksCollection.find(); // Publishes all tasks (simplified for demo)
});

// Key Features:
// - Real-time data synchronization between server and clients
// - Automatic updates when data changes
// - Efficient data transfer (only sends necessary fields)

// Client Usage:
// Clients subscribe using: Meteor.subscribe("tasks")
// This creates a reactive data source that can be used with TasksCollection.find()

// Security Note: 
// This implementation publishes ALL tasks to ALL clients. In a real application:
// 1. Add authentication checks
// 2. Implement proper filtering (e.g., by userId)
// 3. Consider publishing only necessary fields

// Performance Considerations:
// - Publications are reactive by default
// - Use Meteor's oplog for efficient change tracking in production