const mongoose = require('mongoose'); 
const UserSchema = new mongoose.Schema({ 
id: { type: Number, required: true, unique: true }, 
email: { type: String, required: true,unique: true }, 
nom: { type: String, required: true }, 
prenom: { type: String, required: true }, 
naissance: { type: Date, required: true }, 
sexe: { type: String, required: true }, 
etablissement: { type: String, required: true }, 
filiere: { type: String, required: true }
}); 
module.exports = mongoose.model('User', UserSchema);