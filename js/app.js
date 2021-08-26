/** CONSTANTES Y VARIABLES */
//CARTAS EXISTENTES:
const card = [["img/juego/cardA.png","Letra Griega alfa"], ["img/juego/cardB.png","Letra Griega beta"], ["img/juego/cardC.png","Letra Griega delta"], ["img/juego/cardD.png","Letra Griega eta"], ["img/juego/cardE.png","Letra Griega pi"], ["img/juego/cardF.png","Letra Griega mu"]]; //almacenar ubicación imágenes
const uncouple = ["Casi","Inténtalo de nuevo","Sigue intentando"]; //mensajes de fallo
const couple = ["Genial","Fantástico","Perfecto"]; //mensajes de acierto
const opportunities = 12; //oportunidades de tiro
const numCards = 12; //número de cartas para juegar

var shots = -1; //tiros
var hit = 0; //aciertos
var gameBoard = []; //Array para almacenar tablero
var cardBack1 = null ;  //Carta destapada
var cardBack2 = null ;  //Carta destapada
var height_window = window.innerHeight; //Alto de la pantalla
var widht_window = window.innerWidth; //Ancho de la pantalla

/** ELEMENTOS DEL DOM */
var card_div = document.getElementsByClassName("card"); //Array con todas las cartas
var opportunities_div = document.getElementById("opportunities"); //DIV oportunidades
var hit_div = document.getElementById("hit"); //DIV aciertos
var button_input = document.getElementById("button"); //Botón para comenzar
var result_div = document.getElementById("game-result"); //DIV para los mensajes de resultados

/** CARGAR */
window.addEventListener("load", start); //evento load

/**
 * Función para iniciar
 */
function start(){
    
    button_input.addEventListener("click", reload);
    result_div.innerHTML = "Comienza";

    responsive();
    contador();
    board();
    addEvent();
}

/**
 * Función para una web responsive
 */
function responsive(){
    var memorama_section = document.getElementById("memorama"); //Sección del juego
    var result = document.getElementById("result"); //DIV apartado de resultados
    var boxGame_div = document.getElementById("box-game"); //DIV tablero

    if(widht_window < 820){
        memorama_section.style.height = (0.90 * height_window) + "px" ;
        result.style.height = "12%" ;
        boxGame_div.style.height = "83%" ;

    }else{
        memorama_section.style.height = (0.82 * height_window) + "px" ;
    }
}

/**
 * Función para girar las cartas que están ocultas
 */
function toTurn(){
    messageView("-");

    selectCard(this);

    if(cardBack1 == null) cardBack1 = this.dataset.value;
    else{
        cardBack2 = this.dataset.value;
        deaddEvent();  //para impedir que puedan seleccionarse 3 cartas

        if(gameBoard[cardBack2] == gameBoard[cardBack1]){

            messageView(couple[randomNumber(0,2)]);

            hit++;

        }else{

            messageView(uncouple[randomNumber(0,2)]);

            var t = setTimeout(function(){

                deselect(card_div[cardBack1]);
                deselect(card_div[cardBack2]);
                
            }, 350);

        }
 
        var t = setTimeout(function(){

            cardBack1 = null; //para permitir que se pueda volver a seleccionar una primera carta
            addEvent(); //volvemos a añadir los eventos antes quitados
            contador(); //actualizamos la puntuación

        }, 351); // para que se ejecute después de terminar de hacer la comparación
        
    }
  
}

/**
 * Función para generar un tablero aleatorio.
 */
function board(){

    var count = [0,0,0,0,0,0];
    var number = 0;

    for(var i=0; i<numCards; i++){

        number = randomNumber(card.length,0);

        if(count[number] < 2) {
            gameBoard.push(card[number]);
            count[number]++;

        }else{
            i--;
        }
    }
    
}
 
/**
 * Función para añadir los enventos a las cartas
 */
function addEvent(){

    for(var i=0;i< card_div.length; i++){
           
        card_div[i].addEventListener('click' ,toTurn);  //event onclic
        card_div[i].dataset.value = i;
        
    }
  
}

/**
 * Función para eliminar los eventos de las cartas
 */
function deaddEvent(){

    for(var i=0;i< card_div.length; i++){
           
        card_div[i].removeEventListener('click' ,toTurn); //quitar evento onclic
        card_div[i].dataset.value = i;
        
    }

}

/**
 * Función para devuelver un número aleatorio entre dos números dados
 * @param {*} max número máximo
 * @param {*} min número mínimo
 * @returns número aleatorio
 */
function randomNumber(max, min){

    return Math.floor(Math.random() * (max - min) + min);
}

/**
 * Función para voltear la carta impidendo que pueda volver a ser seleccionada
 * @param {*} card carta a seleccionar
 */
function selectCard(card){
    card.classList.add("card-select");
    card.removeEventListener('click',toTurn);
    card.innerHTML= "<img src=\"" + gameBoard[card.dataset.value][0] + "\" alt=\"" + gameBoard[card.dataset.value][1] + "\">";
}

/**
 * Función para ocultar la carta permitiendo que vuelva a ser seleccionada
 * @param {*} card carta a deseleccionar
 */
function deselect(card){
    card.classList.remove("card-select");
    card.addEventListener('click' ,toTurn); 
    card.innerHTML = "";
}

/**
 * Función para acualizar los puntos y oportunidades.
 */
function contador(){
    shots++;
    opportunities_div.innerHTML= "<h3>Jugadas: " + shots + "/" + opportunities + "</h3>";
    hit_div.innerHTML= "<h3>Aciertos: " + hit + "</h3>" ;

    if(opportunities - shots <  card.length - hit){
        gameOver();
    }
    if(hit == card.length){
        gameWin();

    }

}

/**
 * Función para avisar el juego perdido.
 */
function gameOver(){

    deaddEvent();
    console.log("ha perdido.");
    result_div.innerHTML = "OOOOH ¡QUÉ PENA! ¡VUELVE A PROBAR!.";
    
}

/**
 * Función para avisar el juego ganado.
 */
function gameWin(){
    result_div.innerHTML = "¡FELICIADES!<br/> SOLO HAS NECESITADO " + shots + "TIROS.";
}

/**
 * Función para recargar la web, reiniciando el juego.
 */
function reload(){
    location.reload();
}

/**
 * Función para visualizar los mensajes
 * @param {*} msg mensaje a visualizar
 */
function messageView(msg){
    result_div.innerHTML = msg;
}
