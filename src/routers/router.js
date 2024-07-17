// Exemple de route dans votre fichier router.js
import express from 'express';
const router = express.Router();

router.get('/taches', async (req, res) => {
    console.log("je suis la")
    try {
        const db = req.db;
        const [rows] = await db.promise().query('SELECT * FROM tache');
        res.json(rows);
    } catch (err) {
        console.error('Erreur lors de la récupération des tâches :', err);
        res.status(500).json({ error: 'Erreur lors de la récupération des tâches' });
    }
});

router.get('/soustaches', async (req, res) => {
    console.log("je suis la")
    try {
        const db = req.db;
        const [rows] = await db.promise().query('SELECT * FROM soustache');
        res.json(rows);
    } catch (err) {
        console.error('Erreur lors de la récupération des tâches :', err);
        res.status(500).json({ error: 'Erreur lors de la récupération des tâches' });
    }
});


router.post('/soustaches', async (req, res) => {
    console.log("je suis la")
    try {
        const db = req.db;
        const [rows] = await db.promise().query('SELECT * FROM soustache');
        res.json(rows);
    } catch (err) {
        console.error('Erreur lors de la récupération des tâches :', err);
        res.status(500).json({ error: 'Erreur lors de la récupération des tâches' });
    }
});

export default router;
