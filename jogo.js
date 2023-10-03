// Selecionar todos os elementos com a classe "celula" e os armazena em uma lista
const celulas = document.querySelectorAll(".celula");

// Inicializa a variável checarTurno como verdadeira.
let checarTurno = true;

// Inicializar a variável turno, que será usado para alternar entre "X" e "O"
let turno;

// Define constante para representar os jogadores "X" e "O".
const JOGADOR_X = "X";
const JOGADOR_O = "O";

// Inicalizar a variável JogoAcabou como falso, indicando que o jogo está em andamento.
let jogoAcabou = false;

// Adiciona um evento de clique ao documento que é adicionado qunado qualquer elemento é clicado
document.addEventListener("click", (event)=> {
    // Verifica se o elemento clicado possui a classe "celula" e se o jogo ainda não acabou.
    if (event.target.matches(".celula") && !jogoAcabou) {
        //chama a função jogar, passando o ID do elemento clicado como argumento.
        jogar(event.target.id);
    }
});

// Função que representa a jogada de um jogador.
function jogar(id) {
    // Obtém o elemento com ID corrrespondente ao argumento passado.
    const celula = document.getElementById(id);
    
    if(celula.textContent === "") {

        turno = checarTurno ? JOGADOR_X : JOGADOR_O;

        checarTurno = !checarTurno;

        celula.textContent = turno;

        celula.classList.add(turno);

        celula.removeEventListener("click", jogar);

        verificarVencedor(turno);
    }
}

function verificarVencedor(jogador) {
    const combinacoesVitoria = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 8],
    ];

    for (const combinacao of combinacoesVitoria) {
        const [a, b, c] = combinacao;
        if (
            celulas[a].textContent === jogador &&
            celulas[b].textContent === jogador &&
            celulas[c].textContent === jogador
        ) {
            jogoAcabou = true;
            alert(`O jogador ${jogador} venceu`);
            return;
        }
    }

    if ([...celulas].every((celula) => celula.textContent !== "")){
        jogoAcabou = true;
        alert("Empate!");
    }
}