// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const User= require('./models/User')
const path = require('path'); // Nécessaire pour servir les fichiers statiques


const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../frontend'))); // Servir les fichiers statiques notamment login.html;register..
                    //pour servir ces fichiers, les rendre comme dispos depuis la racine

// Connexion à MongoDB (selon TP2)
mongoose
  .connect('mongodb://admin:1234@localhost:27017/examdb?authSource=admin')
  .then(() => console.log('MongoDB connecté'))
  .catch(err => console.error('Erreur MongoDB:', err));

// TODO: importer et utiliser vos routes d'authentification, d'examen, etc.
// ex. : app.use('/api/auth', require('./routes/auth'));



app.post('/users', async (req, res) => { 
try { 
const user = new User(req.body); 
await user.save(); 
res.status(201).json(user); 
} catch (err) { 
        res.status(400).json({ message: err.message }); 
    } 
}); 
 
 
// Route : Obtenir un user par id 
app.get('/users/:id', async (req, res) => { 
    try { 
        const user = await User.findOne({ id: req.params.id }); 
        if (!user) return res.status(404).json({ message: 'user non trouvé' }); 
        res.json(user); 
    } catch (err) { 
        res.status(500).json({ message: err.message }); 
    } 
}); 
//
// Route racine : redirige vers login.html
app.get("/", (req, res) => {
  res.redirect("/login.html"); // attention : chemin accessible depuis le navigateur
});


// Middleware 404 (à placer après toutes les routes)
app.use((req, res) => {
  res.status(404).send("Page non trouvée");
});

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});







