
import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/cinemovies_db";

async function run() {
  try {
    await mongoose.connect(uri);

    console.log(" Executando Seed...");

   
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("Senha123!", 10);

    const users = [
      {
        name: "Admin",
        email: "admin@example.com",
        password: passwordHash,
      },
      {
        name: "Joao",
        email: "user@example.com",
        password: passwordHash,
      }
    ];

    await User.insertMany(users);

    console.log("✔ Seed concluído: Usuários criados com sucesso.");
    process.exit(0);

  } catch (err) {
    console.error("❌ Erro no Seed:", err);
    process.exit(1);
  }
}

run();
