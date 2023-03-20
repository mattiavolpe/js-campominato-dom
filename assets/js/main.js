/*
Consegna
L'utente clicca su un bottone che genererà una griglia di gioco quadrata.
Ogni cella ha un numero progressivo, da 1 a 100.
Ci saranno quindi 10 caselle per ognuna delle 10 righe.
Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro ed emetto un messaggio in console con il numero della cella cliccata.

Bonus
Aggiungere una select accanto al bottone di generazione, che fornisca una scelta tra tre diversi livelli di difficoltà:
con difficoltà 1 => 100 caselle, con un numero compreso tra 1 e 100, divise in 10 caselle per 10 righe;
con difficoltà 2 => 81 caselle, con un numero compreso tra 1 e 81, divise in 9 caselle per 9 righe;
con difficoltà 3 => 49 caselle, con un numero compreso tra 1 e 49, divise in 7 caselle per 7 righe;
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

  // GETS THE INSERTED CELLS
  const insertedCells = document.querySelectorAll(".cell");

  // LISTENS FOR CLICK ON CELLS TO CHANGE THEIR BACKGROUND COLOR
  listenForSelection(insertedCells);
});

// <---------- FUNCTIONS ---------->

// FUNCTION TO EXTRACT THE NUMBER OF CELLS NEEDED
function setCellsNumber(selectorElement) {
  let cells = 100;
  switch (selectorElement.value) {
    case "medium":
      cells = 81;
      break;
    case "easy":
      cells = 49;
      break;
    default:
      cells = 100;
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

// FUNCTION TO CHANGE THE BACKGROUND OF A CELL WHEN CLICKED
function listenForSelection(cellsInTheGrid) {

  // ADDS A "CLICK" EVENT LISTENER TO EVERY CELL IN THE GRID
  for (let i = 0; i < cellsInTheGrid.length; i++) {
    const currentCell = cellsInTheGrid[i];
    currentCell.addEventListener("click", function() {
      this.classList.add("selected");
      console.log(Number(this.innerText));
    });
  }
}