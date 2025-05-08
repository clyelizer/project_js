document.querySelector(".transition-container").addEventListener("click",(e)=>{
    if(e.target.matches(".pass_exam")){
        e.preventDefault;
        //Dabobord on masque les elements precedents de la page
       document.querySelector(".transition-container").classList.add("disabled")
      
      //Ensuite  on cree et affiche une div, un btn start et une input pour la saisie du lien
       const contenaire = document.createElement('div');
       contenaire.innerHTML = `
        <h2>Exam Link</h2>
        <h3>Please enter the exam link to begin</h3>
        <input type="url" placeholder="http://localhost:3000/passer_examen.html?id=681b4c78bcf034714cdecd2c">
        <input type="button" value="Start" id="start_btn">`;

       contenaire.classList.add('contenaire');
       document.body.appendChild(contenaire);
       
       // Et puis on ecoute le bouton commencer examen
        contenaire.addEventListener("click", (e) => {
            if(e.target.matches("#start_btn")){
                // Enfin on redirige vers la page de passage d'examen
                const urlInput = e.currentTarget.querySelector("input[type='url']")
                const url=urlInput.value.trim();
                const regex = /^https?:\/\/[^?#]+\/passer_examen\.html(\?.*)?$/;
                if (regex.test(url)) {
                    window.location.href = url;
                } else {
                    alert(`Invalid URL. \nMake sure it looks like: http://localhost:3000/passer_examen/Exam_id`);
                    urlInput.value=""                    
                    urlInput.focus()
                }
            }
        })
        
    }
       
       
})


