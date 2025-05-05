/**
 * Main entry point for the Meteor/React application.
 * This file initializes the React application and mounts it to the DOM.
 * It also ensures Meteor-specific code is loaded before the app starts.
 */

import React from 'react';
import { createRoot } from 'react-dom/client';
import { Meteor } from 'meteor/meteor';
import { App } from '/imports/ui/App';
import "../imports/api/TasksMethods"; // Import Meteor methods for Tasks collection

/**
 * Meteor startup block - ensures the DOM is ready before initializing the React app.
 * This is Meteor's equivalent of DOMContentLoaded or the main() function.
 */
Meteor.startup(() => {
  // Get the container element where the React app will be mounted
  const container = document.getElementById('react-target');
  
  // Create a React root and render the main App component
  const root = createRoot(container);
  root.render(<App />);
});

// Key Components:
// - React: JavaScript library for building user interfaces
// - createRoot: Creates a root for React's concurrent rendering
// - Meteor: Full-stack JavaScript platform
// - App: The root React component of the application
// - TasksMethods: Meteor methods for Tasks collection operations

// Note: The '../imports/api/TasksMethods' import ensures server-side methods
// are registered before the client application starts.