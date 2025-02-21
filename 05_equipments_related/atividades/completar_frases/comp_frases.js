document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.activity-container').forEach(container => {
        initActivity(container);
    });

    function initActivity(container) {
        let selectedInput = null;

        // Preenche o banco de palavras
        const wordBank = container.querySelector('.word-bank');
        const words = wordBank.dataset.words.split(',');
        wordBank.innerHTML = words.map(word => 
            `<div class="word-item">${word}</div>`
        ).join('');

        // Seleção de inputs
        container.querySelectorAll('.blank-input').forEach(input => {
            input.addEventListener('click', function() {
                container.querySelectorAll('.blank-input').forEach(i => {
                    i.classList.remove('selected');
                });
                this.classList.add('selected');
                selectedInput = this;
            });
        });

        // Preenchimento de palavras
        container.querySelectorAll('.word-item').forEach(word => {
            word.addEventListener('click', () => {
                if (selectedInput) {
                    const currentInput = selectedInput;
                    currentInput.value = word.textContent;
                    currentInput.classList.remove('selected');
                    
                    // Encontra próximo input vazio
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
                }
            });
        });

        // Verificação de respostas
        container.querySelector('.check-btn').addEventListener('click', () => {
            let allCorrect = true;
            const feedback = container.querySelector('.feedback');
            
            container.querySelectorAll('.blank-input').forEach(input => {
                const correctAnswer = input.dataset.answer;
                
                if (input.value.trim().toLowerCase() === correctAnswer.toLowerCase()) {
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
            container.querySelector('.feedback').innerHTML = '';
            selectedInput = null;
        });
    }
});