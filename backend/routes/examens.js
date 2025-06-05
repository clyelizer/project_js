const express = require('express');
const Examen = require('../models/Examen');
const Question = require('../models/Question');
const User = require('../models/User'); // Importer le modèle User
const router = express.Router();
// Route pour mettre à jour le lien d'un examen spécifique
router.patch('/:id/link', async (req, res) => {
  try {
    const { id } = req.params;
    const { link } = req.body;

    const exam = await Examen.findByIdAndUpdate(id, { link }, { new: true });

    if (!exam) {
      return res.status(404).json({ message: 'Exam not found' });
    }

    res.json({ message: 'Link updated successfully', exam });
  } catch (error) {
    console.error('Error updating exam link:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route pour créer un examen avec ses questions
router.post('/', async (req, res) => {
  try {
    const { title, description, audience, questions } = req.body;

    // Créer un nouvel examen
    const newExam = new Examen({
      title,
      description,
      audience,
      questions,
      link: '', // Le lien peut être généré plus tard
    });

    // Sauvegarder l'examen dans la base de données
    const savedExam = await newExam.save();

    res
      .status(201)
      .json({ message: 'Examen créé avec succès.', examId: savedExam._id });
  } catch (err) {
    console.error('Erreur lors de la création de l\'examen :', err);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});

// Route to get questions for a specific exam
router.get('/:idExam/questions', async (req, res) => {
  try {
    const { idExam } = req.params;
    const examen = await Examen.findById(idExam).populate('questions');

    if (!examen) {
      return res.status(404).json({ message: 'Exam not found' });
    }

    res.status(200).json({ questions: examen.questions });
  } catch (err) {
    console.error('Error fetching questions:', err);
    res
      .status(500)
      .json({ message: 'Error fetching questions', error: err.message });
  }
});

// Route to submit answers for a specific exam
router.post('/:idExam/submit', async (req, res) => {
  try {
    const { idExam } = req.params;
    const { answers } = req.body;

    const examen = await Examen.findById(idExam).populate('questions');

    if (!examen) {
      return res.status(404).json({ message: 'Exam not found' });
    }

    let score = 0;
    examen.questions.forEach((question, index) => {
      if (question.correctAnswer === answers[index]) {
        score++;
      }
    });

    res.status(200).json({ message: 'Exam submitted successfully', score });
  } catch (err) {
    console.error('Error submitting exam:', err);
    res
      .status(500)
      .json({ message: 'Error submitting exam', error: err.message });
  }
});

module.exports = router;
