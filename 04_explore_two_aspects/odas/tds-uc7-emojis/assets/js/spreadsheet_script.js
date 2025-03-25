let wrongAnswerCounter = 0;
$('.tela:not(.tela-1)').hide();

const audioS = new Audio();

const inputArray = document.querySelectorAll('input');
for (let i = 0; i < inputArray.length; i++) {
    const element = inputArray[i];
    const btn = $(element).parents('.tela').find('.check-answer');
    element.addEventListener('input', function () {
        
        if (element.value.length > 3) {
            $(btn).removeClass('disabled');

        } else {
            $(btn).addClass('disabled');
        }
    });
};

$('.check-answer').click(function () {
    const btnNext = $(this).parents('.tela').find('.next');
    const result = $(this).parents('.tela').find('.result')[0];
    const input = $(this).parents('.tela').find('input')[0];
    if (input.dataset.answer == input.value) {
        audioS.setAttribute('src', 'assets/snd/acerto.mp3');
        audioS.load();
        audioS.play();
        $(this).parents('.tela').find('.option').addClass('disabled');
        $(this).addClass('correct');
        setTimeout(() => {
            $(this).parents('.tela').find('.option').addClass('d-none');
            $(result).addClass('active');
            $(btnNext).removeClass('hidden');
        }, 500);
    } else {
        audioS.setAttribute('src', 'assets/snd/erro.mp3');
        audioS.load();
        audioS.play();
        wrongAnswerCounter++;
        if (wrongAnswerCounter == 3) {
            $(this).siblings('.show-answer').removeClass('disabled');
            wrongAnswerCounter = 0;
        }
        $(this).addClass('wrong');
        setTimeout(() => {
            $(this).removeClass('wrong');
        }, 1500);
    }
});

$('.restart-btn').click(function() {
    $('.tela-final').fadeOut();
    $('.obj_spreadsheet_container input').val('');
    $('.obj_spreadsheet_container input').removeClass('disabled');
    $('.obj_spreadsheet_container .check-answer:not(.disabled)').addClass('disabled')
    $('.correct').removeClass('correct');
    $('.next').addClass('hidden');
    $('.option').removeClass('disabled');
    $('.option').removeClass('d-none');
    $('.result').removeClass('active');
    
    setTimeout(() => {
        $('.tela-1').fadeIn();
        
    }, 500);
});

$('.show-answer').click(function () {
    const btnNext = $(this).parents('.tela').find('.next');
    const result = $(this).parents('.tela').find('.result')[0];
    const btnCheck = $(this).parents('.tela').find('.check-answer');
    const input = $(this).parents('.tela').find('input')[0];
    $(this).parents('.tela').find('.option').addClass('disabled');
    $(input).val(input.dataset.answer);
    $(input).addClass('disabled');
    $(btnCheck).addClass('disabled');
    setTimeout(() => {
        $(this).parents('.tela').find('.option').addClass('d-none');
        $(result).addClass('active');
        $(btnNext).removeClass('hidden');
    }, 500);

});

$('.next').click(function () {
    const telaAtual = $(this).parents('.tela');
    const proxTela = $(this).parents('.tela').next();
    $(telaAtual).fadeOut();
    setTimeout(() => {
        $(proxTela).fadeIn();
    }, 500);
});