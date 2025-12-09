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
  context: ({ req }): { user: AuthUser | null } => {
    const user = getUserFromToken(req);
    console.log("Token recebido do frontend:", req.headers.authorization);
    console.log("Usuário decodificado no context:", user);
    return { user };
  },
});

server.listen({ port: Number(process.env.PORT) || 3333 }).then(({ url }) => {
  console.log(`🚀 Server running at ${url}`);
});
