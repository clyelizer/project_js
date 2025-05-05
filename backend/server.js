const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const path = require('path');
const User = require('./models/User');

const app = express();

// Middleware pour parser le JSON
app.use(express.json());
app.use(cookieParser());

// Servir les fichiers statiques depuis le dossier frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Connexion à MongoDB
mongoose
  .connect('mongodb://admin:1234@localhost:27017/examdb?authSource=admin')
  .then(() => console.log('✅ MongoDB connecté'))
  .catch(err => console.error('❌ Erreur MongoDB:', err));

// Route POST pour l'inscription des utilisateurs
app.post('/users', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ message: 'Utilisateur créé avec succès' });
  } catch (err) {
    console.error('Erreur lors de la création de l\'utilisateur:', err);
    res.status(400).json({ message: 'Échec de la création de l\'utilisateur', error: err.message });
  }
});

// Route racine : redirige vers login.html
app.get('/', (req, res) => {
  res.redirect('/login.html');
});

// Middleware 404
app.use((req, res) => {
  res.status(404).send('Page non trouvée');
});

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});
