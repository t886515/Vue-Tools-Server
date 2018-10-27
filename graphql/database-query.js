const { ToDoModel } = require('../database/connector.js');
const Mongoose = require('mongoose');
const moment = require('moment');

const dialogueTitle = '[Mongo Query]';

const saveTodo = data => {
  const { value, notes, isComplete, inProgress } = data;
  const createDate = moment();
  // const createDate = _createDate.format('MMMM Do YYYY, h:mm:ss a');

  return (newTodoEntry = new ToDoModel({
    value,
    notes,
    isComplete,
    inProgress,
    createDate,
    lastUpdateDate: createDate,
    completeDate: null,
    stashedDate: null,
  })
    .save()
    // .lean()
    .then(createdTodo => {
      console.log(`${dialogueTitle} New Todo Saved.`);
      return createdTodo;
    })
    .catch(e => {
      console.error(`${dialogueTitle} Failed to Save With: ${e}.`);
    }));
};

const updateTodo = (id, data) => {
  const { value, notes } = data;
  const lastUpdateDate = moment();
  // const updateDate = _updateDate.format('MMMM Do YYYY, h:mm:ss a');

  return ToDoModel.findByIdAndUpdate(
    { _id: id },
    { value, notes, lastUpdateDate },
    {
      new: true,
    },
  )
    .lean()
    .then(updatedTodo => {
      console.log(`${dialogueTitle} Todo Updated.`);
      return updatedTodo;
    })
    .catch(e => {
      console.error(`${dialogueTitle} Failed to Update With: ${e}.`);
    });
};

//Add error handler for these steps
const removeTodo = id => {
  return ToDoModel.remove({ _id: id })
    .then(deleted => {
      console.log(`${dialogueTitle} Todo removed.`);
    })
    .catch(e => {
      console.log(`${dialogueTitle} Failed to Delete With: ${e}.`);
    });
};

const getTodo = id => {
  if (id) {
    return ToDoModel.find({ _id: id }).lean();
  } else {
    return ToDoModel.find({}).lean();
  }
};

const completeTodo = (id, input) => {
  const { isComplete } = input;
  const lastUpdateDate = moment();
  const completeDate = isComplete? lastUpdateDate : null;

  return ToDoModel.findByIdAndUpdate(
    { _id: id },
    { isComplete, lastUpdateDate, completeDate },
    {
      new: true,
    },
  )
    .lean()
    .then(updatedTodo => {
      console.log(`${dialogueTitle} Todo completed.`);
      return updatedTodo;
    })
    .catch(e => {
      console.error(`${dialogueTitle} Failed to Update With: ${e}.`);
    });
}

module.exports = {
  saveTodo,
  updateTodo,
  getTodo,
  completeTodo,
  removeTodo,
};
