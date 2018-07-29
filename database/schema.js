const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;
Mongoose.Promise = global.Promise;

const ToDoSchema = new Schema({
  value: String,
  notes: String,
  isComplete: Boolean,
  inProgress: Boolean,
  createDate: String,
  _createDate: Date,
  updateDate: String,
  _updateDate: Date,
});

module.exports = {
  ToDoSchema,
};
