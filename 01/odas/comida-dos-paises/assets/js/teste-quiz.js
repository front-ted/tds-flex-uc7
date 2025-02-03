$(function (){
    init();
    montar_slides();

    // Preciso corrigir este bloco para aceitar mais de uma resposta certa.
    $(".respostas button.bto").click(function(){ // Clique para responder as perguntas do Quiz Clássico
        let userOption = $(this).index();
        let idSlide = $(this).parents(".top-slide").index();
        let respostasPai = $(this).parents(".top-slide").children(".respostas");
        respostasPai.children(".bto").prop("disabled",true);
        respostasPai.children(".bto").addClass("desativar")
        let validacao = perguntas[idSlide].respostas[userOption].validacao;

        if(validacao == true){
            feedback(idSlide, true);
            $(this).addClass("positivo")
            
        }else if(validacao == false){
            feedback(idSlide, false);
            $(this).addClass("negativo");
        }
        pergunta_atual++;
        $("#navegacao").fadeIn("fast")  
        mostrarNavPadrao("avancar")
    });

    $("[data-action='avancar']").click(function (){ // Navegação dos botões próximo para trocar de slide
        $("#navegacao").hide();  
        if(pergunta_atual <= nro_perguntas){
            $(".top-slide").eq(pergunta_atual-2).fadeOut("fast", function(){
                $(".top-slide").eq(pergunta_atual-1).fadeIn("fast")
            });
        }else{
            $(".top-slide").eq(pergunta_atual-2).fadeOut("fast", function(){
                $(".top-slide-final").fadeIn("fast");
                $("#navegacao").fadeOut("fast");
                montar_slide_final();  
            })
        }
    });

    $("body").on("click", '[data-action="dragindrop-test"]', function (){ //Valida se as respostas arrastadas ao container estão corretas
        var respCorreta = 0;
        var respID = $(".respostas").attr("id")
        $(".container-alvo").each((index, el) => {
            // console.log($(el).attr("id"), $("#" + $(el).attr("id") + " .bto-dragindrop-item").attr("data-resp"))
            let posTrue = $("#" + $(el).attr("id") + " .bto-dragindrop-item").attr("data-resp");
            if(perguntas[respID].respostas[posTrue].validacao == true){
                console.warn("as duas estão corretas!")
            }
        })
        mostrarNavPadrao("avancar");
    });

    $(".bto-nav-reiniciar").click(function(){ // Botão para reiniciar o quiz
        location.href="index.html"
    });
    
    
    

    
 
});

// inicialização de variaveis importantes
//
//
let nro_perguntas; // número de perguntas
let pergunta_atual = 1; // Inicia na pergunta 1
let cout_acertos = 0; // Inicializa o contador acertos 
let cout_perguntas = function(){ // Função para contar o número de perguntas que existe
    nro_perguntas = perguntas.length; 
    return nro_perguntas; // Retorna o número de perguntas do objeto na página perguntas.js
}
let destino = "#top-slides"; //inicializa por padrão a div com o #top-slides



// Utilizando cada um dos templates, monta um slide utilizando o template. O i é a posição do laço for de quem chama a função.
let templates = function (i){
   
    let type = perguntas[i].type;
    if(type === undefined){
        type = estruturageral.config.globalType;
    }

    type.toLowerCase;

    switch(type){
        case "dragindrop":
            templateDragInDrop(i);
            break
        
        case "quiz":
        default: // Caso não exista uma opção correta no type, coloca o quiz como padrão
            templateQuiz(i);       
            break;
        
    }
    
}

