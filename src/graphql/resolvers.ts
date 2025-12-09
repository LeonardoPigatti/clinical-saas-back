import { User } from "../models/User";
import { Company } from "../models/Company";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export const resolvers = {
  Query: {
    hello: () => "Hello GraphQL!",
            getUserCompanies: async (_: any, args: any) => {
      // args.user é o user que vem do frontend
      const user = args.user;

      if (!user) throw new Error("Usuário não informado");

      // Pega todas as companies do usuário (companyId ou adminId)
      const companies = await Company.find({
        $or: [
          { adminId: user.id },        // se ele é admin
          { _id: user.companyId },     // se ele pertence a uma company
        ],
      });

      return companies;
    },
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

    login: async (_: any, args: any) => {
      const { email, password } = args;

      // Verifica usuário
      const user = await User.findOne({ email });
      if (!user) throw new Error("Usuário não encontrado");

      // Verifica senha
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) throw new Error("Senha incorreta");

      // Gera token JWT
      const token = jwt.sign(
        { userId: user._id, companyId: user.companyId, role: user.role },
        JWT_SECRET,
        { expiresIn: "7d" }
      );

      return { token, user };
    },

       createCompany: async (_: any, args: any, context: any) => {
      // Pega o usuário direto do args (frontend envia o user completo)
      const user = args.user;

      if (!user || user.role !== "admin") {
        throw new Error("Somente admins podem criar companies");
      }

      const company = new Company({
        name: args.name,
        adminId: user.id,
      });
      await company.save();

      // Atualiza companyId do admin no banco
      const adminUser = await User.findById(user.id);
      if (adminUser) {
        adminUser.companyId = company._id.toString();
        await adminUser.save();
      }

      return company;
    },

     deleteCompany: async (_: any, args: any) => {
    const { companyId, user } = args;

    if (!user || user.role !== "admin") {
      throw new Error("Não autorizado");
    }

    const company = await Company.findById(companyId);
    if (!company) throw new Error("Company não encontrada");

    if (company.adminId.toString() !== user.id) {
      throw new Error("Você só pode excluir sua própria company");
    }

    await company.deleteOne();

    return { id: companyId, name: company.name, adminId: company.adminId };
  },

    updateCompany: async (_: any, args: any) => {
    const { companyId, newName, user } = args;

    // Confere se o usuário é admin e dono da company
    if (!user || user.role !== "admin") {
      throw new Error("Não autorizado");
    }

    const company = await Company.findById(companyId);
    if (!company) throw new Error("Company não encontrada");

    if (company.adminId.toString() !== user.id) {
      throw new Error("Você só pode editar sua própria company");
    }

    company.name = newName;
    await company.save();

    return company;
  },


  },
  };

