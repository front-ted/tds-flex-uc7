$(function () {
    init();
    montar_slides();
    $('.help-btn').hide();
    if (localStorage.getItem('quiz-alert-nao-mostrar-novamente') == 'true') {
        $('.alert').hide();
        $('.help-btn').fadeIn();
    }
    function pontuar(validacao) {
        if (validacao == true) { cout_acertos++; $("#acertos").text(cout_acertos) }
    }

    // Preciso corrigir este bloco para aceitar mais de uma resposta certa.
    $("body").on("click", ".respostas button.bto", function () { // Clique para responder as perguntas do Quiz Clássico
        let userOption = $(this).index();
        let idSlide = $(this).parents(".top-slide").index();
        let respostasPai = $(this).parents(".top-slide").children(".respostas");
        respostasPai.children(".bto").prop("disabled", true);
        respostasPai.children(".bto").addClass("desativar")
        let validacao = perguntas[idSlide].respostas[userOption].validacao;
        if (validacao === true) {
            $(this).addClass("positivo");
        } else {
            $(this).addClass("negativo");
        }
        feedback(idSlide, validacao, function () { pontuar(validacao) });
        pergunta_atual++;
        $("#navegacao").fadeIn("fast")
        mostrarNavPadrao("avancar")
    });

    $("body").on("click", "[data-action='quiz-nav']", function () { // Navegação dos botões próximo para trocar de slide
        $("body").removeClass("nav_ativa")
        $("#navegacao").hide();
        if (pergunta_atual <= nro_perguntas) {
            $(".top-slide").eq(pergunta_atual - 2).fadeOut("fast", function () {
                $(".top-slide").eq(pergunta_atual - 1).fadeIn("fast")
            });
        } else {
            $(".top-slide").eq(pergunta_atual - 2).fadeOut("fast", function () {
                $(".top-slide-final").fadeIn("fast");
                $("#navegacao").fadeOut("fast");
                montar_slide_final();
            })
        }
    });

    $("body").on("click", '[data-action="dragindrop-test"]', function () { //Valida se as respostas arrastadas ao container estão corretas
        var slideAtual = pergunta_atual - 1;
        var top_slide_pai = $($(".top-slide")[slideAtual]);
        var validacao = 0;
        var respCorreta = 0;
        var nro_respostasCorretas = top_slide_pai.find(".container-alvo").length;

        top_slide_pai.find(".container-alvo").each((index, el) => {

            let posTrue = $("#" + $(el).attr("id") + " .bto-dragindrop-item").attr("data-resp");
            if (perguntas[pergunta_atual - 1].respostas[posTrue].validacao == true) {
                respCorreta += 1;
            }

        })
        var respostasFilhos = top_slide_pai.find(".respostas").children(".bto-dragindrop-item");
        var containersRespFilhos = top_slide_pai.find(".container-alvo").children(".bto-dragindrop-item");

        if (respCorreta >= $($(".top-slide")[pergunta_atual - 1]).find(".container-alvo").length) {
            top_slide_pai.find(".container-alvo").each((index, el) => {
                let idCont = $(el).attr("id").split("container-alvo-")[1];
                let elId = $(el).children().attr("data-resp");


                if (idCont == elId) {
                    validacao += 1;
                    $(el).children().addClass("positivo") // Caso esteja correto, adiciona a classe positivo
                } else {
                    $(el).children().addClass("negativo") // se não a classe negativo
                }

            });
            console.log(validacao == respCorreta, validacao, respCorreta);
            if (validacao == respCorreta) { // teste para ver se elas estão nos containers certos
                validacao = true;
                console.warn("as duas estão corretas!");

            }
        } else {
            validacao = false;
            console.error("Algo esta errado");

        }
        desativar_dragindrop_item(respostasFilhos);
        desativar_dragindrop_item(respostasFilhos); desativar_dragindrop_item(respostasFilhos);
        desativar_dragindrop_item(containersRespFilhos);
        desativar_dragindrop_item(containersRespFilhos); desativar_dragindrop_item(containersRespFilhos);

        mostrarNavPadrao("avancar");

        feedback(slideAtual, validacao, (e) => {
            pontuar(validacao);
        });
        pergunta_atual++;
        mostrarNavPadrao("avancar");

    });

    $(".bto-nav-reiniciar").click(function () { // Botão para reiniciar o quiz
        location.href = "index.html"
    });

    $('.respostas .bto-dragindrop-item').on('touch click', function (e) {
        $('.alert').fadeOut();
        $('.help-btn').fadeIn();
        const selectedAnswer = this;
        const parent = $(this).parent()[0];
        const respostasContainer = $(this).parents('.top-slide').find('.respostas');
        const containerAlvo = $(this).parents('.top-slide').find('.container-alvo');
        if (parent.classList.contains('container-alvo')) {
            e.stopPropagation();
            respostasContainer.append($(this));
            $("#navegacao").fadeOut();
        } else {
            if (containerAlvo.length == 1) {
                console.log('container alvo = 1')
                if (containerAlvo.children().length > 0) {
                    respostasContainer.append(containerAlvo.children()[0]);
                    $("#navegacao").fadeOut();
                }
                containerAlvo.append(selectedAnswer);
                verificarContainers(containerAlvo);
            }
            let contador = 1;
            if (containerAlvo.length > 1) {
                for (let i = 0; i < containerAlvo.length; i++) {
                    if (containerAlvo[i].children.length == 0) {
                        containerAlvo[i].append(selectedAnswer);
                        break;
                    } else {
                        contador++
                    }
                }
                if (contador == containerAlvo.length) { verificarContainers(containerAlvo); }
            }
        }
    });

    $('.fechar-alert').click(function () {
        $(this).parents('.alert').fadeOut();
        $('.help-btn').fadeIn();
    });

    $('.dont-show-btn').click(function () {
        localStorage.setItem('quiz-alert-nao-mostrar-novamente', 'true');
        $(this).parents('.alert').fadeOut();
        $('.help-btn').fadeIn();
    });

    $('.help-btn').click(function () {
        $('.help-btn').fadeOut();
        $('.alert').fadeIn();
    });
});


