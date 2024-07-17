import express from 'express';
import { json } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import routes from './src/routers/router.js';
import connection from './dbConfig.js'; // Importez votre fichier de configuration de base de données

// Chargement des variables d'environnement depuis le fichier .env
dotenv.config();

const app = express();
const port = process.env.APP_PORT || 3000; // Utilisation de process.env pour définir le port par défaut

app.use(cors());

app.use(json());

// Connexion à la base de données
connection.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à la base de données :', err);
        return;
    }
    console.log('Connexion à la base de données MySQL réussie');
});

// Middleware pour passer la connexion à toutes les routes
app.use((req, res, next) => {
    req.db = connection;
    next();
});

// Routes
app.use("/api", routes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
