const { gql } = require('apollo-server-lambda');

module.exports = gql`
    type User {
        id: String!,
        name: String!
    }
    
    input inputUser {
        id: ID!,
        name: String!
    }
    
    type Query {
        hello: String,
        readAll: [User],
        readOne(id: ID!): User
    }
    
    type Mutation {
        create(input: inputUser!): User
        updateOne(id: ID!): String
        deleteOne(id: ID!): String
    }
`;
