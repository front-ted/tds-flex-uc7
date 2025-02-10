window.onload = (event) => {
    $('.tela:not(.active)').hide()
    const audio = new Audio();
    let telas = $('.tela')

    let cardArray = document.getElementsByClassName('card')
    for (let i = 0; i < cardArray.length; i++) {
        cardArray[i].addEventListener(
            'click',
            function () {
                cardArray[i].classList.toggle('flip')
            }
        )
    }

    $('.btn-start').click(function () {
        $('.tela-inicial').fadeOut();
    })

    $('.btn-next').click(function () {
        $('.flip').removeClass('flip');
        $('.btn-prev').removeClass('disabled');
        let telaAtiva = $('.tela.active');
        let proxTela = $('.tela.active').next();

        telaAtiva.removeClass('active');
        telaAtiva.fadeOut();

        setTimeout(() => {
            proxTela.addClass('active');
            proxTela.fadeIn();
            if (proxTela.next().length == 0) {
                $(this).addClass('disabled');
            }
        }, 600);

    })

    $('.btn-prev').click(function () {
        $('.flip').removeClass('flip');
        let telaAtiva = $('.tela.active');
        let telaAnterior = telaAtiva.prev();
        telaAtiva.removeClass('active');
        telaAtiva.fadeOut();

        setTimeout(() => {
            telaAnterior.addClass('active');
            telaAnterior.fadeIn();
            if (telaAnterior.prev().length == 0) {
                $(this).addClass('disabled');
            }
            if ($('.btn-next').hasClass('disabled')) {
                $('.btn-next').removeClass('disabled')
            }
        }, 600);

    })

    $('.btn-audio').click(function (e) {
        e.stopPropagation()
        // audios:
        let number = $(this).prev()[0].innerText.toLowerCase();
        let onumber = number.replace(/%20/g, " ");
        console.log(onumber);
        audio.setAttribute('src', `odas/ingles_viagens_cartas/assets/audio/${onumber}.mp3`);
        audio.load();
        audio.play();
    })
}