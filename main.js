const prompt = require("prompt-sync")({ sigint: true });
const clear = require("clear-screen");

//create global variables
const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";
const row = 10;
const col = 10;

//create Field Class for generating field
class Field {
  field = [];

  constructor() {
    //setting starting location of player
    this.locationX = 0;
    this.locationY = 0;

    for (let a = 0; a < col; a++) {
      this.field[a] = [];
    }

    this.generateField(row, col, 0.2);
  }

  generateField(height, width, percentage = 0.1) {
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const prob = Math.random();
        this.field[y][x] = fieldCharacter;
      }
    }
    // Set the "hat" location

    //Set Character position as [0][0]
  }

  runGame() {
    //Implement your codes
    this.print();
    this.askQuestion();
  }

  print() {
    clear();
    const displayString = this.field
      .map((row) => {
        return row.join("");
      })
      .join("\n");
    console.log(displayString);
  }

  askQuestion() {
    const answer = prompt(`Which way? `).toUpperCase();
    //implement your codes
  }
} // End of Class

const myfield = new Field();
myfield.runGame();
