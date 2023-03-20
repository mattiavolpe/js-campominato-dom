/*
Consegna
Copiamo la griglia fatta ieri nella nuova repo e aggiungiamo la logica del gioco

Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
nella stessa cella può essere posizionata al massimo una bomba, perciò nell’array delle bombe non potranno esserci due numeri uguali.
In seguito l'utente clicca su una cella:
se il numero è presente nella lista dei numeri generati
abbiamo calpestato una bomba
la cella si colora di rosso e la partita termina.
Altrimenti
la cella cliccata si colora di azzurro
l'utente può continuare a cliccare sulle altre celle.
La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile di numeri consentiti (ovvero quando ha rivelato tutte le celle che non sono bombe).
Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.

BONUS:
Aggiungere una select accanto al bottone di generazione, che fornisca una scelta tra tre diversi livelli di difficoltà:
difficoltà 1 ⇒ 100 caselle, con un numero compreso tra 1 e 100, divise in 10 caselle per 10 righe;
difficoltà 2 ⇒ 81 caselle, con un numero compreso tra 1 e 81, divise in 9 caselle per 9 righe;
difficoltà 3 ⇒ 49 caselle, con un numero compreso tra 1 e 49, divise in 7 caselle per 7 righe;
Consigli del giorno: :baby-yoda:
Scriviamo prima cosa vogliamo fare passo passo in italiano, dividiamo il lavoro in micro problemi.
Pensiamo prima al codice senza fare funzioni, poi facendo refactoring implementiamo la funzione corrispondente.
Proviamo sempre prima con dei console.log() per capire se stiamo ricevendo i dati giusti.
Eventuali validazioni e controlli possiamo farli anche in un secondo momento.
*/

// SELECT THE CONTAINER FROM THE DOM
const containerElement = document.querySelector(".container");

// SELECT THE LEVEL SELECTOR FROM THE DOM
const levelSelectorElement = document.querySelector("#level");

// SELECT THE PLAY BUTTON FROM THE DOM
const playButton = document.querySelector("#game_options > button");

// STARTS A NEW GAME WHEN A CLICK ON THE PLAY BUTTON OCCURS
playButton.addEventListener("click", function() {

  // GETS THE NUMBER OF CELLS
  const cellsNumber = setCellsNumber(levelSelectorElement);

  // CREATES THE GRID
  createNewGrid(cellsNumber, containerElement);

  // CREATES THE BOMBS
  const bombs = createBombs(cellsNumber);
  
  // CREATE A VARIABLE TO TRACK THE SCORE
  let score = 0;

  // GETS THE INSERTED CELLS
  const insertedCells = document.querySelectorAll(".cell");

  // LISTENS FOR CLICK ON CELLS TO CHANGE THEIR BACKGROUND COLOR
  listenForSelection(insertedCells, bombs, score);
});

// <---------- FUNCTIONS ---------->

// FUNCTION TO EXTRACT THE NUMBER OF CELLS NEEDED
function setCellsNumber(selectorElement) {
  let cells = 49;
  switch (selectorElement.value) {
    case "medium":
      cells = 81;
      break;
    case "easy":
      cells = 100;
      break;
    default:
      cells = 49;
  }
  return cells;
}

// FUNCTION TO EMPTY THE CONTAINER AND CREATE THE GRID OF CELLS
function createNewGrid(totalCells, container) {
  
  // EMPTY THE CONTAINER
  container.innerHTML = "";

  // CALCULATE HOW MANY CELLS PER ROW
  const cellsPerRow = Math.sqrt(totalCells);

  // CREATES CELLS, ADD THE CELL CLASS, SET THE DIMENSION, INSERT THE INDEX NUMBER AND ADDS TO THE DOM
  for (let i = 1; i <= totalCells; i++) {
    const cellElement = document.createElement("div");
    cellElement.classList.add("cell");

    // SETS THE DIMENSIONS DINAMICALLY TO MAKE THE GRID RESPONSIVE ALSO
    cellElement.style.height = `min(calc(100% / ${cellsPerRow}), (96vw / ${cellsPerRow}))`;
    cellElement.innerHTML = i;
    containerElement.insertAdjacentElement("beforeend", cellElement);
  }
}

// FUNCTION TO CREATE THE BOMBS
function createBombs(totalCells) {
  // CREATE AN EMPTY ARRAY TO CONTAIN THE 16 BOMBS
  const bombsArray = [];

  // GENERATE A RANDOM NUMBER BETWEEN 1 AND THE NUMBER OF CELLS IN THE GRID, 16 TIMES
  for (let i = 0; i < 16; i++) {
    let bomb = Math.floor(Math.random() * totalCells) + 1;

    // CONTROLS IF THE GENERATED NUMBER IS ALREADY IN THE BOMBS ARRAY
    while (bombsArray.includes(bomb)) {
      bomb = Math.floor(Math.random() * totalCells) + 1;
    }
    bombsArray.push(bomb);
  }

  // SORT THE BOMBS IN THE ARRAY
  bombsArray.sort((a, b) => a - b);
  return bombsArray;
}

// FUNCTION TO CHANGE THE BACKGROUND OF A CELL WHEN CLICKED
function listenForSelection(cellsInTheGrid, bombsArray, score) {

  // ADDS A "CLICK" EVENT LISTENER TO EVERY CELL IN THE GRID
  for (let i = 0; i < cellsInTheGrid.length; i++) {
    const currentCell = cellsInTheGrid[i];
    currentCell.addEventListener("click", function() {

      // IF CELL IS ALREADY SELECTED, NOTHING HAPPENS AND SCORE DOESN'T INCREASE, ELSE IF IT'S A BOMB YOU LOOSE, ELSE ADD THE SELECTED CLASS AND INCREASE THE SCORE
      if (this.className.includes("selected")) {
        return;
      } else if (bombsArray.includes(Number(this.innerText))) {
        alert(`HAI PERSO. IL TUO PUNTEGGIO E' ${score}`);
        location.reload();
      } else {
        this.classList.add("selected");
        console.log(Number(this.innerText));
        score++;
      }
    });
  }
}