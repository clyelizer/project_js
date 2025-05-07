const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken'); // Importer jwt pour décoder le token

// Route pour mettre à jour la géolocalisation d'un utilisateur
router.post('/update-location', async (req, res) => {
    try {
        const { latitude, longitude } = req.body;

        if (!latitude || !longitude) {
            return res.status(400).json({ message: 'Latitude et longitude sont requis.' });
        }

        // Extraire l'utilisateur à partir du token JWT
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Token manquant ou invalide.' });
        }

        const decoded = jwt.verify(token, 'votre_secret_jwt'); // Remplacez par votre clé secrète JWT
        const userId = decoded.userId;

        // Mettre à jour la localisation dans la base de données pour l'utilisateur connecté
        await User.findByIdAndUpdate(userId, { localisation: `${latitude}, ${longitude}` });

        console.log(`Géolocalisation reçue : Latitude ${latitude}, Longitude ${longitude}`);

        res.status(200).json({ message: 'Géolocalisation mise à jour avec succès.' });
    } catch (error) {
        console.error('Erreur lors de la mise à jour de la géolocalisation :', error);
        res.status(500).json({ message: 'Erreur serveur.' });
    }
});

module.exports = router;