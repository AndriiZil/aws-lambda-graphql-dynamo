const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const TableName = process.env.USERS_TABLE;

module.exports = {
  Query: {
    readOne: async (_, { id }) => {
      try {
        const params = {
          TableName,
          Key: { id }
        };
        const { Item: result } = await dynamoDb.get(params).promise();

        return result;
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
    readAll: async () => {
      try {
        const params = { TableName: process.env.USERS_TABLE };

        const { Items: result } = await dynamoDb.scan(params).promise();

        return result;
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
  },
  Mutation: {
    create: async (_, { input: { name } }) => {
      try {
        const user = {
          id: uuidv4(),
          name
        };

        const params = {
          TableName: process.env.USERS_TABLE,
          Item: user,
        };

        await dynamoDb.put(params).promise();

        return 'User was created';
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
    updateOne: async (_, { input, id }) => {
      try {
        const params = {
          TableName,
          Key: { id },
          UpdateExpression: 'SET #ts = :val1',
          ExpressionAttributeValues: { ':val1': input.name },
          ExpressionAttributeNames: { '#ts': 'name' }
        };

        await dynamoDb.update(params).promise();

        return `User with id "${id}" was updated`;
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
    deleteOne: async (_, { id }) => {
      try {
        const params = {
          TableName: process.env.USERS_TABLE,
          Key: { id }
        };

        await dynamoDb.delete(params).promise();

        return `User with id "${id}" was deleted`;
      } catch (e) {
        console.error(e);
        throw e;
      }
    }
  },
};
