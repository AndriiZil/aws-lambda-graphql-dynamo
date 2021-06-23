const { gql } = require('apollo-server-lambda');

module.exports = gql`
    type User {
        id: String!,
        name: String!
    }
    
    input inputUser {
        name: String!
    }
    
    type Query {
        hello: String,
        readAll: [User],
        readOne(id: ID!): User
    }
    
    type Mutation {
        create(input: inputUser!): String!
        updateOne(id: ID!, input: inputUser): String!
        deleteOne(id: ID!): String!
    }
`;
