
  // Função para embaralhar array (Fisher-Yates)
function shuffle(array) {
for (let i = array.length - 1; i > 0; i--) {
const j = Math.floor(Math.random() * (i + 1));
[array[i], array[j]] = [array[j], array[i]];
}
return array;
}

// Função para embaralhar itens nas colunas
function shuffleItems(container) {
const leftCol = container.querySelector('.left-col');
const rightCol = container.querySelector('.right-col');

// Embaralhar e reordenar itens da esquerda
const leftItems = Array.from(leftCol.children);
shuffle(leftItems);
leftItems.forEach(item => leftCol.appendChild(item));

// Embaralhar e reordenar itens da direita
const rightItems = Array.from(rightCol.children);
shuffle(rightItems);
rightItems.forEach(item => rightCol.appendChild(item));
}
document.querySelectorAll('.match-container').forEach(container => {
    const pairs = JSON.parse(container.dataset.pairs);
    const leftItems = container.querySelectorAll('.left-col .match-item');
    const rightItems = container.querySelectorAll('.right-col .match-item');
    const feedback = container.querySelector('.feedback');
    const retryBtn = container.querySelector('.retry-btn');
    
    // Embaralhar inicial
    shuffleItems(container);

    let selectedItem = null;

    // Atualizar a seleção de itens após embaralhar
    const updateItems = () => {
        leftItems = container.querySelectorAll('.left-col .match-item');
        rightItems = container.querySelectorAll('.right-col .match-item');
    };
    
    // Seleção de itens
    const handleSelection = (item) => {
        if (item.classList.contains('correct')) return;

        if (item.parentElement.classList.contains('left-col')) {
            if (selectedItem) selectedItem.classList.remove('selected');
            selectedItem = item;
            item.classList.add('selected');
        } else {
            if (selectedItem) {
                const leftId = selectedItem.dataset.id;
                const rightId = item.dataset.id;
                
                const isCorrect = pairs.some(pair => 
                    pair.left === leftId && pair.right === rightId
                );

                // Aplicar estilos
                selectedItem.classList.add(isCorrect ? 'correct' : 'incorrect');
                item.classList.add(isCorrect ? 'correct' : 'incorrect');
                
                // Feedback
                feedback.textContent = isCorrect ? '✓ Correto!' : '✗ Incorreto!';
                feedback.style.color = isCorrect ? 'green' : 'red';

                // Resetar seleção
                selectedItem.classList.remove('selected');
                selectedItem = null;
            }
        }
    };

    // Event listeners
    leftItems.forEach(item => {
        item.addEventListener('click', () => handleSelection(item));
    });

    rightItems.forEach(item => {
        item.addEventListener('click', () => handleSelection(item));
    });

    // Botão de tentar novamente
    retryBtn.addEventListener('click', () => {
        leftItems.forEach(item => {
            item.classList.remove('selected', 'correct', 'incorrect');
        });
        rightItems.forEach(item => {
            item.classList.remove('correct', 'incorrect');
        });
        feedback.textContent = '';
        selectedItem = null;
    });
});