document.addEventListener('DOMContentLoaded', () => {
  // Tab switching
  const tabs = document.querySelectorAll('.tab_btn');
  const contents = document.querySelectorAll('.tab_content');

  tabs.forEach(tab => tab.addEventListener('click', () => {
    tabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected','false'); });
    contents.forEach(c => { c.classList.remove('active'); c.hidden = true; });
    tab.classList.add('active'); tab.setAttribute('aria-selected','true');
    const target = document.getElementById(tab.getAttribute('data-target'));
    target.classList.add('active'); target.hidden = false;
  }));
  // Question builder and submission
  const addBtn = document.querySelector('.btn_add');
  let enteteAdded = false;
  let examId = null; // Store the exam ID for later use

  addBtn.addEventListener('click', async (e) => {
    e.preventDefault(); // Fixed syntax
    
      let numQuestion=1

      const list = document.getElementById('questionsList');
      const div = document.createElement('div'); div.className = 'question';
      div.innerHTML = `
        <h4>Question ${numQuestion++}</h4>
        <label>Type:</label>
        <select onchange="changerType(this)">
          <option value="qcm">QCM</option>
          <option value="directe">Direct Question--Response</option>
        </select>
        <textarea placeholder="Enter question text"></textarea>
        <label>Attachment:</label>
        <input type="file">
        <div class="zone-reponses"></div>
        <label>Points:</label>
        <input id='points' type="number" min="0">
        <label>Duration (sec):</label>
        <input id="duration" type="number" min="0">
      `;
      list.appendChild(div);
      genererChampsQCM(div.querySelector('.zone-reponses'));
    });

    window.changerType = (select) => {
      const zone = select.parentElement.querySelector('.zone-reponses');
      zone.innerHTML = '';
      if (select.value==='qcm') genererChampsQCM(zone);
      else genererChampsDirecte(zone);
    };
    function genererChampsQCM(container) {
      container.innerHTML = `
        <label>Options:</label>
        <div><input type="text" placeholder="Option 1"> <input id="checkbox" type="checkbox">correct </div>
        <div><input type="text" placeholder="Option 2"> <input id="checkbox" type="checkbox"> </div>
        <button type="button" onclick="addOption(this)">+ Option</button>
      `;
    }   
    window.addOption = (btn) => {
      const container = btn.parentElement;
      const div = document.createElement('div');
      div.innerHTML = `<div><input type="text" placeholder="Option "> <input id="checkbox" type="checkbox"></div>`;
      container.insertBefore(div, btn);
    };
    function genererChampsDirecte(container) {
      container.innerHTML = `
        <label>Answer:</label>
        <input type="text" placeholder="Enter answer">
        <label>Tolerance (%):</label>
        <input type="number" min="0" max="100">
      `;
    }
    
    // Preview
    document.querySelector('[data-target="preview"]').addEventListener('click', () => {
      // Get exam details
      const details = {
        title: document.getElementById('titre').value.trim(),
        description: document.getElementById('description').value.trim(),
        audience: document.getElementById('public').value.trim()
      };
    
      // Map questions data
      const questions = Array.from(document.querySelectorAll('.question')).map(q => ({
        type: q.querySelector('select').value,
        statement: q.querySelector('textarea').value.trim(),
        points: Number(q.querySelector('input[id="points"]').value) || 0,
        duration: Number(q.querySelector('input[id="duration"]').value) || 0,
        ...getAnswerData(q)
      }));
    
      // Generate and display preview
      document.getElementById('previewContent').innerHTML = generatePreviewHTML(details, questions);
      //generatePreviewHTML et les autres fonctions definies en bas
    });
    
    // Helper function to get answer data based on question type
    function getAnswerData(questionElement) {
      const zone = questionElement.querySelector('.zone-reponses');
      const type = questionElement.querySelector('select').value;
    
      if (type === 'qcm') {
        return {
          options: Array.from(zone.querySelectorAll('div')).map(div => ({
            text: div.querySelector('input[type="text"]').value.trim(),
            isCorrect: div.querySelector('input[type="checkbox"]').checked
          })),
          answer: '',
          tolerance: 0
        };
      }
    
      return {
        options: [],
        answer: zone.querySelector('input[type="text"]').value.trim(),
        tolerance: Number(zone.querySelector('input[type="number"]').value) || 0
      };
    }
    
    // Generate preview HTML with improved styling
    function generatePreviewHTML(details, questions) {
      return `
        <div class="preview-container">
          <h3 class="preview-title">Exam Preview</h3>
          <div class="preview-details">
            <p><strong>Title:</strong> ${details.title}</p>
            <p><strong>Description:</strong> ${details.description}</p>
            <p><strong>Audience:</strong> ${details.audience}</p>
          </div>
          <h4 class="questions-title">Questions:</h4>
          <ul class="questions-list">
            ${questions.map((q, i) => `
              <li class="question-item">
                <div class="question-header">
                  <span class="question-number">Question ${i + 1}</span>
                  <span class="question-type">${q.type === 'qcm' ? 'Multiple Choice' : 'Direct Answer'}</span>
                </div>
                <p class="question-text">${q.statement}</p>
                <div class="question-meta">
                  <span>Points: ${q.points}</span>
                  <span>Duration: ${q.duration}s</span>
                </div>
                ${q.type === 'qcm' ? generateQCMPreview(q.options) : generateDirectPreview(q)}
              </li>
            `).join('')}
          </ul>
        </div>
      `;
    }
    
    // Helper function for QCM preview
    function generateQCMPreview(options) {
      return `
        <div class="options-container">
          <p><strong>Options:</strong></p>
          <ul class="options-list">
            ${options.map(opt => `
              <li class="option-item ${opt.isCorrect ? 'correct' : ''}">
                ${opt.text}
                ${opt.isCorrect ? '<span class="correct-badge">✓</span>' : ''}
              </li>
            `).join('')}
          </ul>
        </div>
      `;
    }
    
    // Helper function for direct answer preview
    function generateDirectPreview(question) {
      return `
        <div class="direct-answer">
          <p><strong>Answer:</strong> ${question.answer}</p>
          <p><strong>Tolerance:</strong> ${question.tolerance}%</p>
        </div>
      `;
    }  
    


      //Publier l'examen

    const addQuestionBtn = document.querySelector('.btn_add');
    const publishBtn = document.getElementById('publishBtn');
    let questionCount = 1;

    publishBtn.addEventListener('click', async (e) => {
      e.preventDefault();

      // Récupérer les données de l'entête de l'examen
      const examData = {
        title: document.getElementById('titre').value.trim(),
        description: document.getElementById('description').value.trim(),
        audience: document.getElementById('public').value.trim(),
        questions: [] // Tableau pour stocker les questions
      };

      // Vérifier que l'entête est remplie
      if (!examData.title || !examData.description || !examData.audience) {
        alert('Please fill out the exam title, description, and audience.');
        return;
      }

      // Parcours de chaque question pour construire le tableau des questions
      const questions = Array.from(document.querySelectorAll('.question')).map(qElem => {
        const type = qElem.querySelector('select').value;
        const statement = qElem.querySelector('textarea').value.trim();
        const points = Number(qElem.querySelector('input[id="points"]').value) || 0;
        const duration = Number(qElem.querySelector('input[id="duration"]').value) || 0;

        let options = [];
        let answer = '';
        let tolerance = 0;

        const zone = qElem.querySelector('.zone-reponses');
        if (type === 'qcm') {
          options = Array.from(zone.querySelectorAll('div')).map(opt => ({
            text: opt.querySelector('input[type="text"]').value.trim(),
            isCorrect: opt.querySelector('input[type="checkbox"]').checked
          }));
        } else {
          answer = zone.querySelector('input[type="text"]').value.trim();
          tolerance = Number(zone.querySelector('input[type="number"]').value) || 0;
        }

        return { type, statement, points, duration, options, answer, tolerance };
      });

      // Vérifier qu'il y a au moins une question
      if (questions.length === 0) {
        alert('Please add at least one question.');
        return;
      }

      // Ajouter les questions à l'examen
    examData.questions = questions;

    // Envoi des données de l'examen au serveur
    try {
      const response = await axios.post('http://localhost:3000/examens', examData);

      if (response.status === 201) {
        // Récupérer l'ID de l'examen créé
        const examId = response.data.examId;

        // Générer le lien de l'examen
        const examLink = `http://localhost:3000/passer_examen.html?id=${examId}`;

        // Mettre à jour le lien de l'examen dans la base de données
        await axios.patch(`http://localhost:3000/examens/${examId}/link`, { link: examLink });

        // Afficher un message de succès et le lien généré
        const bilanDiv = document.querySelector('#bilan');
        bilanDiv.innerHTML = `
          <h3>Exam Published Successfully!</h3>
          <p>Your exam is now available at:</p>
          <a href="${examLink}" target="_blank">${examLink}</a>
        `;
        bilanDiv.style.display = 'block';
      } else {
        alert('An error occurred while publishing the exam. Please try again.');
      }
    } catch (error) {
      console.error('Error publishing exam:', error);
      alert('An error occurred while publishing the exam. Please try again.');
    }
  })

})