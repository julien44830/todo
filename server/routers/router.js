// Exemple de route dans votre fichier router.js
import express from "express";
const router = express.Router();

// Route pour lire les données de la table tache
router.get("/taches", async (req, res) => {
    try {
        const db = req.db;
        const [rows] = await db.promise().query("SELECT * FROM tache");
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
router.post("/taches", async (req, res) => {
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

export default router;
