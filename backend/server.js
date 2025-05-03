const express = require('express');
const Database = require('better-sqlite3');
const bcrypt = require('bcryptjs');
const path = require('path');

const app = express();
const db = new Database('./database/users.db');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Création de la table users avec les nouveaux champs
db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nom TEXT NOT NULL,
        prenom TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        sexe TEXT NOT NULL,
        school TEXT NOT NULL,
        filiere TEXT NOT NULL,
        naissance TEXT NOT NULL
    )
`);

// Route d'inscription modifiée
app.post('/api/register', async (req, res) => {
    const { nom, prenom, email, password, sexe, school, filiere, naissance } = req.body;

    // Validation étendue
    if (!nom || !prenom || !email || !password || !sexe || !school || !filiere || !naissance) {
        return res.status(400).json({ 
            success: false,
            error: 'Tous les champs obligatoires doivent être remplis' 
        });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const stmt = db.prepare(`
            INSERT INTO users 
            (nom, prenom, email, password, sexe, school, filiere, naissance)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `);
        
        const result = stmt.run(
            nom,
            prenom,
            email,
            hashedPassword,
            sexe,
            school,
            filiere,
            naissance
        );

        res.status(201).json({ 
            success: true,
            id: result.lastInsertRowid 
        });

    } catch (err) {
        if (err.message.includes('UNIQUE constraint failed')) {
            res.status(400).json({ 
                success: false,
                error: 'Cet email est déjà utilisé' 
            });
        } else {
            console.error('Erreur DB:', err);
            res.status(500).json({ 
                success: false,
                error: 'Erreur serveur' 
            });
        }
    }
});

// Route de connexion unique et optimisée
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ 
                success: false,
                error: "Email et mot de passe requis" 
            });
        }

        const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({
                success: false,
                error: "Identifiants incorrects"
            });
        }

        res.json({
            success: true,
            user: {
                id: user.id,
                nom: user.nom,
                email: user.email,
                password: user.password,
                school: user.school,
                filiere: user.filiere
            }
        });

    } catch (err) {
        console.error('Erreur de connexion:', err);
        res.status(500).json({
            success: false,
            error: "Erreur serveur"
        });
    }
});

// Routes supplémentaires
app.get('/api/register', (req, res) => {
    res.json({ 
        success: true,
        message: 'Le serveur fonctionne correctement.',
        timestamp: new Date().toISOString()
    })
    })



app.get('/api/ping', (req, res) => {
    res.json({ message: 'Le serveur fonctionne correctement.' });
});

app.get('/', (req, res) => {
    res.redirect('/signin.html');
});

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});