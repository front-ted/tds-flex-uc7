const letters = $('.letter-container');
let playAllIndex = 0;
let playing = false;

function playSound() {
    const btn = $(this);
    const ico = $(this).children('.play-ico');
    const letter = $(this).prev()[0].innerText.toLowerCase();
    const player = new Audio(`odas/ingles_letters/assets/audio/${letter}.mp3`);
    btn.addClass('active');
    ico.attr('src', 'odas/ingles_letters/assets/img/loading.svg');

    player.play();

    player.onended = function () {
        btn.removeClass('active');
        ico.attr('src', 'odas/ingles_letters/assets/img/play.svg');
    }
}

async function playLetter(letter) {
    return new Promise(resolve => {
        const player = new Audio(`odas/ingles_letters/assets/audio/${letter}.mp3`);
        player.play();
        playAllIndex++;
        player.onended = function () { 
            resolve(); 
        }
    })
}

async function playAll() {
    $('.play-all-btn').addClass('disabled');
    $('.pause-all-btn').removeClass('disabled');
    $('.reset-all-btn').removeClass('disabled');
    playing = true;

    for (let i = playAllIndex; i < letters.length; i++) {
        if (playing == true) {
            const letter = $(letters[i]).children('h3')[0].innerText.toLowerCase()
            const btn = $(letters[i]).children('.play-btn');
            const ico = $(letters[i]).children('.play-btn').children('.play-ico');
            btn.addClass('active')
            ico.attr('src', 'odas/ingles_letters/assets/img/loading.svg');
            await (playLetter(letter))
                .then(() => {
                    btn.removeClass('active');
                    ico.attr('src', 'odas/ingles_letters/assets/img/play.svg');
                })
        }
    }
}

function pauseAll() {
    $('.pause-all-btn').addClass('disabled');
    $('.play-all-btn').removeClass('disabled');
    playing = false;
}

$('.play-btn').click(playSound)
$('.play-all-btn').click(playAll)
$('.pause-all-btn').click(pauseAll)
$('.reset-all-btn').click(function () {
    playAllIndex = 0;
    $(this).addClass('disabled')
    if(playing==true){
        $('.pause-all-btn').addClass('disabled');
        $('.play-all-btn').removeClass('disabled');
        playing = false;
    }
    // console.log(playAllIndex)
})
