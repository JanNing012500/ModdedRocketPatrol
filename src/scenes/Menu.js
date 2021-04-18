class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // load audio
        this.load.image('starfield', './assets/starfield1.png');
        this.load.audio('sfx_select', './assets/blip_select13.wav');
        this.load.audio('sfx_explosion', './assets/explosion39.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot1.wav');
        this.load.audio('sfx_music', './assets/Music.wav');

    }

    create() {
      
        
        this.starfield = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'starfield').setOrigin(0, 0);
        // menu text configuration
        let menuConfig = {
            fontFamily: 'Impact',
            fontSize: '18px',
            backgroundColor: '#185fd8',
            color: '#18c0d8',
            align: 'right',
            padding: {
                top: 3,
                bottom: 3,
            },
            fixedWidth: 0
        }
        //title
         let titleConfig = {
          fontFamily: 'Impact',
          fontSize: '30px',
          backgroundColor: '#185fd8',
          color: '#18c0d8',
          align: 'right',
          padding: {
              top: 3,
              bottom: 3,
          },
          fixedWidth: 0
      }
        //menu text
        this.add.text(game.config.width/2, game.config.height/4 - borderUISize - borderPadding, 'WHALE PATROL', titleConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 'F to FIRE, USE UP/DOWN/LEFT/RIGHT to move ROCKET', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#18c0d8';
        menuConfig.color = '#185fd8';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press <- for EASY or -> for HARD', menuConfig).setOrigin(0.5);

        this.showhighscore = this.add.text(game.config.width/2, game.config.height/5 + borderPadding*3, "HIGHSCORE: " + highscore, menuConfig).setOrigin(0.5);


        //keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        this.add.rectangle(0, 0, game.config.width, borderUISize, 0x41bbf3).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0x41bbf3).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0x41bbf3).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0x41bbf3).setOrigin(0, 0);
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