$('.ODA_ingles_form .check').click(function () {
    let arrayExercicios = $('select');
    console.log(arrayExercicios)
    for (let i = 0; i < arrayExercicios.length; i++) {
        
        if(arrayExercicios[i].value=='correto'){
            arrayExercicios[i].parentNode.parentNode.classList.add('correto')
            
        } else {
            arrayExercicios[i].parentNode.parentNode.classList.add('errado')
        }
    }
})