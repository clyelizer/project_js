let numQuestion = 1;

function ajouterQuestion() {
  const container = document.querySelector('.questions');
  const div = document.createElement('div');
  div.className = 'question';
  div.innerHTML = `
    <h4 style="font-familly:'verdana';font-size:larger">Question ${numQuestion++}</h4>
    <label style="color: rgb(125, 96, 233);font-weight:bolder">Type :</label>
    <select onchange="changerType(this)">
      <option value="qcm">QCM</option>
      <option value="directe">Réponse directe</option>
    </select>

    <textarea placeholder="Saisir un enonce:"></textarea><br>

    <label   style="color: rgb(125, 96, 233);font-weight:bolder" >Ajouter une pièce jointe :</label>
    <input type="file">

    <div class="zone-reponses"></div>

    <br><label style="color: rgb(125, 96, 233);font-weight:bolder" >Note(Nbre points) :</label>
    <input type="number" min="0" class="champ">

    <label style="color: rgb(125, 96, 233);font-weight:bolder">Durée (en secondes) :</label>
    <input type="number" min="0" class="champ">
  `;
  container.appendChild(div);
  genererChampsQCM(div.querySelector(".zone-reponses"));
}

function changerType(select) {
  const zone = select.parentElement.querySelector('.zone-reponses');
  zone.innerHTML = '';
  if (select.value === 'qcm') {
    genererChampsQCM(zone);
  } else {
    genererChampsDirecte(zone);
  }
}

function genererChampsQCM(container) {
  container.innerHTML = `
    <label style="color: rgb(125, 96, 233);font-weight:bolder">Options :</label>
    <div class="option"><input type="text" placeholder="Option 1"> <input type="checkbox"> Bonne réponse</div>
    <div class="option"><input type="text" placeholder="Option 3"> <input type="checkbox"> Bonne réponse</div>
    <div id="add_option_qcm" title="Ajouter une option aux choix du qcm" >+ option</div>
  `;
}

function genererChampsDirecte(container) {
  container.innerHTML = `
    <label>Réponse attendue :</label>
    <input  type="text" placeholder="Saisir une courte reponse:">

    <label>Taux de tolérance (%) :</label>
    <input type="number" class="champ" min="0" max="100">`
}

function montrerApercu(){

}

document.getElementById("btn").addEventListener('click',(ev)=>{
    ev.preventDefault();
    ajouterQuestion()
})

document.getElementById("btn").addEventListener('click',()=>{
  
})
