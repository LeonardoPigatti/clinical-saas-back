import { app } from "./app";
import { connectDB } from "./config/database";

const PORT = process.env.PORT || 3333;

async function start() {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`🚀 Backend rodando em http://localhost:${PORT}`);
  });
}

start();
