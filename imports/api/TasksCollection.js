/**
 * Tasks Collection Module
 * 
 * Defines the MongoDB collection for tasks in the Meteor application.
 * This collection will be synchronized between client and server automatically
 * via Meteor's DDP (Distributed Data Protocol).
 */

import { Mongo } from "meteor/mongo";

/**
 * Creates and exports a new MongoDB collection named "tasks".
 * 
 * This collection will store task documents with fields like:
 * - text: string (task description)
 * - createdAt: date
 * - isChecked: boolean (completion status)
 * - userId: string (owner reference)
 * 
 * On the server, this represents an actual MongoDB collection.
 * On the client, this represents a cached subset of the server's collection.
 */
export const TasksCollection = new Mongo.Collection("tasks");

// Key Features:
// - Automatic client-server synchronization
// - Latency compensation (local cache updates appear instant)
// - Secure database operations when used with Meteor methods
// - Reactive data source for React components

// Usage:
// Import this collection in both client and server code to:
// - Perform database operations (via methods)
// - Create reactive data sources (in publications/subscriptions)
// - Use with Meteor's allow/deny rules or methods for security