/* Game design step by step
1. Design the field generation with holes
  a. if prob > percentage, then assign fieldCharacter. if prob < percentage, then assign hole to fieldArray
2. randomize hat location within the 10 x 10 and access the field array to reassign symbol to "^"
3. set character position to [0][0] and access field array to reassign symbol to "*" --> may consider randomize character position once MVP is done
4. tracking character movement:
  a. assign input values of up down left right with + 1 or - 1
  b. update the locationX and locationY values per user input
  c. conduct input validation with error msg shown if input is not part of the validation array.
  d. based on the location X and Y, access the field array to see what is the value
    i) if value is ^, show win msg
    ii) if value is 0, show lose msg
    iii) if location X and Y value is negative value or more than 9, show out of bound msg and end game.
    iv) if value is ░ then update value to be *

5. may want to offer option to reset game and generate new field --> after mvp is done
6. may ask for user name and address user by name and give explanation to the game --> after mvp is done
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
const up = "U";
const down = "D";
const left = "L";
const right = "R";
const quit = "QUIT";
const restart = "RESTART";
let userName = "";

//create Field Class for generating field
class Field {
  field = [];

  constructor() {
    //setting starting location of player
    
    for (let a = 0; a < col; a++) {
      this.field[a] = [];
    }
    
    this.generateField(row, col, 0.2);
  }
  
  generateField(height, width, percentage = 0.1) {
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const prob = Math.random();
        //using probability to determine if hole should be generated. if random prob exceed the percentage value set, assign a hole
        if (prob > percentage) {
          this.field[y][x] = fieldCharacter;
        } else {
          this.field[y][x] = hole;
        }
      }
    }
    // Set the "hat" location
    const hatLocationX = Math.floor(Math.random() * col);
    const hatLocationY = Math.floor(Math.random() * row);
    // while (hatLocationX == 0 && hatLocationY == 0) {
      //   hatLocationX = Math.floor(Math.random() * col);
      //   hatLocationY = Math.floor(Math.random() * row);
      // } // comment out this as character will not be starting at [0][0] all the time
      this.field[hatLocationY][hatLocationX] = hat;
      
      //Set Character position by randomize character location X and Y but to check if it is hat or hole first. use while loop
      this.locationX = Math.floor(Math.random() * col);
      this.locationY = Math.floor(Math.random() * row);
    while (
      this.field[this.locationY][this.locationX] == hole ||
      this.field[this.locationY][this.locationX] == hat
    ) {
      this.locationX = Math.floor(Math.random() * col);
      this.locationY = Math.floor(Math.random() * row);
    }

    this.field[this.locationY][this.locationX] = pathCharacter;
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
    const answer = prompt(`Which way should Pinky go? `).toUpperCase();
    //implement your codes
    // call various methods as the game progress
    this.validateInput(answer);
    this.updatePlayerCoordinates(answer);
    this.movePlayer();
    this.runGame();
  }

  //method to validate input
  validateInput(answer) {
    const validInput = ["U", "D", "L", "R", "QUIT", "RESTART"];
    if (!validInput.includes(answer)) {
      this.print();
      console.log(`Please kindly input U, D, L, R, Quit or Restart.`);
      this.askQuestion();
      return;
    }
  }

  //method to take input and translate it into player movement and update player coordinates
  updatePlayerCoordinates(answer) {
    switch (answer) {
      case up:
        this.locationY -= 1;
        break;
      case down:
        this.locationY += 1;
        break;
      case left:
        this.locationX -= 1;
        break;
      case right:
        this.locationX += 1;
        break;
      case quit:
        this.quitGame();
      case restart:
        this.restartGame();
    }
  }

  //method to restart game
  restartGame() {
    this.generateField(row, col, 0.2);
    this.runGame();
    return;
  }

  //method to exit game
  quitGame() {
    console.log("Thank you, have a nice day. Good bye");
    return process.exit();
  }

  //method for Game Over
  gameOver() {
    const quitOrRestart = prompt(
      `Would you like to restart or quit? `
    ).toUpperCase();
    const validInput = ["QUIT", "RESTART"];
    //input validation
    if (!validInput.includes(quitOrRestart)) {
      this.print();
      console.log(`Game has ended, please kindly input Quit or Restart.`);
      this.gameOver();
    } else if (quitOrRestart == quit) {
      // player to choose to restart or exit game
      this.quitGame();
    } else if (quitOrRestart == restart) {
      this.restartGame();
    }
  }

  //method to access field array and determine if player can occupy field new position or end game or win the game
  movePlayer() {
    //check if player is out of bound by checking if location value is below 0 or more than field width or length
    if (
      this.locationY < 0 ||
      this.locationX < 0 ||
      this.locationY > (row - 1) ||
      this.locationX > (col - 1)
    ) {
      console.log(
        `Oh dear ${userName}, why did you leave the field? Out of bounds - Game End!`
      );
      this.gameOver();
    } else if (
      //check if path is clear to move player along
      this.field[this.locationY][this.locationX] == fieldCharacter ||
      this.field[this.locationY][this.locationX] == pathCharacter
    ) {
      this.field[this.locationY][this.locationX] = pathCharacter;
    } else if (this.field[this.locationY][this.locationX] == hole) { //check if the next step is a hole
      console.log(`Oh no, ${userName}! Pinky fell into the hole. Game Over.`);
      this.gameOver();
    } else if (this.field[this.locationY][this.locationX] == hat) { //check if the next step is a hat
      console.log(
        `Hooray! Pink found the hat. That must be hard work. Bravo ${userName}!`
      );
      this.gameOver();
    }
  }

  //method to obtain user name
  start() {
    userName = prompt(`Hi, how would you like me to call you? `);
    console.log(``);
    // game explanation
    console.log(
      `Very well. ${userName}, Pinky the mouse has lost her hat in the corn field for the umpteenth timeand we need your help.`
    );
    console.log(
      `Due to the bad weather these days, the field is filled with waterholes ->[0].`
    );
    console.log(
      `Pinky is not a very good swimmer, so she has to avoid the holes.`
    );
    console.log(
      `To find the hat -> [^], you will need to press the buttons: UP (U key), DOWN (D key), LEFT (L key), RIGHT (R key) to guide Pinky.`
    );
    console.log(
      `You may type 'Quit' or 'Restart' to quit or restart the game anytime.`
    );
    console.log(`So... ${userName}, Good luck!`);
    const continueGame = prompt(`Enter any key to continue...`);
    this.runGame();
  }
} // End of Class

const myfield = new Field();
myfield.start();