// Template Quiz Clássico
let templateQuiz = function (i){
    let topSlidePai = $("<div></div>");
    if(i > 0){
        topSlidePai.css("display", "none");
    }
    topSlidePai.addClass("top-slide");

    let titulo = $("<div></div>");
    titulo.addClass("titulo");
    titulo.html("<h2>"+ perguntas[i].titulo +"</h2>");
    topSlidePai.append(titulo);

    let pergunta = $("<div></div>");
    pergunta.addClass("pergunta");
    pergunta.attr("id", "pergunta" + i);

    let txt = $("<div></div>");
    txt.addClass("txt")
    txt.append("<p>" + perguntas[i].pergunta + "</p>");
    pergunta.append(txt);
    topSlidePai.append(pergunta);

    let respostas = $("<div></div>");
    respostas.addClass("respostas");
    let nro_respostas = perguntas[i].respostas.length;

    for(a = 0; a <= nro_respostas-1; a++){
        respostas.append('<button data-resp="' + a + '" type="button" data-label="'+ perguntas[i].respostas[a].ordem +'" class="bto">'+ perguntas[i].respostas[a].texto +'</button>')

    }
    topSlidePai.append(respostas);
    
    $(destino).append(topSlidePai);
}

// Template Quiz arrastando as respostas
let templateDragInDrop = function (i){
    let topSlidePai = $("<div></div>");
    if(i > 0){
        topSlidePai.css("display", "none");
    }
    topSlidePai.addClass("top-slide");

    let titulo = $("<div></div>");
    titulo.addClass("titulo");
    titulo.html("<h2>"+ perguntas[i].titulo +"</h2>");
    topSlidePai.append(titulo);

    let pergunta = $("<div></div>");
    pergunta.addClass("pergunta");
    pergunta.attr("id", "pergunta" + i);

    let txt = $("<div></div>");
    txt.addClass("txt")
    txt.append("<p>" + perguntas[i].pergunta + "</p>");
    pergunta.append(txt);
    topSlidePai.append(pergunta);

    
    let container = $("<div></div>");
    container.addClass("containers");
    container.addClass("d-flex");
    
    perguntas[i].respostas.forEach((alternativas, index) => {
        if(alternativas.validacao === true){
            container.append('<div class="container"><div id="container-alvo-'+index+'" class="container-alvo"></div></div>');
            
        }
    });
    topSlidePai.append(container);

    
    let respostas = $("<div></div>");
    respostas.addClass("respostas");
    respostas.addClass("dragindrop");
    respostas.prop("id", "#resposta"+i)

    let nro_respostas = perguntas[i].respostas.length;
   
    for(a = 0; a <= nro_respostas-1; a++){
        respostas.append('<button draggable="true" data-resp="' + a + '" type="button" data-label="'+ perguntas[i].respostas[a].ordem +'" class="bto-dragindrop-item"><i class="fa-solid fa-grip-lines-vertical"></i> '+ perguntas[i].respostas[a].texto +'</button>')
             
    }

    topSlidePai.append(respostas);
    
    $(destino).append(topSlidePai);
}

// monta os slides de cada pergunta
let montar_slides = function (){
    for(i=0; i <= nro_perguntas-1; i++){
        templates(i);
    }
}
// retorna o número de perguntas que o aluno precisa responder
// de acordo com o perguntas.js e adiciona o valor a uma variavel

// Feedbacks de cada pergunta
//
let feedback = function (i, positivo_negativo){
    $("#pergunta" + i + " .txt").remove();

    let text_feedback = $("<div></div>");
    text_feedback.addClass("texto-feedback container");

    let row = $("<div></div>");
    row.addClass("row");
    
    let col_ico = $("<div></div>");
    col_ico.addClass("col-12 col-sm-3");
    let feed_texto;
    if(positivo_negativo === true){
        ico = "up";
        feed_texto = perguntas[i].feedbacks.positivo;
        cout_acertos++;
        $("#acertos").text(cout_acertos)
    }else{
        ico = "down";
        feed_texto = perguntas[i].feedbacks.negativo;
    }
    col_ico.append('<div class="ico-feedback thumbs-'+ ico +'"></div>');
    row.append(col_ico);

    let col_text = $("<div></div>");
    col_text.addClass("col-12 col-sm-9");
    col_text.html("<p>"+ feed_texto + "</p>");
    row.append(col_text);

    text_feedback.append(row);

    $("#pergunta" + i).append(text_feedback);

}

