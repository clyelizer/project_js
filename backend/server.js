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

const app = express();

// Middleware pour parser le JSON
app.use(express.json());
app.use(cookieParser());
app.use(cors()); // Si vous utilisez un frontend séparé
app.use('/api/v1/examens', examenRoutes); // Enregistre les routes pour les examens

// Servir les fichiers statiques depuis le dossier frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Connexion à MongoDB
mongoose
  .connect('mongodb://admin:1234@localhost:27017/examdb?authSource=admin')
  .then(() => console.log('MongoDB connecté'))
  .catch(err => console.error('Erreur MongoDB:', err));

// Route racine : redirige vers login.html
app.get('/', (req, res) => {
  res.redirect('/login.html');
});

// Toutes les routes définies dans authRoutes seront préfixées par /api/auth
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/geolocation', geolocalisationRoutes); // Enregistrer les routes sous le préfixe /api/auth
// Middleware 404
app.use((req, res) => {
  res.status(404).json({ message: 'Page non trouvée' });
});

// Démarrage du serveur
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});

