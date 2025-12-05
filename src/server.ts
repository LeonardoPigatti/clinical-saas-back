import { ApolloServer } from "apollo-server";
import { typeDefs } from "./graphql/typeDefs";
import { resolvers } from "./graphql/resolvers";
import dotenv from "dotenv";
import "./config/database";

dotenv.config();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen({ port: Number(process.env.PORT) || 3333 }).then(({ url }) => {
  console.log(`🚀 Server running at ${url}`);
});
