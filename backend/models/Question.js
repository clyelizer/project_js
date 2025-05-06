const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  type: { type: String, required: true, enum: ["direct", "qcm"] },
  statement: { type: String }, //cest l'enonce
  media: 
  [{ type: { type: String, enum: ["image", "audio", "video"] },
    url: { type: String, required: true },
    name: {type: String} 
    }],
  answer: { type: String },
  tolerance: { type: Number },
  // Pour les QCM :
  options: [{
    text: { type: String },
    isCorrect: { type: Boolean, default: false }
  }],
  score: { type: Number, required: true }, 
  duration: { type: Number, required: true }, 
});

module.exports = mongoose.model('Question', questionSchema);
