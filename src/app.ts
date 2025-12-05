import { ApolloServer } from "apollo-server";
import { typeDefs } from "./graphql/typeDefs";
import { resolvers } from "./graphql/resolvers";
import dotenv from "dotenv";
import "./config/database"; // conecta Mongo

dotenv.config();

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await server.listen({ port: Number(process.env.PORT) || 3333 });
  console.log(`🚀 Server running at ${url}`);
}

startServer();
