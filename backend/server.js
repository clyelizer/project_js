const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const path = require('path');
const User = require('./models/User');
const Examen = require('./models/Examen')
const Question = require('./models/Question')

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

// Route POST pour ajout de question
app.post('/questions', async (req, res) => {
  try {
    const question = new Question(req.body);
    await question.save();
    res.status(201).json({ message: 'question added avec succès' });
  } catch (err) {
    console.error("Erreur lors de l'ajout de la question:", err);
    res.status(400).json({ message: "Échec d'ajout de la question", error: err.message });
  }
});

// Route POST pour ajout d'examen
app.post('/examens', async (req, res) => {
  try {
    const examen = new Examen(req.body);
    await examen.save();
    res.status(201).json({ message: 'Exam added succesfully' });
  } catch (err) {
    console.error("Error while  Exam's adding", err);
    res.status(400).json({ message: "Error while  Exam's adding", error: err.message });
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


