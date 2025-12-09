import { gql } from "apollo-server";

export const typeDefs = gql`
  enum Role {
    admin
    doctor
    staff
  }

type Company {
  id: ID!
  name: String!
  adminId: ID!
}

input UserInput {
  id: ID!
  name: String!
  email: String!
  role: Role!
  companyId: String
}

type Query {
  getUserCompanies(user: UserInput!): [Company!]!
}

  type User {
    id: ID!
    name: String!
    email: String!
    role: Role!
    companyId: String
  }

  type Mutation {
    registerUser(
      name: String!
      email: String!
      password: String!
      role: Role!
      companyId: String
    ): User!

  updateCompany(companyId: ID!, newName: String!, user: UserInput!): Company!

  deleteCompany(companyId: ID!, user: UserInput!): Company!



    login(email: String!, password: String!): AuthPayload!

createCompany(name: String!, user: UserInput!): Company!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    hello: String
  }
`;
