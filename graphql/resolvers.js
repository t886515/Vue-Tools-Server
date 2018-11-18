const {
  getTodo,
  saveTodo,
  updateTodo,
  completeTodo,
  removeTodo
} = require('./database-query.js');

const { getSummonerInfo } = require('./api-requests.js');
const { GraphQLScalarType } = require('graphql');

const resolvers = {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    // gets invoked to parse client input that was passed through variables
    parseValue: value => {
      return new Date(value);
    },
    // this field is for value to client
    serialize: value => {
      return new Date(value);
    },
    // gets invoked to parse client input that was passed
    // inline(have arg defining using this type) in the query.
    parseLiteral(ast) {
      if (ast.value) {
        return new Date(ast.value);
      }
      return null;
    }
  }),
  Query: {
    Todos: (obj, arg) => {
      if (arg.id) {
        return getTodo(arg.id);
      } else {
        return getTodo();
      }
    },
    SummonerInfo: (obj, arg) => {
      if (arg.summonerName) {
        const { summonerName = 'Laeticia' } = arg;
        return getSummonerInfo(summonerName);
      } else {
        return {
          name: 'Please enter a valid summoner name.'
        };
      }
    }
  },
  Todo: {
    id: obj => {
      return obj._id;
    }
  },

  Mutation: {
    createTodo: async (obj, arg) => {
      if (arg.input) {
        return await saveTodo(arg.input);
      } else {
        return `Input Not Found.`;
      }
    },
    updateTodo: async (obj, arg) => {
      const { input, id } = arg;
      if (input && id) {
        return await updateTodo(id, input);
      } else {
        return `Input Not Found.`;
      }
    },
    completeTodo: async (obj, arg) => {
      const { input, id } = arg;
      if (input && id) {
        return await completeTodo(id, input);
      } else {
        return `Input or ID is missing.`;
      }
    },
    removeTodo: (obj, arg) => {
      removeTodo(arg.id);
      return `Todo with id ${arg.id} removed.`;
    }
  }
};

module.exports = resolvers;
