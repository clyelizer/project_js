require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors'); // Si nécessaire
const path = require('path');
const authRoutes = require('./routes/auth');
const examenRoutes = require('./routes/examens'); // Import des routes pour les examens
const geolocalisationRoutes = require('./routes/geolocalisation'); // Importer les routes de géolocalisation

const User = require('./models/User');
const Examen = require('./models/Examen');
const Question = require('./models/Question');

const app = express();

// Middleware pour parser le JSON
app.use(express.json());
app.use(cookieParser());
app.use(cors()); // Si vous utilisez un frontend séparé
app.use('/examens', examenRoutes); // Enregistre les routes pour les examens

// Servir les fichiers statiques depuis le dossier frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Connexion à MongoDB
mongoose
  .connect('mongodb://admin:1234@localhost:27017/examdb?authSource=admin')
  .then(() => console.log('MongoDB connecté'))
  .catch(err => console.error('Erreur MongoDB:', err));

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
//
// partie a effacer
// // Route POST pour la connexion des utilisateurs
// app.post('/api/auth', async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Vérifiez si l'utilisateur existe
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: 'Utilisateur non trouvé' });
//     }

//     // Vérifiez si le mot de passe est correct
//     const isPasswordValid = await user.comparePassword(password); // Assurez-vous que la méthode comparePassword existe dans votre modèle User
//     if (!isPasswordValid) {
//       return res.status(401).json({ message: 'Mot de passe incorrect' });
//     }

//     // Générer un token ou gérer la session ici
//     res.status(200).json({ message: 'Connexion réussie', user });
//   } catch (err) {
//     console.error('Erreur lors de la connexion:', err);
//     res.status(500).json({ message: 'Erreur interne du serveur', error: err.message });
//   }
// });








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
    console.error("Error while Exam's adding", {
      error: err,
      requestBody: req.body
    });
    res.status(500).json({ message: "Error while Exam's adding", error: err.message });
  }
});

// Route racine : redirige vers login.html
app.get('/', (req, res) => {
  res.redirect('/login.html');
});

// Toutes les routes définies dans authRoutes seront préfixées par /api/auth
app.use('/api/auth', authRoutes);
app.use('/api/auth', geolocalisationRoutes); // Enregistrer les routes sous le préfixe /api/auth
// Middleware 404
app.use((req, res) => {
  res.status(404).json({ message: 'Page non trouvée' });
});

// Démarrage du serveur
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});

