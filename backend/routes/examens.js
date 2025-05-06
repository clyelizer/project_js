const express = require('express');
const Examen = require('../models/Examen');
const router = express.Router();


router.patch('/:id/link', async (req, res) => {
    try {
      const { id } = req.params;
      const { link } = req.body;
  
      const exam = await Examen.findByIdAndUpdate(
        id,
        { link },
        { new: true }
      );
  
      if (!exam) {
        return res.status(404).json({ message: 'Exam not found' });
      }
  
      res.json({ message: 'Link updated successfully', exam });
    } catch (error) {
      console.error('Error updating exam link:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

// Route pour mettre à jour le lien d'un examen
router.patch('/link', async (req, res) => {
  try {
    const { link } = req.body;

    // Mettez à jour le lien de l'examen (vous pouvez ajouter une condition pour cibler un examen spécifique)
    const updatedExam = await Examen.findOneAndUpdate(
      {}, // Ajoutez une condition ici si nécessaire, par exemple { _id: req.body.examId }
      { link },
      { new: true }
    );

    if (!updatedExam) {
      return res.status(404).json({ message: 'Examen non trouvé.' });
    }

    res.status(200).json({ message: 'Lien mis à jour avec succès.', exam: updatedExam });
  } catch (err) {
    console.error('Erreur lors de la mise à jour du lien :', err);
    res.status(500).json({ message: 'Erreur serveur.' });
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
      link: '' // Le lien peut être généré plus tard
    });

    // Sauvegarder l'examen dans la base de données
    const savedExam = await newExam.save();

    res.status(201).json({ message: 'Examen créé avec succès.', examId: savedExam._id });
  } catch (err) {
    console.error('Erreur lors de la création de l\'examen :', err);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});

module.exports = router;