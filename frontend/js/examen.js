
document.addEventListener('DOMContentLoaded', () => {
  // Tab switching
  const tabs = document.querySelectorAll('.tab-btn');
  const contents = document.querySelectorAll('.tab-content');
  tabs.forEach(tab => tab.addEventListener('click', () => {
    tabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected','false'); });
    contents.forEach(c => { c.classList.remove('active'); c.hidden = true; });
    tab.classList.add('active'); tab.setAttribute('aria-selected','true');
    const target = document.getElementById(tab.getAttribute('data-target'));
    target.classList.add('active'); target.hidden = false;
  }));

  // Question builder
  let numQuestion = 1;
  document.getElementById('btn').addEventListener('click', () => {
    const list = document.getElementById('questionsList');
    const div = document.createElement('div'); div.className = 'question';
    div.innerHTML = `
      <h4>Question ${numQuestion++}</h4>
      <label>Type:</label>
      <select onchange="changerType(this)">
        <option value="qcm">QCM</option>
        <option value="directe">Direct Response</option>
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
      <div><input type="text" placeholder="Option 1"> <input type="checkbox"> Correct</div>
      <div><input type="text" placeholder="Option 2"> <input type="checkbox"> Correct</div>
      <button type="button" onclick="addOption(this)">+ Option</button>
    `;
  }
  window.addOption = (btn) => {
    const container = btn.parentElement;
    const div = document.createElement('div');
    div.innerHTML = `<input type="text" placeholder="Option"> <input type="checkbox"> Correct`;
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

  // Publish
  document.getElementById('publishBtn').addEventListener('click', async () => {
    const payload = JSON.parse(document.getElementById('previewContent').textContent);
    const res = await fetch('/api/exams', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload) });
    if (res.ok) alert('Exam published successfully'); else alert('Error publishing exam');
  });
});
