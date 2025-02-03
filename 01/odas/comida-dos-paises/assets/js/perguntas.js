var estruturageral = {
    mensagemfinal: {
        positiva:{
           texto: [
                "Great job! You nailed it!",
                "If you want to, you can practice again by clicking on the button bellow."
            ],
            
        },
        negativa:{
            texto: [
                "It was close!",
                "It’s always a good idea to review and try again. Sometimes success is just around the corner. Keep going",
                "To restart, simply click the button below.."
            ],
         
        }
        
    },
    introducao: { // Se introducao = false não abre a modal com a introducao. Se tiver conteúdo, abre com o conteúdo no padrão abaixo
        texto: [
            "Muito bem! Você arrasou!",
            "Se você quiser, você pode praticar novamente clicando no botão abaixo."
        ],
        imagem: {
            src: "custom/img/imgpergunta.jpg",
            title: "One Piece questions",
            alt:"Imagem sobre o one piece",
            fonte: "Imagem tirada do google no dia 15-03-2024"
        },
    },
    config: {
        acertos_para_vitoria: 0, // 0 = >50% de acertos.
        globalType: "quiz" // caso as perguntas não possuam type, será definido um padrão. (globalType = "") = "quiz"
        // permitirApenas: 0; 0 = todas. Caso o usuário coloque um número como 10, por exemplo, o quiz vai exibir apenas 10 perguntas, mesmo que tenha 11 ou 1000 perguntas.
        // modo = 0; 0 ou "ordenado" significa uma pergunta após a outra. "inverso" ele começa pela última e "aleatorio" ele embaralha, tornando a ordem das perguntas aleatória.
    }
}
var perguntas = [
    { 
        type: "dragindrop",
        titulo: "Where are these dishes from?",
        pergunta: {
            texto: "Drag and drop the name of the right country in the field beflow the picture."        
        },
        respostas: [
            {
                ordem: "a",
                validacao: true,
                texto: "The United Kingdom",
                relacionarCom: { 
                    texto: "Fish and Chips",
                    imagem: {
                        src: "custom/img/img1.jpg",
                        title: "Drag in drop",
                        alt:"Photograph of a plate containing a piece of sliced meat, french fries, lime and a small bowl of sauce.",
                        
                    },
                }
            },
            {
                ordem: "b",
                validacao: false,
                texto: "Japan",
                relacionarCom: { 
                    texto: "Fish and Chips",
                    imagem: {
                        src: "custom/img/img1.jpg",
                        title: "Drag in drop",
                        alt:"Photograph of a plate containing a piece of sliced meat, french fries, lime and a small bowl of sauce.",
                        
                    },
                }
            },
            {
                ordem: "c",
                validacao: false,
                texto: "The United States",
                relacionarCom: { 
                    texto: "Fish and Chips",
                    imagem: {
                        src: "custom/img/img1.jpg",
                        title: "Drag in drop",
                        alt:"Photograph of a plate containing a piece of sliced meat, french fries, lime and a small bowl of sauce.",
                        
                    },
                }
            },
            {
                ordem: "d",
                validacao: false,
                texto: "Germany",
                relacionarCom: { 
                    texto: "Fish and Chips",
                    imagem: {
                        src: "custom/img/img1.jpg",
                        title: "Drag in drop",
                        alt:"Photograph of a plate containing a piece of sliced meat, french fries, lime and a small bowl of sauce.",
                        
                    },
                }
            },
            {
                ordem: "e",
                validacao: false,
                texto: "Brazil",
                relacionarCom: { 
                    texto: "Fish and Chips",
                    imagem: {
                        src: "custom/img/img1.jpg",
                        title: "Drag in drop",
                        alt:"Photograph of a plate containing a piece of sliced meat, french fries, lime and a small bowl of sauce.",
                        
                    },
                }
            },
            {
                ordem: "f",
                validacao: false,
                texto: "Italy",
                relacionarCom: { 
                    texto: "Fish and Chips",
                    imagem: {
                        src: "custom/img/img1.jpg",
                        title: "Drag in drop",
                        alt:"Photograph of a plate containing a piece of sliced meat, french fries, lime and a small bowl of sauce.",
                        
                    },
                }
            },
            
       
          
        ],
        feedbacks: {
            
            positivo: {
                    texto: "Great job!", 
                },
            negativo: {
                    texto: "Unfortunately, this is not the right country."
                }
            
        }
    },
    { 
        type: "dragindrop",
        titulo: "Where are these dishes from?",
        pergunta: {
            texto: "Drag and drop the name of the right country in the field beflow the picture."        
        },
        respostas: [
            {
                ordem: "a",
                validacao: false,
                texto: "The United Kingdom",
                relacionarCom: { 
                    texto: "Feijoada",
                    imagem: {
                        src: "custom/img/img2.jpg",
                        title: "Drag in drop",
                        alt:"Picture of a feijoada dish, with oranges, rice and kale in the background.",
                        
                    },
                }
            },
            {
                ordem: "b",
                validacao: false,
                texto: "Japan",
                relacionarCom: { 
                    texto: "Feijoada",
                    imagem: {
                        src: "custom/img/img2.jpg",
                        title: "Drag in drop",
                        alt:"Picture of a feijoada dish, with oranges, rice and kale in the background.",
                        
                    },
                }
            },
            {
                ordem: "c",
                validacao: false,
                texto: "The United States",
                relacionarCom: { 
                    texto: "Feijoada",
                    imagem: {
                        src: "custom/img/img2.jpg",
                        title: "Drag in drop",
                        alt:"Picture of a feijoada dish, with oranges, rice and kale in the background.",
                        
                    },
                }
            },
            {
                ordem: "d",
                validacao: false,
                texto: "Germany",
                relacionarCom: { 
                    texto: "Feijoada",
                    imagem: {
                        src: "custom/img/img2.jpg",
                        title: "Drag in drop",
                        alt:"Picture of a feijoada dish, with oranges, rice and kale in the background.",
                        
                    },
                }
            },
            {
                ordem: "e",
                validacao: true,
                texto: "Brazil",
                relacionarCom: { 
                    texto: "Feijoada",
                    imagem: {
                        src: "custom/img/img2.jpg",
                        title: "Drag in drop",
                        alt:"Picture of a feijoada dish, with oranges, rice and kale in the background.",
                        
                    },
                }
            },
            {
                ordem: "f",
                validacao: false,
                texto: "Italy",
                relacionarCom: { 
                    texto: "Feijoada",
                    imagem: {
                        src: "custom/img/img2.jpg",
                        title: "Drag in drop",
                        alt:"Picture of a feijoada dish, with oranges, rice and kale in the background.",
                        
                    },
                }
            },
            
       
          
        ],
        feedbacks: {
            
            positivo: {
                    texto: "Great job!", 
                },
            negativo: {
                    texto: "Unfortunately, this is not the right country."
                }
            
        }
    },
    { 
        type: "dragindrop",
        titulo: "Where are these dishes from?",
        pergunta: {
            texto: "Drag and drop the name of the right country in the field beflow the picture."        
        },
        respostas: [
            {
                ordem: "a",
                validacao: false,
                texto: "The United Kingdom",
                relacionarCom: { 
                    texto: "Hamburger",
                    imagem: {
                        src: "custom/img/img3.jpg",
                        title: "Drag in drop",
                        alt:"Picture of a hamburger with meat, cheese and vegetables.",
                        
                    },
                }
            },
            {
                ordem: "b",
                validacao: false,
                texto: "Japan",
                relacionarCom: { 
                    texto: "Hamburger",
                    imagem: {
                        src: "custom/img/img3.jpg",
                        title: "Drag in drop",
                        alt:"Picture of a hamburger with meat, cheese and vegetables.",
                        
                    },
                }
            },
            {
                ordem: "c",
                validacao: true,
                texto: "The United States",
                relacionarCom: { 
                    texto: "Hamburger",
                    imagem: {
                        src: "custom/img/img3.jpg",
                        title: "Drag in drop",
                        alt:"Picture of a hamburger with meat, cheese and vegetables.",
                        
                    },
                }
            },
            {
                ordem: "d",
                validacao: false,
                texto: "Germany",
                relacionarCom: { 
                    texto: "Hamburger",
                    imagem: {
                        src: "custom/img/img3.jpg",
                        title: "Drag in drop",
                        alt:"Picture of a hamburger with meat, cheese and vegetables.",
                        
                    },
                }
            },
            {
                ordem: "e",
                validacao: false,
                texto: "Brazil",
                relacionarCom: { 
                    texto: "Hamburger",
                    imagem: {
                        src: "custom/img/img3.jpg",
                        title: "Drag in drop",
                        alt:"Picture of a hamburger with meat, cheese and vegetables.",
                        
                    },
                }
            },
            {
                ordem: "f",
                validacao: false,
                texto: "Italy",
                relacionarCom: { 
                    texto: "Hamburger",
                    imagem: {
                        src: "custom/img/img3.jpg",
                        title: "Drag in drop",
                        alt:"Picture of a hamburger with meat, cheese and vegetables.",
                        
                    },
                }
            },
            
       
          
        ],
        feedbacks: {
            
            positivo: {
                    texto: "Great job!", 
                },
            negativo: {
                    texto: "Unfortunately, this is not the right country."
                }
            
        }
    },
    { 
        type: "dragindrop",
        titulo: "Where are these dishes from?",
        pergunta: {
            texto: "Drag and drop the name of the right country in the field beflow the picture."        
        },
        respostas: [
            {
                ordem: "a",
                validacao: false,
                texto: "The United Kingdom",
                relacionarCom: { 
                    texto: "Lasagna",
                    imagem: {
                        src: "custom/img/img4.jpg",
                        title: "Drag in drop",
                        alt:"Picture of a plate with a slice of lasagna on it.",
                        
                    },
                }
            },
            {
                ordem: "b",
                validacao: false,
                texto: "Japan",
                relacionarCom: { 
                    texto: "Lasagna",
                    imagem: {
                        src: "custom/img/img4.jpg",
                        title: "Drag in drop",
                        alt:"Picture of a plate with a slice of lasagna on it.",
                        
                    },
                }
            },
            {
                ordem: "c",
                validacao: false,
                texto: "The United States",
                relacionarCom: { 
                    texto: "Lasagna",
                    imagem: {
                        src: "custom/img/img4.jpg",
                        title: "Drag in drop",
                        alt:"Picture of a plate with a slice of lasagna on it.",
                        
                    },
                }
            },
            {
                ordem: "d",
                validacao: false,
                texto: "Germany",
                relacionarCom: { 
                    texto: "Lasagna",
                    imagem: {
                        src: "custom/img/img4.jpg",
                        title: "Drag in drop",
                        alt:"Picture of a plate with a slice of lasagna on it.",
                        
                    },
                }
            },
            {
                ordem: "e",
                validacao: false,
                texto: "Brazil",
                relacionarCom: { 
                    texto: "Lasagna",
                    imagem: {
                        src: "custom/img/img4.jpg",
                        title: "Drag in drop",
                        alt:"Picture of a plate with a slice of lasagna on it.",
                        
                    },
                }
            },
            {
                ordem: "f",
                validacao: true,
                texto: "Italy",
                relacionarCom: { 
                    texto: "Lasagna",
                    imagem: {
                        src: "custom/img/img4.jpg",
                        title: "Drag in drop",
                        alt:"Picture of a plate with a slice of lasagna on it.",
                        
                    },
                }
            },
            
       
          
        ],
        feedbacks: {
            
            positivo: {
                    texto: "Great job!", 
                },
            negativo: {
                    texto: "Unfortunately, this is not the right country."
                }
            
        }
    },
    { 
        type: "dragindrop",
        titulo: "Where are these dishes from?",
        pergunta: {
            texto: "Drag and drop the name of the right country in the field beflow the picture."        
        },
        respostas: [
            {
                ordem: "a",
                validacao: false,
                texto: "The United Kingdom",
                relacionarCom: { 
                    texto: "Sushi",
                    imagem: {
                        src: "custom/img/img5.jpg",
                        title: "Drag in drop",
                        alt:"Picture of three sushi pieces, with a light background.",
                        
                    },
                }
            },
            {
                ordem: "b",
                validacao: true,
                texto: "Japan",
                relacionarCom: { 
                    texto: "Sushi",
                    imagem: {
                        src: "custom/img/img5.jpg",
                        title: "Drag in drop",
                        alt:"Picture of three sushi pieces, with a light background.",
                        
                    },
                }
            },
            {
                ordem: "c",
                validacao: false,
                texto: "The United States",
                relacionarCom: { 
                    texto: "Sushi",
                    imagem: {
                        src: "custom/img/img5.jpg",
                        title: "Drag in drop",
                        alt:"Picture of three sushi pieces, with a light background.",
                        
                    },
                }
            },
            {
                ordem: "d",
                validacao: false,
                texto: "Germany",
                relacionarCom: { 
                    texto: "Sushi",
                    imagem: {
                        src: "custom/img/img5.jpg",
                        title: "Drag in drop",
                        alt:"Picture of three sushi pieces, with a light background.",
                        
                    },
                }
            },
            {
                ordem: "e",
                validacao: false,
                texto: "Brazil",
                relacionarCom: { 
                    texto: "Sushi",
                    imagem: {
                        src: "custom/img/img5.jpg",
                        title: "Drag in drop",
                        alt:"Picture of three sushi pieces, with a light background.",
                        
                    },
                }
            },
            {
                ordem: "f",
                validacao: false,
                texto: "Italy",
                relacionarCom: { 
                    texto: "Sushi",
                    imagem: {
                        src: "custom/img/img5.jpg",
                        title: "Drag in drop",
                        alt:"Picture of three sushi pieces, with a light background.",
                        
                    },
                }
            },
            
       
          
        ],
        feedbacks: {
            
            positivo: {
                    texto: "Great job!", 
                },
            negativo: {
                    texto: "Unfortunately, this is not the right country."
                }
            
        }
    },
   
  
]