function reiniciarJogo(){
    for(elemento of camposDoJogo){
        elemento.classList.remove('x');
        elemento.classList.remove('circle');
        elemento.classList.add('disponivel');
    }
    document.getElementById('mensagem').style.display = 'none';
}

const camposDoJogo = document.querySelectorAll(".item");
camposDoJogo.forEach((elemento) => {
  elemento.addEventListener("click", () => {
    if(elemento.classList.contains('disponivel')){
        elemento.classList.add("x");
        elemento.classList.remove("disponivel");

        let winStatus;
        if(verificaWin('x')){
            winStatus = 'x';
            fimDeJogo(winStatus);
        }else{
            adicionarCircle();
            if(verificaWin('circle')){
                winStatus = 'circle';
                fimDeJogo(winStatus);
            }
        }
        
        if(celulasDisponiveis.length == 0){
            winStatus = 'velha';
            fimDeJogo(winStatus);
        }
    }
  });
});

function fimDeJogo(winner){
    document.getElementById('mensagem').style.display = 'block';
    mensagemWin = document.getElementById('mensagem');
    for(let celula of celulasDisponiveis){
        celula.classList.remove("disponivel");
    }

    switch(winner){
        case 'x':
            mensagemWin.innerHTML = '<h2>X foi o Vencedor!</h2>';
            break;
        case 'circle':
            mensagemWin.innerHTML = '<h2>Bola foi o Vencedor!</h2>';
            break;
        case 'velha':
            mensagemWin.innerHTML = '<h2>Velha</h2>';
            break;
        default:
            mensagemWin.innerHTML = '<h2>Erro desconhecido</h2>';
    }
}

function adicionarCircle(){ 
    celulasDisponiveis = document.querySelectorAll(".disponivel");
    if(celulasDisponiveis.length > 0){
        const posicao = Math.floor(Math.random() * celulasDisponiveis.length);
        celulasDisponiveis[posicao].classList.add("circle");
        celulasDisponiveis[posicao].classList.remove("disponivel");
    }
}

function verificaWin(forma){
    const itens = [];
    let i = 0;
    let venceu = false;

    for(const elemento of camposDoJogo){
        if(elemento.classList.contains(forma)){
            itens.push(i);
        }
        i++;
    }

    for(const value of combinacoesWin){
        let ocorrencias = 0;
        for(let contador = 0; contador < 3; contador++){
            for(const item of itens){
                if(item == value[contador]){
                    ocorrencias++;
                    if(ocorrencias == 3){
                        venceu = true;
                        break;
                    }
                }
            }
        }
    }
    return venceu;
}

const combinacoesWin = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];