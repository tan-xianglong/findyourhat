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
const up = 'U';
const down = 'D';
const left = 'L';
const right = 'R';
const quit = 'QUIT';
const restart = 'RESTART';

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
        //using probability to determine if hole should be generated. if random prob exceed the percentage value set, assign a hole
        if (prob > percentage) {
          this.field[y][x] = fieldCharacter;
        } else {
          this.field[y][x] = hole;
        }
      }
    }
    // Set the "hat" location and hat must not be at [0] [0] due to starting character position. use while loop
    const hatLocationX = Math.floor(Math.random() * col);
    const hatLocationY = Math.floor(Math.random() * row);
    while (hatLocationX == 0 && hatLocationY == 0) {
      hatLocationX = Math.floor(Math.random() * col);
      hatLocationY = Math.floor(Math.random() * row);
    }
    this.field[hatLocationY][hatLocationX] = hat;

    //Set Character position as [0][0] --> may randomize character location but to check if it is hat or hole first. to do so after MVP is done.
    this.field[0][0] = pathCharacter;
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
    this.validateInput(answer);
    this.updatePlayerCoordinates(answer);
    this.movePlayer();
    this.runGame();
  }

  //method to validate input
  validateInput(answer){
    const validInput = ['U', 'D', 'L', 'R', 'QUIT', 'RESTART'];
    if (!validInput.includes(answer)){
      this.print();
      console.log(`Please kindly input U, D, L, R, Quit or Restart.`)
      this.askQuestion();
      return;
    }
  }

  //method to take input and translate it into player movement and update player coordinates
  updatePlayerCoordinates(answer){
    switch(answer){
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
  restartGame(){
    this.generateField(row, col, 0.2);
    this.locationX = 0;
    this.locationY = 0;
    this.runGame();
    return;
  }

  //method to exit game
  quitGame(){
    console.log("Thank you, have a nice day. Good bye");
    return process.exit();
  }

  //method for Game Over
  gameOver(){
    const quitOrRestart = prompt(`Would you like to restart or quit?`).toUpperCase();
    const validInput = ["QUIT", "RESTART"];
    //input validation
    if(!validInput.includes(quitOrRestart)){
      this.print();
      console.log(`Game has ended, please kindly input Quit or Restart.`);
      this.gameOver();
    } else if (quitOrRestart == quit){
      // player to choose to restart or exit game
      this.quitGame();
    } else if (quitOrRestart == restart) {
      this.restartGame();
    }
  }

  //method to access field array and determine if player can occupy field new position or end game or win the game
  movePlayer() {
    if (
      this.field[this.locationY][this.locationX] == fieldCharacter ||
      this.field[this.locationY][this.locationX] == pathCharacter
    ) {
      this.field[this.locationY][this.locationX] = pathCharacter;
    } else if (this.field[this.locationY][this.locationX] == hole) {
      console.log("Oh no! You have fallen into the hole. Game Over.")
      this.gameOver();
    }
  }

} // End of Class

const myfield = new Field();
myfield.runGame();
