import { sequelize } from "./DB";
import "@/lib/models";

export async function syncDB() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({force: true});
    console.log("✅ Banco sincronizado");
  } catch (err) {
    console.error("❌ Erro ao sincronizar:", err);
  }
}