// Monta o slide da tela final
let montar_slide_final = function(){
    $("#total").text(nro_perguntas);
    let mensagemFinal = "";
    let regra_vitoria;
    let acertos_para_vitoria = estruturageral.config.acertos_para_vitoria;
    
    if (acertos_para_vitoria === 0 || acertos_para_vitoria === undefined || acertos_para_vitoria === null){
        regra_vitoria = (nro_perguntas/2);
    }else {
        regra_vitoria = acertos_para_vitoria;
    }
    if(cout_acertos >= regra_vitoria){
        estruturageral.mensagemfinal.positiva.forEach(element => {
            mensagemFinal += "<p>" + element + "</p>";
            console.log("acerto")
        });
    }else{
        estruturageral.mensagemfinal.negativa.forEach(element => {
            mensagemFinal += "<p>" + element + "</p>";
            console.log("erro")
        });
    }
    $(".mensagemfinal").html(mensagemFinal);
}

let init = function (){
    cout_perguntas(nro_perguntas);
   
}

// Gameplay: Dragindrop
//
let dragging_element;
$("body").on("dragstart", ".bto-dragindrop-item", function (ev){
    dragging_element = $(this)
    $(dragging_element).addClass("ondragging");
})

// DRAG OVER
$("body").on("dragover", ".container-alvo", function (ev){

    if($("#" + $(this).attr("id") + " button").length < 1)
    {
        ev.preventDefault();
    }
    // allowDrop
    // não permitir o drop se o alvo já tiver algum item

});
$("body").on("dragover", ".dragindrop", function (ev){
    // allowDrop
    ev.preventDefault();
});

// DROP
$("body").on("drop", ".container-alvo", function (ev){
    ev.preventDefault();
    ev.target.append(dragging_element[0]);
    dragging_element.removeClass("ondragging")
    verificarContainers(ev);
});
$("body").on("drop", ".dragindrop", function (ev){
    ev.preventDefault();

    if(!$(ev.target).is("button")) {
        ev.target.append(dragging_element[0]);

    }else{
        $(ev.target).parents(".dragindrop").append(dragging_element[0]);
    }

    dragging_element.removeClass("ondragging")
  // DROP
  verificarContainers(ev);
});

var verificarContainers = function (el){
    // Quantos containers tem, quantos botões tem dentro do container 1 e do 2
    let coutEl = 0;

    $($(".top-slide")[pergunta_atual-1]).children(".containers").children(".container").children(".container-alvo").each(function(index, el){
        coutEl += $(el).length;
    })
    console.warn("O número de containers preenchidos são: ", coutEl)

    if(coutEl >= $($($(".top-slide")[pergunta_atual-1]).children(".containers").children(".container").children(".container-alvo")).length){ // Verifica o contador e dispara a validação
        console.error("Tá tudo cheio!")

        let idSlide = $(".respostas").attr("id");
        let respostasPai = $(idSlide);
        respostasPai.children(".bto").prop("disabled",true);
        respostasPai.children(".bto").addClass("desativar")
        //let validacao = perguntas[idSlide].respostas[userOption].validacao;
        mostrarNavPadrao("dragindrop-test");
    }else{
        $("#navegacao").hide();
    }
}

var mostrarNavPadrao = (type) => {
    console.log(type)
    if(type == "avancar"){
        $("#navegacao .bto-nav").text("Avançar");
        $("#navegacao .bto-nav").attr("data-action","quiz-nav");
    }else
    if(type == "dragindrop-test"){
        $("#navegacao .bto-nav").text("Validar");
        $("#navegacao .bto-nav").attr("data-action","dragindrop-test");
    }
    $("#navegacao").fadeIn("fast");
}

