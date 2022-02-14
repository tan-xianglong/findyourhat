/* Game design step by step
1. Design the field generation with holes
  a. if prob > percentage, then assign fieldCharacter. if prob < percentage, then assign hole to fieldArray
2. randomize hat location within the 10 x 10 and access the field array to reassign symbol to "^"
3. set character position to [0][0] and access field array to reassign symbol to "*" --> may consider randomize character position once MVP is done
4. tracking character movement:
  a. assign input values of up down left right with + or - 1
  b. update the locationX and locationY values per user input
  c. conduct input validation with error msg shown if input is not part of the validation array.
  d. based on the location X and Y, access the field array to see what is the value
    i) if value is ^, show win msg
    ii) if value is 0, show lose msg
    iii) if location X and Y value is negative value or more than 9, show lose msg and end game.
    iv) if value is ░ then update value to be *

5. may want to offer option to reset game and generate new field --> after mvp is done
*/

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
        if(prob > percentage) {
          this.field[y][x] = fieldCharacter;
        }
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
