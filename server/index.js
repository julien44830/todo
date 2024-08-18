import express from "express";
import { json } from "express";
import dotenv from "dotenv";
import cors from "cors";
import routes from "./routers/router.js";
import connection from "./dbConfig.js"; // Importez votre fichier de configuration de base de données

// Chargement des variables d'environnement depuis le fichier .env
dotenv.config();

const app = express();
const port = process.env.APP_PORT || 3000; // Utilisation de process.env pour définir le port par défaut

app.use(cors());

app.use(json());

// Connexion à la base de données
connection.connect((err) => {
    if (err) {
        console.error("Erreur de connexion à la base de données :", err);
        return;
    }
});

// Middleware pour passer la connexion à toutes les routes
app.use((req, res, next) => {
    req.db = connection;
    next();
});

// Routes
app.use("/api", routes);

// Route pour lire toutes les tâches
app.get("/api/taches", async (req, res) => {
    try {
        const db = req.db;
        const [rows] = await db.promise().query("SELECT * FROM tache");
        res.json(rows);
    } catch (err) {
        console.error("Error fetching tasks:", err);
        res.status(500).json({
            error: "Error fetching tasks",
        });
    }
});

// Route pour créer une nouvelle tâche
app.post("/api/taches", async (req, res) => {
    try {
        const db = req.db;
        const { titre, description } = req.body;
        const query = "INSERT INTO tache (titre, description) VALUES (?, ?)";
        const [result] = await db.promise().query(query, [titre, description]);

        const selectQuery = "SELECT * FROM tache WHERE id = ?";
        const [newTask] = await db
            .promise()
            .query(selectQuery, [result.insertId]);

        res.status(201).json({
            message: "Tâche créée avec succès",
            task: newTask[0],
        });
    } catch (err) {
        console.error("Error creating task:", err);
        res.status(500).json({
            error: "Error creating task",
        });
    }
});

// Route pour mettre à jour une tâche
app.put("/api/taches/:id", async (req, res) => {
    const id = req.params.id;
    const { titre, description } = req.body;

    try {
        const db = req.db;
        const query =
            "UPDATE tache SET titre = ?, description = ? WHERE id = ?";
        const [result] = await db
            .promise()
            .query(query, [titre, description, id]);

        if (result.affectedRows === 0) {
            throw new Error(`Task with id ${id} not found`);
        }

        const selectQuery = "SELECT * FROM tache WHERE id = ?";
        const [updatedTask] = await db.promise().query(selectQuery, [id]);

        res.status(200).json({
            message: "Task updated successfully",
            task: updatedTask[0],
        });
    } catch (err) {
        console.error("Error updating task:", err);
        res.status(500).json({
            error: "Error updating task",
        });
    }
});

// Route pour supprimer une tâche
app.delete("/api/taches/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const db = req.db;
        const query = "DELETE FROM tache WHERE id = ?";
        const [result] = await db.promise().query(query, [id]);

        if (result.affectedRows === 0) {
            throw new Error(`Task with id ${id} not found`);
        }

        res.status(200).json({
            message: "Task deleted successfully",
            deletedTaskId: id,
        });
    } catch (err) {
        console.error("Error deleting task:", err);
        res.status(500).json({
            error: "Error deleting task",
        });
    }
});

// Route pour lire toutes les sous-tâches
app.get("/api/soustaches", async (req, res) => {
    try {
        const db = req.db;
        const [rows] = await db.promise().query("SELECT * FROM soustache");
        res.json(rows);
    } catch (err) {
        console.error("Error fetching subtasks:", err);
        res.status(500).json({
            error: "Error fetching subtasks",
        });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
