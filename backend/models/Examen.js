const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  audience: { type: String },
  link: { type: String},
  questions: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Question' 
  }], //Référence + correction "ObjectId"  
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Examen', examSchema);
