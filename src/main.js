//Create a new scrolling tile sprite for the background (5)  //ocean
//Display the time remaining (in seconds) on the screen (10) //middle of screen
//Allow the player to control the Rocket after it's fired (5) //up down left right
//Create a new title screen (e.g., new artwork, typography, layout) (10) //ocean/blue theme menu
//Track a high score that persists across scenes and display it in the UI (5)  //maintains highscore after each round and to the menu
//Add your own (copyright-free) background music to the Play scene (5) //background music plays when game starts
//Redesign the game's artwork, UI, and sound to change its theme/aesthetic (to something other than sci-fi) (60)  //Spaceships -> whales, rocket->missile, artwork->ocean,UI->highscore+blue aesthetics, sounds ->all changed
//Create 4 new explosion SFX and randomize which one plays on impact (10) //5 different sfx explosions (1 is the original)



//Jan Ning 
//Whale Patrol
//4-16-21

//game configuration
let config = {
    type: Phaser.CANVAS,
    width: 640,
    height : 480,
    scene: [Menu, Play ]
}

let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
let starSpeed = 4;

// reserve keyboard bindings
let keyF, keyR, keyLEFT, keyRIGHT, keyUP, keyDOWN;

let highscore =0;