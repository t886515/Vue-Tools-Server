const { makeExecutableSchema } = require('graphql-tools');

const resolvers = require('./resolvers.js');
const fs = require('fs');
const path = require('path');

// TODO: implement error handling in the future
const fileNames = fs.readdirSync(path.join(__dirname, './schema'), 'utf8');
const gqlSchemas = fileNames.map(fileName => {
  return fs.readFileSync(path.join(__dirname, `./schema/${fileName}`), 'utf8');
});

const typeDefs = gqlSchemas;

const schema = makeExecutableSchema({ typeDefs, resolvers });

module.exports = schema;
