import { JSONFileSyncPreset } from "lowdb/node";

const defaultData = {
  stats: [{ count_mutant_dna: 0, count_human_dna: 0,ratio:0 }],
};
const db =  JSONFileSyncPreset("db.json", defaultData);

// Inicialización de la base de datos con datos predeterminados
 function initDB() {
   db.read(); // Leer el archivo
}

 initDB()

export default db;
