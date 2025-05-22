document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.activity-container').forEach(container => {
        initActivity(container);
    });

    function initActivity(container) {
        let selectedInput = null;
        let phrases = [];
        const wordBank = container.querySelector('.word-bank');

        const shuffleArray = (array) => {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        };

        const updateWordBank = () => {
            wordBank.innerHTML = phrases.map(phrase => 
                `<div class="word-item" draggable="true">${phrase}</div>`
            ).join('');
            initWordItems();
        };

        const initPhrases = () => {
            phrases = wordBank.dataset.words.split(';').map(p => p.trim());
            shuffleArray(phrases);
            updateWordBank();
        };

        const updateWordStates = () => {
            wordBank.querySelectorAll('.word-item').forEach(word => {
                const isUsed = word.hasAttribute('data-used-for');
                word.classList.toggle('used', isUsed);
                word.classList.toggle('available', !isUsed);
            });
        };

        const clearInput = (input) => {
            const word = wordBank.querySelector(`.word-item[data-used-for="${input.id}"]`);
            if (word) word.removeAttribute('data-used-for');
            input.value = '';
            updateWordStates();
        };

        const handleInputChange = (input) => {
            const typedValue = input.value.trim();
            const availableWordItems = Array.from(wordBank.querySelectorAll('.word-item'))
                .filter(word => word.textContent === typedValue && !word.hasAttribute('data-used-for'));

            if (availableWordItems.length > 0) {
                const wordItem = availableWordItems[0];
                const previousWord = wordBank.querySelector(`.word-item[data-used-for="${input.id}"]`);
                if (previousWord) previousWord.removeAttribute('data-used-for');
                
                wordItem.setAttribute('data-used-for', input.id);
                updateWordStates();
                
                const inputs = Array.from(container.querySelectorAll('.blank-input'));
                const currentIndex = inputs.indexOf(input);
                let nextEmpty = inputs.slice(currentIndex + 1).find(i => !i.value) ||
                                inputs.slice(0, currentIndex).find(i => !i.value);
                if (nextEmpty) {
                    nextEmpty.classList.add('selected');
                    nextEmpty.focus();
                    selectedInput = nextEmpty;
                }
            } else if (!typedValue) {
                const previousWord = wordBank.querySelector(`.word-item[data-used-for="${input.id}"]`);
                if (previousWord) previousWord.removeAttribute('data-used-for');
                updateWordStates();
            }
        };

        const initWordItems = () => {
            container.querySelectorAll('.word-item').forEach(phrase => {
                phrase.addEventListener('click', () => {
                    if (selectedInput && !phrase.hasAttribute('data-used-for')) {
                        const previousWord = wordBank.querySelector(`.word-item[data-used-for="${selectedInput.id}"]`);
                        if (previousWord) previousWord.removeAttribute('data-used-for');
                        
                        selectedInput.value = phrase.textContent;
                        phrase.setAttribute('data-used-for', selectedInput.id);
                        updateWordStates();
                        
                        const inputs = Array.from(container.querySelectorAll('.blank-input'));
                        const currentIndex = inputs.indexOf(selectedInput);
                        let nextEmpty = inputs.slice(currentIndex + 1).find(i => !i.value) ||
                                        inputs.slice(0, currentIndex).find(i => !i.value);
                        selectedInput.classList.remove('selected');
                        selectedInput = null;
                        if (nextEmpty) {
                            nextEmpty.classList.add('selected');
                            nextEmpty.focus();
                            selectedInput = nextEmpty;
                        }
                    }
                });

                phrase.addEventListener('dragstart', (e) => {
                    e.dataTransfer.setData('text/plain', phrase.textContent);
                });

                phrase.addEventListener('dragend', () => {
                    phrase.classList.remove('dragging');
                });
            });
        };

        container.querySelectorAll('.blank-input').forEach((input, index) => {
            input.id = `input-${index}`;
            
            input.addEventListener('click', function() {
                container.querySelectorAll('.blank-input').forEach(i => i.classList.remove('selected'));
                this.classList.add('selected');
                selectedInput = this;
            });

            input.addEventListener('input', () => handleInputChange(input));

            input.addEventListener('paste', (e) => {
                e.preventDefault();
                const pastedText = (e.clipboardData || window.clipboardData).getData('text');
                input.value = pastedText;
                handleInputChange(input);
            });

            input.addEventListener('drop', (e) => {
                e.preventDefault();
                const draggedText = e.dataTransfer.getData('text/plain');
                const availableWordItems = Array.from(wordBank.querySelectorAll('.word-item'))
                    .filter(word => word.textContent === draggedText && !word.hasAttribute('data-used-for'));

                if (availableWordItems.length > 0) {
                    const wordItem = availableWordItems[0];
                    const previousWord = wordBank.querySelector(`.word-item[data-used-for="${input.id}"]`);
                    if (previousWord) previousWord.removeAttribute('data-used-for');
                    
                    input.value = draggedText;
                    wordItem.setAttribute('data-used-for', input.id);
                    updateWordStates();
                }
            });

            input.addEventListener('dragover', (e) => e.preventDefault());
        });

        container.querySelectorAll('.clear-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const input = e.target.previousElementSibling;
                clearInput(input);
                input.focus();
            });
        });

        container.querySelector('.check-btn').addEventListener('click', () => {
            let allCorrect = true;
            container.querySelectorAll('.blank-input').forEach(input => {
                const correct = input.value.trim() === input.dataset.answer;
                input.classList.toggle('correct', correct);
                input.classList.toggle('incorrect', !correct);
                if (!correct) allCorrect = false;
            });

            container.querySelector('.feedback').innerHTML = allCorrect ?
                '<div style="color:green">Todas corretas! 🎉</div>' :
                '<div style="color:red">Algumas incorretas! ❌</div>';
        });

        container.querySelector('.reset-btn').addEventListener('click', () => {
            container.querySelectorAll('.blank-input').forEach(input => {
                input.value = '';
                input.classList.remove('correct', 'incorrect', 'selected');
            });
            wordBank.querySelectorAll('.word-item').forEach(word => {
                word.removeAttribute('data-used-for');
            });
            container.querySelector('.feedback').innerHTML = '';
            selectedInput = null;
            initPhrases();
            updateWordStates();
        });

        initPhrases();
        updateWordStates();
    }
});