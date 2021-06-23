module.exports = {
  Query: {
    hello: () => 'Hello world!',
    readOne: () => 'readOne',
    readAll: () => 'readAll',
  },
  Mutation: {
    create: () => 'create',
    updateOne: () => 'updateOne',
    deleteOne: () => 'deleteOne'
  }
};
