document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.activity-container').forEach(container => {
        initActivity(container);
    });

    function initActivity(container) {
        let selectedInput = null;
        let phrases = [];
        const wordBank = container.querySelector('.word-bank');

        // Função para embaralhar array
        const shuffleArray = (array) => {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        };

        // Atualiza banco de palavras
        const updateWordBank = () => {
            wordBank.innerHTML = phrases.map(phrase => 
                `<div class="word-item">${phrase}</div>`
            ).join('');
            initWordItems();
        };

        // Inicializa frases
        const initPhrases = () => {
            phrases = wordBank.dataset.words.split(';').map(p => p.trim());
            shuffleArray(phrases);
            updateWordBank();
        };

        // Atualiza palavras usadas
        const updateUsedWords = () => {
            const inputs = Array.from(container.querySelectorAll('.blank-input'));
            const usedValues = inputs.map(input => input.value.trim());
            
            wordBank.querySelectorAll('.word-item').forEach(word => {
                word.classList.toggle('used', usedValues.includes(word.textContent));
            });
        };

        // Inicializa eventos das palavras
        const initWordItems = () => {
            container.querySelectorAll('.word-item').forEach(phrase => {
                phrase.addEventListener('click', () => {
                    if (selectedInput && !phrase.classList.contains('used')) {
                        const currentInput = selectedInput;
                        
                        // Remove estilo da palavra anterior
                        const previousWord = wordBank.querySelector(`.word-item[data-used-for="${currentInput.id}"]`);
                        if (previousWord) {
                            previousWord.removeAttribute('data-used-for');
                            previousWord.classList.remove('used');
                        }

                        // Atualiza input
                        currentInput.value = phrase.textContent;
                        currentInput.classList.remove('selected');
                        
                        // Marca palavra como usada
                        phrase.setAttribute('data-used-for', currentInput.id);
                        phrase.classList.add('used');

                        // Atualiza próximo campo
                        const inputs = Array.from(container.querySelectorAll('.blank-input'));
                        const nextEmpty = inputs.find(input => 
                            input !== currentInput && 
                            input.value === '' &&
                            inputs.indexOf(input) > inputs.indexOf(currentInput)
                        );

                        if (nextEmpty) {
                            nextEmpty.classList.add('selected');
                            nextEmpty.focus();
                            selectedInput = nextEmpty;
                        } else if (inputs.every(input => input.value !== '')) {
                            container.querySelector('.check-btn').click();
                        } else {
                            selectedInput = null;
                        }
                        
                        updateUsedWords();
                    }
                });
            });
        };

        // Seleção de inputs
        container.querySelectorAll('.blank-input').forEach((input, index) => {
            input.id = `input-${index}`;
            input.addEventListener('click', function() {
                container.querySelectorAll('.blank-input').forEach(i => {
                    i.classList.remove('selected');
                });
                this.classList.add('selected');
                selectedInput = this;
            });
        });

        // Verificação de respostas
        container.querySelector('.check-btn').addEventListener('click', () => {
            let allCorrect = true;
            const feedback = container.querySelector('.feedback');
            
            container.querySelectorAll('.blank-input').forEach(input => {
                const correctAnswer = input.dataset.answer;
                
                if (input.value.trim() === correctAnswer) {
                    input.classList.add('correct');
                    input.classList.remove('incorrect');
                } else {
                    input.classList.add('incorrect');
                    input.classList.remove('correct');
                    allCorrect = false;
                }
                input.disabled = true;
            });

            feedback.innerHTML = allCorrect ? 
                '<div class="alert alert-success">Todas as respostas estão corretas! 🎉</div>' : 
                '<div class="alert alert-danger">Algumas respostas estão incorretas. Tente novamente!</div>';
        });

        // Reinicia atividade
        container.querySelector('.reset-btn').addEventListener('click', () => {
            container.querySelectorAll('.blank-input').forEach(input => {
                input.value = '';
                input.classList.remove('correct', 'incorrect', 'selected');
                input.disabled = false;
            });
            wordBank.querySelectorAll('.word-item').forEach(word => {
                word.classList.remove('used');
                word.removeAttribute('data-used-for');
            });
            container.querySelector('.feedback').innerHTML = '';
            selectedInput = null;
            initPhrases();
        });

        initPhrases();
    }
});