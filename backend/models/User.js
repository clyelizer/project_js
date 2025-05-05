const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  naissance: { type: Date, required: true },
  sexe: { type: String, required: true },
  etablissement: { type: String, required: true },
  filiere: { type: String, required: true }
});

module.exports = mongoose.model('User', userSchema);
