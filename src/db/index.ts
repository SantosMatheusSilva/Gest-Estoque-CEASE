//conexão com a base de dados e configuração inicial.
//conection string, para ser exportada e usada nas queries.
import postegres from "postgres";

export const sql = postegres(process.env.DATABASE_URL!);

export function connectToDatabase() {
  try {
    console.log("Conexão com o banco de dados estabelecida com sucesso.");
    return sql;
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error);
  }
}

