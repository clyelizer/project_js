// js/passer_examen.js
// Ce script gère la logique complète de l'examen en ligne :
// - Protection contre le rafraîchissement
// - Authentification via JWT
// - Demande de géolocalisation
// - Chargement des questions
// - Affichage séquentiel avec minuterie
// - Sauvegarde des réponses et calcul du score

setTimeout(() => {
  // Empêcher le rafraîchissement ou la fermeture accidentelle
  window.addEventListener('beforeunload', (e) => {
    e.preventDefault();
    e.returnValue = '';
  });

  // Récupérer l'ID de l'examen depuis l'URL
  const urlParams = new URLSearchParams(window.location.search);
  const idExam = urlParams.get('id');
  if (!idExam) {
    alert('Exam ID is missing in the URL.');
    throw new Error('Exam ID is required.');
  }

  // Vérifie la présence et la validité du JWT
  async function checkAuthentication() {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Vous devez être connecté pour passer cet examen.');
      window.location.href = '/login.html';
      return false;
    }
    try {
      const response = await fetch('http://localhost:3000/api/auth', {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!response.ok) throw new Error('Utilisateur non authentifié');
      return true;
    } catch (error) {
      console.error("Erreur lors de la vérification de l'authentification : ", error);
      alert('Vous devez être connecté pour passer cet examen.');
      window.location.href = '/login.html';
      return false;
    }
  }

  // Demande de géolocalisation avant de lancer l'examen
  async function requestGeolocation() {
    const isAuthenticated = await checkAuthentication();
    if (!isAuthenticated) return;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          saveGeolocation(latitude, longitude);
          startExam();
        },
        (error) => {
          console.error('Geolocation error:', error);
          alert('Geolocation is required to start the exam.');
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  }

  // Envoie la position au serveur
  function saveGeolocation(latitude, longitude) {
    fetch('http://localhost:3000/api/auth/update-location', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ latitude, longitude })
    })
      .then(response => {
        if (!response.ok) throw new Error('Failed to save geolocation');
        console.log('Geolocation saved successfully');
      })
      .catch(error => console.error('Error saving geolocation:', error));
  }

  // Lancement de l'examen
  function startExam() {
    init();
  }

  // Chargement des questions depuis l'API
  async function fetchQuestions() {
    try {
      const response = await fetch(`http://localhost:3000/examens/${idExam}/questions`);
      if (!response.ok) throw new Error('Failed to fetch questions');
      const data = await response.json();
      return data.questions;
    } catch (error) {
      console.error('Error fetching questions:', error);
      alert('Error fetching questions. Please try again later.');
    }
  }

  // Variables de contrôle
  let currentQuestionIndex = 0;
  let answers = [];
  let timer;

  // Affiche une question et configure les boutons et le timer
  function displayQuestion(questions) {
    const questionContainer = document.getElementById('question_container');
    const question = questions[currentQuestionIndex];

    questionContainer.innerHTML = `
      <div>
        <h3>Question ${currentQuestionIndex + 1}:</h3>
        <p id="quest_text">${question.statement || question.text}</p>
        <input type="text" id="answer" placeholder="Your answer here">
      </div>
      <div id="timer">Time left: ${question.duration} seconds</div>
      <button id="next-btn">Next</button>
    `;

    // Bouton pour enregistrer la réponse
    const answerButton = document.createElement('button');
    answerButton.id = 'answer-btn';
    answerButton.textContent = 'Répondre';
    answerButton.addEventListener('click', () => {
      saveAnswerResponse(question);
      clearInterval(timer);
      moveToNextQuestion(questions);
    });
    const nextButton = document.getElementById('next-btn');
    nextButton.parentNode.insertBefore(answerButton, nextButton.nextSibling);

    // Démarrer le timer pour cette question
    startTimer(question.duration, questions, question);
  }

  // Sauvegarde la réponse de l'utilisateur dans le tableau answers
  function saveAnswerResponse(question) {
    const answerInput = document.getElementById('answer');
    const userAnswer = answerInput.value.trim();
    answers[currentQuestionIndex] = { ...question, userAnswer };
  }

  // Passe à la question suivante ou termine
  function moveToNextQuestion(questions) {
    if (currentQuestionIndex < questions.length - 1) {
      currentQuestionIndex++;
      displayQuestion(questions);
    } else {
      calculateScore(questions);
    }
  }

  // Calcule et affiche le score
  function calculateScore(questions) {
    const totalPoints = questions.reduce((sum, q) => sum + (q.points || 1), 0);
    let score = 0;
    answers.forEach((answer, idx) => {
      const correct = questions[idx].answer;
      if (answer.userAnswer && correct && answer.userAnswer.toLowerCase() === correct.toLowerCase()) {
        score += questions[idx].points || 1;
      }
    });
    const scorePercentage = (score * 100) / totalPoints;

    // Afficher les résultats
    const questionContainer = document.getElementById('question_container');
    questionContainer.style.display = 'none';
    document.querySelector('h1').textContent = 'Results';
    const resultContainer = document.createElement('div');
    resultContainer.innerHTML = `<h2>Your Score: ${scorePercentage.toFixed(2)} / 100 pts</h2>`;
    document.body.appendChild(resultContainer);
    console.log('All User Answers:', answers);
  }

  // Gestion du timer avec sauvegarde automatique à zéro
  function startTimer(duration, questions, question) {
    let timeLeft = duration;
    const timerElement = document.getElementById('timer');
    timer = setInterval(() => {
      timeLeft--;
      timerElement.textContent = `Time left: ${timeLeft} seconds`;
      if (timeLeft <= 0) {
        clearInterval(timer);
        saveAnswerResponse(question);
        moveToNextQuestion(questions);
      }
    }, 1000);
  }

  // Initialisation de l'examen
  async function init() {
    const questions = await fetchQuestions();
    if (questions && questions.length > 0) {
      displayQuestion(questions);
    } else {
      alert('No questions found for this exam.');
    }
  }

  // Lancer la géolocalisation puis l'examen
  requestGeolocation();

  // Gestion du bouton de déconnexion
  document.getElementById('Deconnexion').addEventListener('click', () => {
    // Supprimer le token JWT du stockage local
    localStorage.removeItem('token');

    // Optionnel : Nettoyer d'autres données utilisateur si nécessaire
    sessionStorage.clear();

    // Rediriger vers la page de connexion
    window.location.href = '/login.html';
  });
}, 3000);
