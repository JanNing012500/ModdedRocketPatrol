//Jan Ning 
//Whale Patrol
//4-16-21
class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('rocket', 'assets/ree.png');
        this.load.image('spaceship', 'assets/2blue.png');
        this.load.image('starfield', './assets/starfield1.png');
        this.load.audio('sfx_music','./assets/Music.wav');
        //load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png',{
            frameWidth: 64,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 9
        });
    }

    create() {
        this.sound.play('sfx_music');
        // place starfield
        this.starfield = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'starfield').setOrigin(0, 0);

        // green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x4051D6).setOrigin(0, 0);
        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0x41bbf3).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0x41bbf3).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0x41bbf3).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0x41bbf3).setOrigin(0, 0);

        // add rocket (player 1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);

        //add spaceship x3
        this.ship01 = new Spaceship(this, game.config.width + borderUISize* 6 ,borderUISize*4, 'spaceship', 0 ,30).setOrigin(0,0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize* 3 ,borderUISize*5, 'spaceship', 0 ,20).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize* 6 + borderPadding*4, 'spaceship', 0 ,10).setOrigin(0,0);


        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

        //animation config
        this.anims.create({
            key: 'explode', 
            frames: this.anims.generateFrameNumbers('explosion', {
                start: 0,
                end: 9,
                first: 0
            }),
            frameRate: 30
        });

        //initialize score
        this.p1Score=0;
        
        // display score
        let scoreConfig = {
        fontFamily: 'Impact', 
        fontSize: '25px', 
        backgroundColor: '#41e4f3', 
        color: '#843605', 
        align: 'right', 
        padding: {
        top: 5,
        bottom: 5,
        },
        fixedWidth: 100
        }
        this.scoreshow = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);


        


        //game over flag
        this.gameOver = false;



        //play clock
        scoreConfig.fixedWidth =0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or <- for Menu', 
        scoreConfig).setOrigin(0.5);

        this.gameOver = true;
       
       //HIGHSCORE
        this.HighSc = Math.max(this.p1Score,0);
        if(highscore <= this.HighSc)
            highscore = this.HighSc;
        
        this.showhighscore.text = "HIGHSCORE: " + highscore;

        
    
    },null, this);

   


        //high score
        this.showhighscore = this.add.text(470,60,"HIGHSCORE: ",+ highscore, scoreConfig).setOrigin(0);

        
        
        //show timer
        scoreConfig.color = '#056684';
        this.timer = this.add.text(game.config.width * .5, 90, this.clock.getElapsedSeconds(), scoreConfig).setOrigin(0);


    }

    update() {
    //checking key input for restart
        
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)){
            this.scene.restart();
        }

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)){
            this.scene.start("menuScene");
        } //check123

        this.starfield.tilePositionX -= starSpeed;


        if(!this.gameOver) {

        
        // update rocket
        this.p1Rocket.update();

        //update spaceships x3
        this.ship01.update();
        this.ship02.update();
        this.ship03.update();
        }

        //check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
            
        }
        if(this.checkCollision(this.p1Rocket, this.ship02)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
            
        }
        if(this.checkCollision(this.p1Rocket, this.ship01)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
            
        }
         
        //updating timer
        
        this.timer.text =(game.settings.gameTimer / 1000) - Math.round(this.clock.getElapsedSeconds());

    
        

    }

    checkCollision(rocket, ship) {
        // simple AABB checking
        if( rocket.x < ship.x + ship.width &&
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship.y) {
                return true;
            } else {
                return false;
            }
    }

    shipExplode(ship) {
        //temp hide ship
        ship.alpha = 0;
        //create explosion at ships position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0,0);
        boom.anims.play('explode');
        boom.on('animationcomplete', () => {
            ship.reset();
            ship.alpha =1;
            boom.destroy();
        });
        
        
        //NEW NEW NEW add score to timer
        //this.gameTimer += 100000;
        
        //score add and repaint
        this.p1Score += ship.points;
        this.scoreshow.text = this.p1Score;
        
    

        //play sound
        this.sound.play(Phaser.Math.RND.pick(['sfx_explosion','sfx_explosion1', 'sfx_explosion2', 'sfx_explosion3', 'sfx_explosion4']));  

        
        
    }

   

}