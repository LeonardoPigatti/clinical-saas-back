import { gql } from "apollo-server";

export const typeDefs = gql`
  enum Role {
    admin
    doctor
    staff
  }

  type User {
    id: ID!
    name: String!
    email: String!
    role: Role!
    companyId: String!
  }

  type Mutation {
    registerUser(
      name: String!
      email: String!
      password: String!
      role: Role
      companyId: String!
    ): User!
  }
    type Mutation {
  registerUser(
    name: String!
    email: String!
    password: String!
    role: Role
    companyId: String!
  ): User!

  login(email: String!, password: String!): AuthPayload!
}

type AuthPayload {
  token: String!
  user: User!
}


  type Query {
    hello: String
  }
`;

