import { Meteor } from 'meteor/meteor';
import { TasksCollection } from '../imports/api/TasksCollection';
import '../imports/api/TasksPublications';
import "../imports/api/TasksMethods"; 

const insertTask = (taskText) => TasksCollection.insertAsync({ text: taskText });

Meteor.startup(async () => {
  if((await TasksCollection.find().countAsync()) === 3) {
    [
      "First Task",
      "Second Task",
      "Third Task",
      "Fourth Task",
      "Fifth Task",
      "Sixth Task",
      "Seventh Task",
      "Eighth Task",
      "Ninth Task",
      "Tenth Task",
    ].forEach(insertTask)
  }
});