var desativar_dragindrop_item = (el) => {
    el.prop("disabled", true);
    el.prop("draggable", "");
    el.addClass("desativar")
}
// inicialização de variaveis importantes
//
//
let nro_perguntas; // número de perguntas
let pergunta_atual = 1; // Inicia na pergunta 1
let cout_acertos = 0; // Inicializa o contador acertos 
let cout_perguntas = function () { // Função para contar o número de perguntas que existe
    nro_perguntas = perguntas.length;
    return nro_perguntas; // Retorna o número de perguntas do objeto na página perguntas.js
}
let destino = "#top-slides"; //inicializa por padrão a div com o #top-slides



// Utilizando cada um dos templates, monta um slide utilizando o template. O i é a posição do laço for de quem chama a função.
let templates = function (i) {

    let type = perguntas[i].type;
    if (typeof type === "undefined") {
        type = estruturageral.config.globalType;
    }

    type.toLowerCase;

    switch (type) {
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
let templateQuiz = function (i) {
    let topSlidePai = $("<div></div>");
    if (i > 0) {
        topSlidePai.css("display", "none");
    }
    topSlidePai.addClass("top-slide");

    let titulo = $("<div></div>");
    titulo.addClass("titulo");
    titulo.html("<h2>" + perguntas[i].titulo + "</h2>");
    topSlidePai.append(titulo);

    let pergunta = $("<div></div>");
    pergunta.addClass("pergunta");
    pergunta.attr("id", "pergunta" + i);

    let txt = $("<div></div>");
    txt.addClass("txt")
    txt.append("<p>" + perguntas[i].pergunta.texto + "</p>");
    pergunta.append(txt);
    topSlidePai.append(pergunta);

    let respostas = $("<div></div>");
    respostas.addClass("respostas");
    let nro_respostas = perguntas[i].respostas.length;

    for (a = 0; a <= nro_respostas - 1; a++) {
        respostas.append('<button data-resp="' + a + '" type="button" data-label="' + perguntas[i].respostas[a].ordem + '" class="bto">' + perguntas[i].respostas[a].texto + '</button>')

    }
    topSlidePai.append(respostas);

    $(destino).append(topSlidePai);
}

// Template Quiz arrastando as respostas
let templateDragInDrop = function (i) {
    let topSlidePai = $("<div></div>");
    if (i > 0) {
        topSlidePai.css("display", "none");
    }
    topSlidePai.addClass("top-slide");

    let titulo = $("<div></div>");
    titulo.addClass("titulo");
    titulo.html("<h2>" + perguntas[i].titulo + "</h2>");
    topSlidePai.append(titulo);

    let pergunta = $("<div></div>");
    pergunta.addClass("pergunta");
    pergunta.attr("id", "pergunta" + i);

    let txt = $("<div></div>");
    txt.addClass("txt")

    let imgPergunta = "";
    let objImgPergunta;
    let fonteImgPergunta = "";
    let objfonteImgPergunta;
    if (typeof perguntas[i].pergunta.imagem !== "undefined")  // Valida se é possivel colocar a imagem da pergunta e a fonte.
    {
        objImgPergunta = perguntas[i].pergunta.imagem;
        if (objImgPergunta !== undefined) {
            imgPergunta = '<img src="' + objImgPergunta.src + '" alt="' + objImgPergunta.alt + ' title="' + objImgPergunta.title + '" class="img-fluid" />';
        }

        objfonteImgPergunta = objImgPergunta;
        if (objfonteImgPergunta.fonte != false && typeof objfonteImgPergunta.fonte !== "undefined") {
            fonteImgPergunta = "<p class='legenda'>" + objfonteImgPergunta.fonte + "</p>";
        }
    }





    txt.append("<p>" + imgPergunta + fonteImgPergunta + perguntas[i].pergunta.texto + "</p>");
    pergunta.append(txt);
    topSlidePai.append(pergunta);


    let container = $("<div></div>");
    container.addClass("containers");
    container.addClass("d-flex");
    container.addClass("text-center");

    // Embaralha as respostas antes de usar.
    perguntas[i].respostas.sort(() => Math.random() - 0.5).forEach((alternativas, index) => {
        if (alternativas.validacao === true) {
            let imagem = "";
            let fonte = "";
            let texto = "";
            if (typeof alternativas.relacionarCom !== "undefined") {
                if (typeof alternativas.relacionarCom.imagem !== "undefined") {
                    if (typeof alternativas.relacionarCom.imagem.src !== "undefined") {

                        imagem = '<img src="' + alternativas.relacionarCom.imagem.src + '" alt="' + alternativas.relacionarCom.imagem.alt + '" title="' + alternativas.relacionarCom.imagem.title + '" class="img-fluid img-relacionarcom" />';
                    }

                    if (typeof alternativas.relacionarCom.imagem.fonte !== "undefined") {
                        fonte = "<p class='legenda'>" + alternativas.relacionarCom.imagem.fonte + "</p>";
                    }
                }
                if (typeof alternativas.relacionarCom.texto !== "undefined") {
                    texto = "<p>" + alternativas.relacionarCom.texto + "</p>";
                }
            }

            container.append('<div class="container">' + imagem + fonte + texto + '<div id="container-alvo-' + index + '" class="container-alvo"></div></div>');

        }
    });
    topSlidePai.append(container);


    let respostas = $("<div></div>");
    respostas.addClass("respostas");
    respostas.addClass("dragindrop");
    respostas.prop("id", "resposta" + i)

    let nro_respostas = perguntas[i].respostas.length;

    for (a = 0; a <= nro_respostas - 1; a++) {
        let objImgItem = "";
        let imgItem = "";
        let texto = "";
        let ordem = "";
        let fonteImgItem = "";

        if (typeof perguntas[i].respostas[a].imagem !== "undefined") {
            objImgItem = perguntas[i].respostas[a].imagem;

            if (objImgItem.src !== false && typeof objImgItem.src !== "undefined") {
                imgItem = '<img src="' + objImgItem.src + '" alt="' + objImgItem.alt + '" title="' + objImgItem.title + '" class="img-fluid" />';
            }
            if (objImgItem.fonte !== false && typeof objImgItem.fonte !== "undefined") {
                fonteImgItem = "<span class='legenda d-block'>" + objImgItem.fonte + "</span>";
            }
        }



        if (typeof perguntas[i].respostas[a].texto !== "undefined") {
            texto = perguntas[i].respostas[a].texto
        }
        if (typeof perguntas[i].respostas[a].ordem !== "undefined") {
            ordem = perguntas[i].respostas[a].ordem
        }

        respostas.append('<button draggable="true" data-resp="' + a + '" type="button" data-label="' + ordem + '" class="bto-dragindrop-item"><i class="fa-solid fa-grip-lines-vertical"></i> ' + imgItem + fonteImgItem + texto + '</button>')

    }

    // implementa o alert com instruções sobre clique/drag
    let alertInstrucao = $("<div></div>");
    alertInstrucao.addClass('alert alert-primary align-items-center');
    let msgContainer = $("<div></div>");
    msgContainer.addClass('d-flex align-items-center');
    alertInstrucao.append(msgContainer);
    alertInstrucao.prop('role', 'alert');
    msgContainer.append('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:"><path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/></svg>');
    msgContainer.append("<p>" + 'Clique para selecionar uma resposta, ou arraste-a até o espaço desejado.' + "</p>");
    let alertFooter = $("<div></div>");
    alertFooter.addClass('d-flex justify-content-end alert-footer');
    let dontShowBtn = $("<button></button");
    dontShowBtn.text("Não mostrar novamente");
    dontShowBtn.addClass('dont-show-btn');
    alertFooter.append(dontShowBtn);
    let closeBtn = $("<button></button");
    closeBtn.addClass('fechar-alert')
    closeBtn.text("Fechar");
    alertFooter.append(closeBtn);
    alertInstrucao.append(alertFooter);

    //implementa botão de ajuda p ver instruções novamente
    let helpBtn = $("<button></button>");
    helpBtn.append('<svg height="40px" width="40px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm169.8-90.7c7.9-22.3 29.1-37.3 52.8-37.3h58.3c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24V250.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1H222.6c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/></svg>');
    helpBtn.addClass('help-btn');

    topSlidePai.append(alertInstrucao);
    $(destino).append(helpBtn);
    topSlidePai.append(respostas);
    $(destino).append(topSlidePai);
}

var debug = function (array) {
    pergunta_atual = Number(array) + 1;
    console.log(pergunta_atual)
    $(".top-slide").hide();
    $(".top-slide").eq(array).show();

}
// monta os slides de cada pergunta
let montar_slides = function () {
    for (i = 0; i <= nro_perguntas - 1; i++) {
        templates(i);
    }
    // Embaralhar as perguntas dragindrop
    embaralhar_perguntas();

}

var embaralhar_perguntas = (i) => {
    $(".top-slide").each((index, containers,) => {
        // Seleciona o container pai
        var $container = $(containers).find(".containers");

        // Obtém todas as divs filhas
        var $divs = $container.find('.container');

        // Embaralha a ordem das divs
        for (var i = $divs.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = $divs[i];
            $divs[i] = $divs[j];
            $divs[j] = temp;
        }

        // Atualiza a ordem das divs no DOM
        $container.empty().append($divs);
    })


}
// retorna o número de perguntas que o aluno precisa responder
// de acordo com o perguntas.js e adiciona o valor a uma variavel

// Feedbacks de cada pergunta
//
let feedback = function (i, positivo_negativo, pontuar) {
    $("#pergunta" + i + " .txt").remove();

    let text_feedback = $("<div></div>");
    text_feedback.addClass("texto-feedback container");

    let row = $("<div></div>");
    row.addClass("row");

    let col_ico = $("<div></div>");
    col_ico.addClass("col-12 col-sm-3");
    let feed_texto;
    if (positivo_negativo === true) {
        ico = "up";
        feed_texto = perguntas[i].feedbacks.positivo.texto;
        pontuar();
    } else {
        ico = "down";
        feed_texto = perguntas[i].feedbacks.negativo.texto;
    }
    col_ico.append('<div class="ico-feedback thumbs-' + ico + '"></div>');
    row.append(col_ico);

    let col_text = $("<div></div>");
    col_text.addClass("col-12 col-sm-9");
    col_text.html("<p>" + feed_texto + "</p>");
    row.append(col_text);

    text_feedback.append(row);

    $("#pergunta" + i).append(text_feedback);

}

// Monta o slide da tela final
let montar_slide_final = function () {
    $("#total").text(nro_perguntas);
    let mensagemFinal = "";
    let regra_vitoria;
    let acertos_para_vitoria = estruturageral.config.acertos_para_vitoria;

    if (acertos_para_vitoria === 0 || typeof acertos_para_vitoria === "undefined" || acertos_para_vitoria === null) {
        regra_vitoria = (nro_perguntas / 2);
    } else {
        regra_vitoria = acertos_para_vitoria;
    }
    let imagem = "";
    let fonte = "";
    if (cout_acertos >= regra_vitoria) {
        estruturageral.mensagemfinal.positiva.texto.forEach(element => {
            mensagemFinal += "<p>" + element + "</p>";

        });


        let objImagem = estruturageral.mensagemfinal.positiva.imagem;
        if (objImagem !== false && objImagem !== "false" && objImagem !== null && typeof objImagem !== "undefined") {
            imagem = "<img src='" + objImagem.src + "' title='" + objImagem.title + "' alt='" + objImagem.alt + "' class='img-fluid imgMsgFinal'>"
        }


        let objFonte = estruturageral.mensagemfinal.positiva.fonte;
        if (objFonte !== false && objFonte !== "false" && objFonte !== null && typeof objFonte !== "undefined") {
            fonte = "<p class='legenda'>" + objFonte + "</p>";
        }


    } else {
        estruturageral.mensagemfinal.negativa.texto.forEach(element => {
            mensagemFinal += "<p>" + element + "</p>";

        });


        let objImagem = estruturageral.mensagemfinal.negativa.imagem;
        if (objImagem !== false && objImagem !== "false" && objImagem !== null && typeof objImagem !== "undefined") {
            imagem = "<img src='" + objImagem.src + "' title='" + objImagem.title + "' alt='" + objImagem.alt + "' class='img-fluid imgMsgFinal'>"
        }

        let objFonte = estruturageral.mensagemfinal.negativa.fonte;
        if (objFonte !== false && objFonte !== "false" && objFonte !== null && typeof objFonte !== "undefined") {
            fonte = "<p class='legenda'>" + objFonte + "</p>";
        }

    }
    mensagemFinal = imagem + fonte + mensagemFinal;

    $(".mensagemfinal").html(mensagemFinal);
}

let init = function () {
    cout_perguntas(nro_perguntas);
}

// Gameplay: Dragindrop
//
let dragging_element;
$("body").on("dragstart", ".bto-dragindrop-item", function (ev) {
    dragging_element = $(this)
    $(dragging_element).addClass("ondragging");
    $('.container-alvo').addClass('ativo');
})

// DRAG OVER
$("body").on("dragover", ".container-alvo", function (ev) {

    if ($(ev.currentTarget).find("button").length < 1) {
        ev.preventDefault();
    }
    // allowDrop
    // não permitir o drop se o alvo já tiver algum item

});
$("body").on("dragover", ".dragindrop", function (ev) {
    // allowDrop
    ev.preventDefault();
});

// DROP
$("body").on("drop", ".container-alvo", function (ev) {
    ev.preventDefault();
    ev.target.append(dragging_element[0]);
    dragging_element.removeClass("ondragging");
    console.log()
    let containerAlvo = $(ev.target).parents('.top-slide').find('.container-alvo');
    if (containerAlvo.length == 1) { verificarContainers(ev) }
    if (containerAlvo.length > 1) {
        let contador = 0;
        for (let i = 0; i < containerAlvo.length; i++) {
            if (containerAlvo[i].children.length > 0){ contador++ }
        }
        console.log(contador)
        if (containerAlvo.length == contador) {
            verificarContainers(ev)
        }
    }
});
$("body").on("drop", ".dragindrop", function (ev) {
    ev.preventDefault();
    $(this).append(dragging_element[0]);
    dragging_element.removeClass("ondragging")
    // DROP
    // verificarContainers(ev);
});
$("body").on("dragend", function () {
    $('.container-alvo').removeClass('ativo');
});
var verificarContainers = function (el) {
    // Quantos containers tem, quantos botões tem dentro do container 1 e do 2
    let coutEl = 0;
    console.log(pergunta_atual, coutEl)
    $($(".top-slide")[pergunta_atual - 1]).find(".container-alvo").each(function (index, el) {
        coutEl += $("#" + $($(".container-alvo")[index]).attr("id") + " button").length;
    })
    console.warn("O número de containers preenchidos são: ", coutEl)
    console.log("Pergunta atual", pergunta_atual)

    if (coutEl >= $($(".top-slide")[pergunta_atual - 1]).find(".container-alvo").length) { // Verifica o contador e dispara a validação

        let idSlide = $($(".top-slide")[pergunta_atual - 1]).find(".respostas").attr("id");
        let respostasPai = $(idSlide);
        respostasPai.find(".bto").prop("disabled", true);
        respostasPai.find(".bto").addClass("desativar")
        //let validacao = perguntas[idSlide].respostas[userOption].validacao;
        mostrarNavPadrao("dragindrop-test");
    } else {
        $("#navegacao").hide();
    }
}

var mostrarNavPadrao = (type) => {
    $("body").addClass("nav_ativa");
    if (type == "avancar") {
        $("#navegacao .bto-nav").text("Avançar");
        $("#navegacao .bto-nav").attr("data-action", "quiz-nav");
    } else
        if (type == "dragindrop-test") {
            $("#navegacao .bto-nav").text("Validar");
            $("#navegacao .bto-nav").attr("data-action", "dragindrop-test");
        }
    $("#navegacao").fadeIn("fast");
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
// Exemplo de uso:
// const numeroInteiroInclusivo = getRandomIntInclusive(1, 100); 
// Retorna um número entre 1 e 100 (inclusive)