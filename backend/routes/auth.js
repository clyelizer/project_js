// routes/auth.js

require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');           // Pour comparer les mots de passe
const jwt = require('jsonwebtoken');        // Pour générer et vérifier le JWT
const User = require('../models/User');     // Import du modèle User
const router = express.Router();

/**
 * POST /api/auth       (Login)
 * Associe email/password, renvoie un JWT si la connexion est réussie
 */
router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Vérifier que l'utilisateur existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Utilisateur non trouvé.' });
    }

    // 2. Comparer les mots de passe
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Mot de passe incorrect.' });
    }

    // 3. Générer un JWT
    const payload = { userId: user._id, email: user.email };
    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // 4. Retourner le token au client
    res.json({ token });
  } catch (err) {
    console.error('Erreur lors de la connexion :', err);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});

/**
 * Middleware: authenticateToken
 * Vérifie la présence et la validité du JWT dans l'en-tête Authorization
 */
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Token manquant.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token invalide.' });
    }
    req.user = user; // { userId, email, iat, exp }
    next();
  });
}

/**
 * GET /api/auth       (Vérification du token)
 * Renvoie 200 si le token est valide
 */
router.get('/', authenticateToken, (req, res) => {
  res.json({ message: 'Authenticated', user: req.user });
});

module.exports = router;
