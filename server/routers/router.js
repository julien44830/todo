// Exemple de route dans votre fichier router.js
import express from "express";
const router = express.Router();
import jwt from "jsonwebtoken";
import middleware from "../middleWare/secu.js"; // Chemin vers votre fichier

const { validationPassword, hashPassword, verifyPassword, authenticateToken } =
    middleware;

// Route pour lire les données de la table tache
router.get("/taches", authenticateToken, async (req, res) => {
    try {
        const db = req.db;
        const userId = req.user.sub; // L'ID de l'utilisateur est stocké dans `sub` du payload du token

        // Requête SQL pour récupérer les tâches de l'utilisateur
        const [rows] = await db
            .promise()
            .query("SELECT * FROM tache WHERE user_id = ?", [userId]);
        res.json(rows);
    } catch (err) {
        console.error("Erreur lors de la récupération des tâches :", err);
        res.status(500).json({
            error: "Erreur lors de la récupération des tâches",
        });
    }
});

// Route pour lire les données de la table soustache
router.get("/soustaches", async (req, res) => {
    try {
        const db = req.db;
        const [rows] = await db.promise().query("SELECT * FROM soustache");
        res.json(rows);
    } catch (err) {
        console.error("Erreur lors de la récupération des tâches :", err);
        res.status(500).json({
            error: "Erreur lors de la récupération des tâches",
        });
    }
});

// Route pour créer une nouvelle tâche
router.post("/taches", authenticateToken, async (req, res) => {
    try {
        const db = req.db;
        const { titre, description } = req.body;

        // Suppose que l'ID de l'utilisateur est stocké dans req.user.id après l'authentification
        const userId = req.user.sub;

        // Requête pour insérer une nouvelle tâche associée à l'utilisateur
        const query =
            "INSERT INTO tache (titre, description, user_id) VALUES (?, ?, ?)";
        const [result] = await db
            .promise()
            .query(query, [titre, description, userId]);

        // Requête pour sélectionner la nouvelle tâche créée
        const selectQuery = "SELECT * FROM tache WHERE id = ?";
        const [newTask] = await db
            .promise()
            .query(selectQuery, [result.insertId]);

        res.status(201).json({
            message: "Tâche créée avec succès",
            task: newTask[0],
        });
    } catch (err) {
        console.error("Erreur lors de la création de la tâche :", err);
        res.status(500).json({
            error: "Erreur lors de la création de la tâche",
        });
    }
});

// Route pour supprimer une tache
router.delete("/taches/:id", async (req, res) => {
    const idTache = req.params.id;
    try {
        const db = req.db;

        await db.promise().beginTransaction();

        const queryDeleteSoustaches =
            "DELETE FROM soustache WHERE tache_id = ?";
        await db.promise().query(queryDeleteSoustaches, [idTache]);

        const queryDeleteTache = "DELETE FROM tache WHERE id = ?";
        const [result] = await db.promise().query(queryDeleteTache, [idTache]);

        // Valide la transaction
        await db.promise().commit();

        res.status(200).json({
            message: "Tâche supprimée avec succès",
            deletedTaskId: idTache,
        });
    } catch (err) {
        console.error("Erreur lors de la suppression de la tâche :", err);

        // En cas d'erreur, annule la transaction pour éviter les modifications accidentelles
        await db.promise().rollback();

        res.status(500).json({
            error: "Erreur lors de la suppression de la tâche",
        });
    }
});

// Route pour mettre à jour une tâche
router.put("/taches/:id", async (req, res) => {
    const idTache = req.params.id;
    const { titre, description } = req.body;

    try {
        const db = req.db;
        const query =
            "UPDATE tache SET titre = ?, description = ? WHERE id = ?";
        const [result] = await db
            .promise()
            .query(query, [titre, description, idTache]);

        if (result.affectedRows === 0) {
            res.status(404).json({
                error: "Tâche non trouvée",
            });
        } else {
            const [updatedTask] = await db
                .promise()
                .query("SELECT * FROM tache WHERE id = ?", [idTache]);
            res.status(200).json({
                message: "Tâche mise à jour avec succès",
                task: updatedTask[0],
            });
        }
    } catch (err) {
        console.error("Erreur lors de la mise à jour de la tâche :", err);
        res.status(500).json({
            error: "Erreur lors de la mise à jour de la tâche",
        });
    }
});

// route pour créer un utilisateur
router.post("/user", validationPassword, hashPassword, async (req, res) => {
    try {
        const db = req.db;
        const { name, email, password } = req.body;
        const query =
            "INSERT INTO user (name, email, password) VALUES (?, ?, ?)";
        const [result] = await db
            .promise()
            .query(query, [name, email, password]);

        const selectQuery = "SELECT * FROM user WHERE id = ?";
        const [newUser] = await db
            .promise()
            .query(selectQuery, [result.insertId]);

        res.status(201).json({
            message: "User créée avec succès",
            user: newUser[0],
        });
    } catch (err) {
        console.error("Erreur lors de la création du User :", err);
        res.status(500).json({
            error: "Erreur lors de la création du User",
        });
    }
});

// route pour connecter un utilisaterur
router.post("/login", async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const db = req.db;
        const [rows] = await db
            .promise()
            .query("SELECT * FROM user WHERE email = ?", [email]);
        const user = rows[0];

        if (!user) {
            return res.sendStatus(401); // Utilisateur non trouvé
        }

        // Vérification du mot de passe
        const isPasswordValid = await verifyPassword(password, user.password);
        if (!isPasswordValid) {
            return res.sendStatus(401); // Mot de passe invalide
        }

        const payload = { sub: user.id };
        const token = jwt.sign(payload, process.env.APP_SECRET, {
            expiresIn: "1h",
        });

        delete user.password;

        return res.status(200).json({ token, user });
    } catch (error) {
        console.error("Erreur lors de la connexion de l'utilisateur :", error);
        return next(error);
    }
});

export default router;
