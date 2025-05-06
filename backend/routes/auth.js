const express = require('express');
const bcrypt = require('bcrypt'); // Pour comparer les mots de passe
const jwt = require('jsonwebtoken'); // Pour générer un JWT
const User = require('../models/User'); // Importer le modèle User
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    // 1. Récupérer email et password depuis req.body
    const { email, password } = req.body;

    // 2. Vérifier l'existence de l'utilisateur avec User.findOne({ email })
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Utilisateur non trouvé.' });
    }

    // 3. Comparer les mots de passe avec bcrypt.compare()
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Mot de passe incorrect.' });
    }

    // 4. Générer un JWT si tout est valide
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      'votre_secret_jwt', // Remplacez par une clé secrète sécurisée
      { expiresIn: '1h' }
    );

    // 5. Renvoyer le token au client
    res.status(200).json({ token });
  } catch (err) {
    console.error('Erreur lors de la connexion :', err);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});

module.exports = router;
