class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // load audio
        this.load.image('starfield', './assets/starfield1.png');
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
    }

    create() {
        this.starfield = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'starfield').setOrigin(0, 0);
        // menu text configuration
        let menuConfig = {
            fontFamily: 'Impact',
            fontSize: '18px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        //menu text
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'WHALE PATROL', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 'F to FIRE, USE UP/DOWN/LEFT/RIGHT to move ROCKET', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press <- for EASY or -> for HARD', menuConfig).setOrigin(0.5);

        //keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          // easy
          game.settings = {
            spaceshipSpeed: 3,
            gameTimer: 60000    
          }

          this.sound.play('sfx_select');
          this.scene.start("playScene");    
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
          // hard
          game.settings = {
            spaceshipSpeed: 4,
            gameTimer: 45000    
          }

          this.sound.play('sfx_select');
          this.scene.start("playScene");    
        }
    }
}


// init () prepares any data for the scene
// preload() prepares any assets we'll need for the scene
// create() adds objects to the scene
// init preload and create only runs once.
// update() is a loop that runs continuously and allows us to update game objects