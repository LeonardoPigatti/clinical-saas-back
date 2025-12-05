import { User } from "../models/User";
import bcrypt from "bcrypt";

export const resolvers = {
  Query: {
    hello: () => "Hello GraphQL!",
  },
  Mutation: {
    registerUser: async (_: any, args: any) => {
      const { name, email, password, role, companyId } = args;

      const existingUser = await User.findOne({ email });
      if (existingUser) throw new Error("Email já cadastrado");

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = new User({
        name,
        email,
        password: hashedPassword,
        role: role || "staff",
        companyId,
      });

      await user.save();
      return user;
    },
  },
};
