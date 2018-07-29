const { ToDoModel } = require('../database/connector.js');
const Mongoose = require('mongoose');
const moment = require('moment');

const dialogueTitle = '[Mongo Query]';

const saveTodo = data => {
  const { value, notes, isComplete, inProgress } = data;
  const _createDate = moment();
  const createDate = _createDate.format('MMMM Do YYYY, h:mm:ss a');

  return (newTodoEntry = new ToDoModel({
    value,
    notes,
    isComplete,
    inProgress,
    createDate,
    _createDate,
    updateDate: createDate,
    _updateDate: _createDate,
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
  const { value, notes, isComplete } = data;
  const _updateDate = moment();
  const updateDate = _updateDate.format('MMMM Do YYYY, h:mm:ss a');

  return ToDoModel.findByIdAndUpdate(
    { _id: id },
    { ...data, updateDate, _updateDate },
    {
      new: true,
    },
  )
    .lean()
    .then(updatedTodo => {
      return updatedTodo;
      console.log(`${dialogueTitle} Todo Updated.`);
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

module.exports = {
  saveTodo,
  updateTodo,
  getTodo,
  removeTodo,
};
