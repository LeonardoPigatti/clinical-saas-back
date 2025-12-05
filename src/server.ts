import { ApolloServer } from "apollo-server";
import { typeDefs } from "./graphql/typeDefs";
import { resolvers } from "./graphql/resolvers";
import dotenv from "dotenv";
import "./config/database";
import { getUserFromToken, AuthUser } from "./config/auth";

dotenv.config();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  // Contexto para autenticação JWT
  context: ({ req }): { user: AuthUser | null } => {
    // req é any no Apollo Server standalone
    const user = getUserFromToken(req);
    return { user };
  },
});

server.listen({ port: Number(process.env.PORT) || 3333 }).then(({ url }) => {
  console.log(`🚀 Server running at ${url}`);
});
