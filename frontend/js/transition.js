document.querySelector(".transition-container").addEventListener("click",(e)=>{
    if(e.target.matches(".pass_exam")){
        e.preventDefault;
        //L'examen commence en masquant les elements precedents et en prevenant refresh de la page
       document.querySelector(".transition-container").classList.add("disabled")
       window.addEventListener('beforeunload',(e)=>e.preventDefault())
       // ci dessus tout se qui est en lien avec lexam et ses modalites:

    }
    
})


