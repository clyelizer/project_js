
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
  let enteteAdded=false
  addBtn.addEventListener('click', async (e) => {
    //ce click ajoute header datas dans la base et ajoute les questions une a une
    e.target.preventDefault;
     //Ajout d'entete
    if(!enteteAdded){
      // Envoi des elements d'entete d'examen
      try {
        await axios.post('http://localhost:3000/examens', {
          title: document.getElementById('titre').value.trim(),
          description : document.getElementById('description').value.trim(),
          audience: document.getElementById('public').value.trim(),
          link:'',
          questions: []
        });
        enteteAdded=!enteteAdded
      } catch (error) {
        console.error('Error submitting questions:', error);
        alert('An error occurred. Please try again.');
      }
    }


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
      <input type="number" min="0">
      <label>Duration (sec):</label>
      <input type="number" min="0">
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
    const details = {
      titre: document.getElementById('titre').value,
      description: document.getElementById('description').value,
      public: document.getElementById('public').value
    };
    const questions = Array.from(document.querySelectorAll('.question')).map(q => ({
      text: q.querySelector('textarea').value,
      type: q.querySelector('select').value,
      points: q.querySelectorAll('input[type="number"]')[0].value,
      duration: q.querySelectorAll('input[type="number"]')[1].value
    }));
    document.getElementById('previewContent').textContent = JSON.stringify({ details, questions }, null, 2);
  });

  // Finish add  Publish

          //des le click sur l'etiquette finish, on commence la gestion des questions 
  document.getElementById('btn_finish').addEventListener('click', async(e) => {
    e.preventDefault()

    //ajoute ici lajout de toutes les questions dans la base
    //Parcours de chaque carte de question pour construire le payload
    const questions = Array.from(document.querySelectorAll('.question')).map(qElem => {
      const typeVal   = (qElem.querySelector('select').value === 'qcm') ? 'qcm' : 'direct';
      const statement = qElem.querySelector('textarea').value.trim();
      const score     = Number(qElem.querySelector('input[type="number"]').value) || 0;
      const duration  = Number(qElem.querySelectorAll('input[type="number"]')[1].value) || 0;
     // const qElem.querySelectorAll('input[type="file"]').files

      // Média (pas géré ici) : on envoie un tableau vide
      // const media = [];
      // media:
      // \[{ type: { type: String, enum: \["image", "audio", "video"] },
      // url: { type: String, required: true },
      // name: {type: String}
      // }], <input type="file">
      // gere media
      
      // Options ou réponse/tolérance selon le type
      let options   = [];
      let answer    = '';
      let tolerance = 0;
      const zone = qElem.querySelector('.zone-reponses');

      if (typeVal === 'qcm') {
        // Pour chaque option dans .zone-reponses
        zone.querySelectorAll('div').forEach(optDiv => {
          const text      = optDiv.querySelector('input[type="text"]').value.trim();
          const isCorrect = optDiv.querySelector('input[type="checkbox"]').checked;
          options.push(Object.assign({},{'text':text,"isCorrect":isCorrect}))
        });
      } else {
        // Question directe
        answer    = zone.querySelector('input[type="text"]').value.trim() || '';
        tolerance = Number(zone.querySelector('input[type="number"]').value) || 0;
      }

      media=[]
      return {
      type:      typeVal,       // "qcm" ou "direct"
      statement,
        media,     // renvoie ici le tableau « media » que vous aurez construit
        options,
        answer,
        tolerance,
        score,
        duration
      };
      


    });

    // 3. Envoi au serveur
    try {
        for (const qData of questions) {
          await axios.post('http://localhost:3000/questions', qData);
        }
        
      
      alert(`${questions.length} question(s) published successfully!`);
      
    } catch (err) {
      console.error('Erreur publication questions :', err);
      alert('Erreur lors de la publication des questions. Veuillez réessayer.');
    }

  });



});



