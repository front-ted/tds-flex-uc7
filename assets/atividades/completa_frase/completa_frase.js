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
                        `<div class="word-item" draggable="true">${phrase}</div>`
                    ).join('');
                    initWordItems();
                };

                // Inicializa frases
                const initPhrases = () => {
                    phrases = wordBank.dataset.words.split(';').map(p => p.trim());
                    shuffleArray(phrases);
                    updateWordBank();
                };

                // Atualiza estado das palavras
                const updateWordStates = () => {
                    const inputs = Array.from(container.querySelectorAll('.blank-input'));
                    const usedValues = inputs.map(input => input.value.trim());
                    
                    wordBank.querySelectorAll('.word-item').forEach(word => {
                        const isUsed = usedValues.includes(word.textContent);
                        word.classList.toggle('used', isUsed);
                        word.classList.toggle('available', !isUsed);
                    });
                };

                // Remove palavra de um campo
                const clearInput = (input) => {
                    const word = wordBank.querySelector(`.word-item[data-used-for="${input.id}"]`);
                    if (word) {
                        word.classList.remove('used');
                        word.classList.add('available');
                        word.removeAttribute('data-used-for');
                    }
                    input.value = '';
                    updateWordStates();
                };

                // Verifica se o texto digitado está no banco de palavras
                const handleInputChange = (input) => {
                    const typedValue = input.value.trim();
                    const wordItem = Array.from(wordBank.querySelectorAll('.word-item'))
                        .find(word => word.textContent === typedValue);

                    if (wordItem && wordItem.classList.contains('available')) {
                        // Remove palavra anterior se existir
                        const previousWord = wordBank.querySelector(`.word-item[data-used-for="${input.id}"]`);
                        if (previousWord) {
                            previousWord.classList.remove('used');
                            previousWord.classList.add('available');
                            previousWord.removeAttribute('data-used-for');
                        }

                        // Marca nova palavra como usada
                        wordItem.classList.remove('available');
                        wordItem.classList.add('used');
                        wordItem.setAttribute('data-used-for', input.id);

                        // Atualiza estados
                        updateWordStates();

                        // Encontra próximo campo vazio
                        const inputs = Array.from(container.querySelectorAll('.blank-input'));
                        const currentIndex = inputs.indexOf(input);
                        let nextEmpty = null;
                        
                        // Procura após o atual
                        for (let i = currentIndex + 1; i < inputs.length; i++) {
                            if (inputs[i].value === '') {
                                nextEmpty = inputs[i];
                                break;
                            }
                        }
                        
                        // Se não encontrou, procura do início
                        if (!nextEmpty) {
                            for (let i = 0; i < currentIndex; i++) {
                                if (inputs[i].value === '') {
                                    nextEmpty = inputs[i];
                                    break;
                                }
                            }
                        }

                        // Foca no próximo campo vazio
                        if (nextEmpty) {
                            nextEmpty.classList.add('selected');
                            nextEmpty.focus();
                            selectedInput = nextEmpty;
                        }
                    } else if (!wordItem) {
                        // Se o texto digitado não estiver no banco, apenas atualiza o estado
                        updateWordStates();
                    }
                };

                // Inicializa eventos das palavras
                const initWordItems = () => {
                    container.querySelectorAll('.word-item').forEach(phrase => {
                        // Evento de clique
                        phrase.addEventListener('click', () => {
                            if (selectedInput && phrase.classList.contains('available')) {
                                // Remove palavra anterior se existir
                                const previousWord = wordBank.querySelector(`.word-item[data-used-for="${selectedInput.id}"]`);
                                if (previousWord) {
                                    previousWord.classList.remove('used');
                                    previousWord.classList.add('available');
                                    previousWord.removeAttribute('data-used-for');
                                }
                                
                                // Preenche com nova palavra
                                selectedInput.value = phrase.textContent;
                                phrase.classList.remove('available');
                                phrase.classList.add('used');
                                phrase.setAttribute('data-used-for', selectedInput.id);
                                
                                // Atualiza estados
                                updateWordStates();
                                
                                // Encontra próximo campo vazio
                                const inputs = Array.from(container.querySelectorAll('.blank-input'));
                                const currentIndex = inputs.indexOf(selectedInput);
                                let nextEmpty = null;
                                
                                // Procura após o atual
                                for (let i = currentIndex + 1; i < inputs.length; i++) {
                                    if (inputs[i].value === '') {
                                        nextEmpty = inputs[i];
                                        break;
                                    }
                                }
                                
                                // Se não encontrou, procura do início
                                if (!nextEmpty) {
                                    for (let i = 0; i < currentIndex; i++) {
                                        if (inputs[i].value === '') {
                                            nextEmpty = inputs[i];
                                            break;
                                        }
                                    }
                                }

                                // Remove seleção atual
                                selectedInput.classList.remove('selected');
                                selectedInput = null;

                                // Foca no próximo campo vazio
                                if (nextEmpty) {
                                    nextEmpty.classList.add('selected');
                                    nextEmpty.focus();
                                    selectedInput = nextEmpty;
                                }
                            }
                        });

                        // Evento de arrastar
                        phrase.addEventListener('dragstart', (e) => {
                            e.dataTransfer.setData('text/plain', phrase.textContent);
                            phrase.classList.add('dragging');
                        });

                        phrase.addEventListener('dragend', () => {
                            phrase.classList.remove('dragging');
                        });
                    });
                };

                // Seleção de inputs
                container.querySelectorAll('.blank-input').forEach((input, index) => {
                    input.id = `input-${index}`;
                    input.addEventListener('click', function(e) {
                        e.stopPropagation();
                        container.querySelectorAll('.blank-input').forEach(i => {
                            i.classList.remove('selected');
                        });
                        this.classList.add('selected');
                        selectedInput = this;
                    });

                    // Evento de digitação
                    input.addEventListener('input', (e) => {
                        const typedValue = e.target.value;
                        input.value = typedValue; // Garante que o valor seja atualizado
                        handleInputChange(input);
                    });

                    // Evento de colagem
                    input.addEventListener('paste', (e) => {
                        e.preventDefault(); // Evita o comportamento padrão de colagem
                        const pastedText = (e.clipboardData || window.clipboardData).getData('text');
                        input.value = pastedText; // Atualiza o valor do campo
                        handleInputChange(input);
                    });

                    // Evento de soltar (drop)
                    input.addEventListener('drop', (e) => {
                        e.preventDefault();
                        const draggedText = e.dataTransfer.getData('text/plain');
                        const wordItem = Array.from(wordBank.querySelectorAll('.word-item'))
                            .find(word => word.textContent === draggedText);

                        if (wordItem && wordItem.classList.contains('available')) {
                            // Remove palavra anterior se existir
                            const previousWord = wordBank.querySelector(`.word-item[data-used-for="${input.id}"]`);
                            if (previousWord) {
                                previousWord.classList.remove('used');
                                previousWord.classList.add('available');
                                previousWord.removeAttribute('data-used-for');
                            }

                            // Preenche com a palavra arrastada
                            input.value = draggedText;
                            wordItem.classList.remove('available');
                            wordItem.classList.add('used');
                            wordItem.setAttribute('data-used-for', input.id);

                            // Atualiza estados
                            updateWordStates();

                            // Encontra próximo campo vazio
                            const inputs = Array.from(container.querySelectorAll('.blank-input'));
                            const currentIndex = inputs.indexOf(input);
                            let nextEmpty = null;
                            
                            // Procura após o atual
                            for (let i = currentIndex + 1; i < inputs.length; i++) {
                                if (inputs[i].value === '') {
                                    nextEmpty = inputs[i];
                                    break;
                                }
                            }
                            
                            // Se não encontrou, procura do início
                            if (!nextEmpty) {
                                for (let i = 0; i < currentIndex; i++) {
                                    if (inputs[i].value === '') {
                                        nextEmpty = inputs[i];
                                        break;
                                    }
                                }
                            }

                            // Foca no próximo campo vazio
                            if (nextEmpty) {
                                nextEmpty.classList.add('selected');
                                nextEmpty.focus();
                                selectedInput = nextEmpty;
                            }
                        }
                    });

                    // Evento de permitir soltar (dragover)
                    input.addEventListener('dragover', (e) => {
                        e.preventDefault();
                    });
                });

                // Botões de limpar
                container.querySelectorAll('.clear-btn').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        const input = e.target.previousElementSibling;
                        clearInput(input);
                        input.focus();
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
                    });
                    wordBank.querySelectorAll('.word-item').forEach(word => {
                        word.classList.remove('used');
                        word.classList.add('available');
                        word.removeAttribute('data-used-for');
                    });
                    container.querySelector('.feedback').innerHTML = '';
                    selectedInput = null;
                    initPhrases();
                    updateWordStates();
                });

                // Inicializa a atividade
                initPhrases();
                updateWordStates();
            }
        });