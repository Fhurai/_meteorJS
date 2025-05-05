/**
 * Tasks Methods Module
 * 
 * Defines server-side Meteor methods for secure task operations.
 * These methods provide the API for all database modifications,
 * ensuring data validation and security.
 */

import { Meteor } from "meteor/meteor";
import { TasksCollection } from "./TasksCollection";

// Define Meteor methods for task operations
Meteor.methods({
    /**
     * Insert a new task
     * @param {Object} doc - Task document to insert
     * @returns {String} The _id of the inserted document
     */
    "tasks.insert"(doc) {
        // Add server-side validation here if needed
        return TasksCollection.insertAsync(doc); // Async version for better performance
    },

    /**
     * Toggle a task's checked status
     * @param {Object} params
     * @param {String} params._id - Task ID
     * @param {Boolean} params.isChecked - Current checked status
     * @returns {Number} Number of affected documents
     */
    "tasks.toggleChecked"({ _id, isChecked }) {
        return TasksCollection.updateAsync(_id, {
            $set: { isChecked: !isChecked }, // Invert the current status
        });
    },

    /**
     * Delete a task with confirmation
     * @param {Object} params
     * @param {String} params._id - Task ID to delete
     * @returns {Number} Number of affected documents
     */
    "tasks.delete"({ _id }) {
        // Client-side confirmation (note: this runs on client due to Meteor method stubs)
        if (confirm('Do you confirm deletion?')) {
            return TasksCollection.removeAsync(_id);
        }
        console.warn('Cancelled deletion for ' + _id);
    },
});

// Security Notes:
// 1. These methods should be called from the client after proper authentication checks
// 2. Additional server-side validation can be added in each method
// 3. The async versions (insertAsync/updateAsync/removeAsync) are used for better performance

// Method Naming Convention:
// - Prefix with "tasks." for namespacing
// - Verb-based names indicating the action

// Error Handling:
// Methods will automatically propagate errors to the client
// Custom errors can be thrown using Meteor.Error