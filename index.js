//slide infinito carrosel com manipulacao de DOM

const slides = document.querySelector(".slides");
const cards = document.querySelectorAll(".cards");
const botaoAnterior = document.querySelector(".anterior");
const botaoProximo = document.querySelector(".proximo");

botaoAnterior.addEventListener("click", () => {
    slides.prepend(slides.lastElementChild);
})
botaoProximo.addEventListener("click", () => {
    slides.appendChild(slides.firstElementChild);
})

//slide finito com transition

const slidesFinito = document.querySelector(".slides-finito");
const cardsFinito = document.querySelectorAll(".cards-finito");
const botaoAnterior2 = document.querySelector(".anterior2");
const botaoProximo2 = document.querySelector(".proximo2");

let index = 0;

const larguraCard = cardsFinito[0].offsetWidth;
const total = cardsFinito.length;

function atualizar() {
    slidesFinito.style.transform = `translateX(${-index * larguraCard}px)`;
}
function atualizarBotoes(){

    if(index === 0){
        botaoAnterior2.style.display = "none";
    } else {
        botaoAnterior2.style.display = "block";
    }

    if(index === total - 3){
        botaoProximo2.style.display = "none";
    } else {
        botaoProximo2.style.display = "block";
    }

}

botaoProximo2.addEventListener("click", () => {

    if (index < total - 1) {
        index++;
        atualizar();
        atualizarBotoes()
    }

});

botaoAnterior2.addEventListener("click", () => {

    if (index > 0) {
        index--;
        atualizar();
        atualizarBotoes()
    }

});

/* slide infinito carrosel com transition*/

const slidesInfinito = document.querySelector(".slides-infinito");
let cardsInfinito = document.querySelectorAll(".cards-infinito");
const botaoAnterior3 = document.querySelector(".anterior3");
const botaoProximo3 = document.querySelector(".proximo3");

const quantidadeVisivel = 4;

for (let i = 0; i < quantidadeVisivel; i++) {//criando 4 clones no comeco, e 4 clones no final

    const cloneInicio = cardsInfinito[i].cloneNode(true);
    slidesInfinito.appendChild(cloneInicio);

    const cloneFim = cardsInfinito[cardsInfinito.length - 1 - i].cloneNode(true);
    slidesInfinito.prepend(cloneFim);

}

let indexInfinito = quantidadeVisivel;//comecar no 1°, nao no clone

cardsInfinito = document.querySelectorAll(".cards-infinito");//atualiza a variavel junto com os clones

const larguraCardInfinito = cardsInfinito[0].offsetWidth
const totalInfinito = cardsInfinito.length;

slidesInfinito.style.transform = `translateX(${-indexInfinito * larguraCardInfinito}px)`//comecar no 1°, nao no clone

slidesInfinito.addEventListener("transitionend", () => {

    // foi pro final (direita)
    if (indexInfinito >= totalInfinito - quantidadeVisivel) {//se o index for maior ou igual a 9(primeiro clone), volta pro 4 que e o primeiro real

        slidesInfinito.style.transition = "none";

        indexInfinito = quantidadeVisivel;

        slidesInfinito.style.transform = `translateX(${-indexInfinito * larguraCardInfinito}px)`;
    }

    // foi pro começo (esquerda)

    if (indexInfinito <= 0) {//se o index for zero e o ultimo clone, mais conhecido como [2][3][4][5], quando isso acontece definimos o index como 13 - 8 = 5, 5 sendo o 2 real q representa o mesmo slide q o index 0 

        slidesInfinito.style.transition = "none";

        indexInfinito = totalInfinito - quantidadeVisivel * 2;

        slidesInfinito.style.transform = `translateX(${-indexInfinito * larguraCardInfinito}px)`;
    }

});

function atualizarCardInfinito() {

    slidesInfinito.style.transition = "transform 0.4s ease";
    slidesInfinito.style.transform = `translateX(${-indexInfinito * larguraCardInfinito}px)`;

}

let autoplay = setInterval(() => {//cria o intervalo

    indexInfinito++;
    atualizarCardInfinito();

}, 3000);

const containerInfinito = document.querySelector(".container-slideInfinito");

containerInfinito.addEventListener("mouseenter", () => {//zera o intervalo quando o mouse esta emcima do container
    clearInterval(autoplay);
});

containerInfinito.addEventListener("mouseleave", () => {//volta o intervalo quando o mouse sai
    
    autoplay = setInterval(() => {
        indexInfinito++;
        atualizarCardInfinito();
    }, 3000);
});

function reiniciarAutoplay() {//zera o interval quando clica com o mouse no botao, evitando conflito

    clearInterval(autoplay);

    autoplay = setInterval(() => {
        atualizarCardInfinito();
    }, 3000);

}

botaoProximo3.addEventListener("click", () => {

    indexInfinito++;
    atualizarCardInfinito();
    reiniciarAutoplay()

});

botaoAnterior3.addEventListener("click", () => {

    indexInfinito--;
    atualizarCardInfinito();

});