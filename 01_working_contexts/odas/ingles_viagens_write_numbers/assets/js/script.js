const answers = {
    0: "thirteen",
    1: "ninety-seven",
    2: "sixty-three",
    3: "eighty-one",
    4: "one hundred and fifty-nine",
    5: "five hundred",
    6: "nine hundred and ninety-nine"
}
$('.ODA_ingles_write_words .check').click(function () {
    const inputArray = $('.ODA_ingles_write_words input');

    for (let i = 0; i < inputArray.length; i++) {
        let value = inputArray[i].value.toLowerCase();
        if (value == answers[i]) {
            inputArray[i].parentElement.classList.remove('wrong')
            inputArray[i].parentElement.classList.add('correct');
            inputArray[i].parentElement.nextElementSibling.children[0].classList.remove('active')
            inputArray[i].parentElement.nextElementSibling.children[1].classList.remove('active')
        } else {
            inputArray[i].parentElement.classList.remove('correct');
            inputArray[i].parentElement.classList.add('wrong');
        }
    }

    if (('.wrong').length > 0) {
        for (let i = 0; i < $('.wrong').length; i++) {
            let input = $('.wrong')[i];
            if(!input.nextElementSibling.children[1].classList.contains('active')){
                input.nextElementSibling.children[0].classList.add('active');
            }
        }
    }
})
$('.answer-btn').click(function () {
    $(this).removeClass('active')
    setTimeout(() => {
        $(this).next().addClass('active')
    }, 500);
})