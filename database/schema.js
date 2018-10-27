const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;
Mongoose.Promise = global.Promise;

const ToDoSchema = new Schema({
  value: String,
  notes: String,
  isComplete: Boolean,
  inProgress: Boolean,
  createDate: Date,
  lastUpdateDate: Date,
  completeDate: Date,
  stashedDate: Date,
});

// ToDoSchema.add({
//   todos: [ToDoSchema],
// });

module.exports = {
  ToDoSchema,
};
