// dbConfig.js

import { fileURLToPath } from "url";
import { dirname } from "path";
import { config } from "dotenv";
import mysql from "mysql2";

// Obtenir le chemin absolu du fichier .env
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Charger les variables d'environnement depuis .env
config({ path: `${__dirname}/.env` });

const connection = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
});

connection.connect((err) => {
  if (err) {
    console.error("Erreur de connexion à la base de données :", err);
    return;
  }
  console.log("Connexion à la base de données MySQL réussie");
});

export default connection;
