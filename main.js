let game;
let gameOver = false;
let cursors;

window.onload = function () {
    const gameConfig = {
        type: Phaser.AUTO,
        width: 1980,
        height: 1080,
        backgroundColor: 0xffffff,
        physics: {
            default: "arcade",
            arcade: {
                gravity: { y: 300 },
                debug: false
            },
        },
        scene: playGame
    }

    game = new Phaser.Game(gameConfig);
    window.focus();
    resizeGame();
    window.addEventListener("resize", resizeGame);

}

class playGame extends Phaser.Scene {
    constructor() {
        super("PlayGame");
    }

    preload() {

        this.load.image("background", "./assets/layers/2.png");
        this.load.image("foreground1", "./assets/layers/3.png");
        this.load.image("foreground2", "./assets/layers/4.png");
        this.load.image("foreground3", "./assets/layers/5.png");
        this.load.image("foreground4", "./assets/layers/6.png");
        this.load.image("foreground5", "./assets/layers/7.png");
        this.load.image("foreground6", "./assets/layers/8.png");

        this.load.spritesheet("blue_witch_run", "./assets/characters/B_witch_run.png", { frameWidth: 32, frameHeight: 48 });
        this.load.spritesheet("blue_witch_idle", "./assets/characters/B_witch_idle.png", { frameWidth: 32, frameHeight: 48 });
        this.load.spritesheet("blue_witch_charge", "./assets/characters/B_witch_charge.png", { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet("blue_witch_attack", "./assets/characters/B_witch_attack.png", { frameWidth: 104, frameHeight: 46 });

        this.load.audio("music", "./assets/music/theVileGrove.wav")

        // Touch control memory
        this.is_holding = {
            left: false,
            right: false,
            direction: false
        }
    }

    create() {
        this.physics.world.setBounds(0, 0, undefined, 1000, true, false, false, true);

        // Add music to scene
        const music = this.sound.add("music", { loop: true });
        // music.play();

        // Create the parallax background
        this.bg_1 = this.add.tileSprite(0, 0, game.config.width, game.config.height, "background");
        this.bg_1.setOrigin(0, 0);
        this.bg_1.setScrollFactor(0);

        this.bg_2 = this.add.tileSprite(0, 0, game.config.width, game.config.height, "foreground1");
        this.bg_2.setOrigin(0, 0);
        this.bg_2.setScrollFactor(0);

        this.bg_3 = this.add.tileSprite(0, 0, game.config.width, game.config.height, "foreground2");
        this.bg_3.setOrigin(0, 0);
        this.bg_3.setScrollFactor(0);

        this.bg_4 = this.add.tileSprite(0, 0, game.config.width, game.config.height, "foreground3");
        this.bg_4.setOrigin(0, 0);
        this.bg_4.setScrollFactor(0);

        this.bg_5 = this.add.tileSprite(0, 0, game.config.width, game.config.height, "foreground4");
        this.bg_5.setOrigin(0, 0);
        this.bg_5.setScrollFactor(0);

        this.bg_6 = this.add.tileSprite(0, 0, game.config.width, game.config.height, "foreground5");
        this.bg_6.setOrigin(0, 0);
        this.bg_6.setScrollFactor(0);

        this.bg_7 = this.add.tileSprite(0, 0, game.config.width, game.config.height, "foreground6");
        this.bg_7.setOrigin(0, 0);
        this.bg_7.setScrollFactor(0);

        // this.player and its settings
        this.player = this.physics.add.sprite(300, 900, "blue_witch_run");
        console.log(this.player);
        // this.player physics properties
        this.player.setBounce(0.2);
        this.player.setScale(3);
        this.player.setCollideWorldBounds(true);
        this.player.body.setGravityY(600);



        // creates animations for this.player character
        this.anims.create({
            key: "run",
            frames: this.anims.generateFrameNumbers("blue_witch_run",
                { start: 0, end: 7 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: "idle",
            frames: this.anims.generateFrameNumbers("blue_witch_idle",
                { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: "charge",
            frames: this.anims.generateFrameNumbers("blue_witch_charge",
                { start: 0, end: 4 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: "attack",
            frames: this.anims.generateFrameNumbers("blue_witch_attack",
                { start: 0, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        // Set main camera to follow character
        this.myCam = this.cameras.main;
        this.myCam.setBounds(0, 0, undefined, game.config.height);
        this.myCam.startFollow(this.player, true, 0.05, 0.05);
        // Input Events 
        cursors = this.input.keyboard.createCursorKeys();

    }

    holdLeft() {
        this.is_holding.left = true;
        this.is_holding.direction = "left";
    }

    holdRight() {
        this.is_holding.right = true;
        this.is_holding.direction = "right";
    }

    releaseLeft() {
        this.is_holding.left = false;

        if (this.is_holding.right) {
            this.is_holding.direction = "right";
        }
        else {
            this.is_holding.direction = false;
        }
    }

    releaseRight() {
        this.is_holding.right = false;

        if (this.is_holding.left) {
            this.is_holding.direction = "left";
        }
        else {
            this.is_holding.direction = false;
        }
    }

    update() {
        if (gameOver) {
            return;
        }

        // // Visual touch zone
        // let debug = this.add.graphics({ x: 0, y: 0 });
        // debug.fillStyle("0x000000", 0.01);
        // debug.fillRect(0, 0, 0.45 * game.config.width, game.config.height);
        // debug.setScrollFactor(0);
        // debug.setDepth(2);
        // // Left touch zone
        // this.zone_left = this.add.zone(0, 0, 0.45 * game.config.width, game.config.height);
        // this.zone_left.setOrigin(0, 0);
        // this.zone_left.setDepth(2);
        // this.zone_left.setScrollFactor(0);
        // // Activate left touch zone
        // this.zone_left.setInteractive();
        // this.zone_left.on("pointerdown", holdLeft());
        // this.zone_left.on("pointerup", this.releaseLeft, this);
        // this.zone_left.on("pointerout", this.releaseLeft, this);
        // // Right touch zone 
        // this.zone_right = this.add.zone(game.config.width, 0, 0.45 * game.config.width, game.config.height);
        // this.zone_right.setOrigin(1, 0);
        // this.zone_right.setDepth(2000);
        // this.zone_right.setScrollFactor(0);
        // // Activate right touch zone
        // this.zone_right.setInteractive();
        // this.zone_right.on("pointerdown", this.holdRight, this);
        // this.zone_right.on("pointerup", this.releaseRight, this);
        // this.zone_right.on("pointerout", this.releaseRight, this);

        // Set up controls for game
        if (cursors.left.isDown) {
            this.player.setVelocityX(-260);
            this.player.flipX = true;
            this.player.anims.play("run", true);
        }
        else if (cursors.right.isDown) {
            this.player.setVelocityX(260);
            this.player.flipX = false;
            this.player.anims.play("run", true);
        }
        else if (cursors.down.isDown) {
            this.player.anims.play("charge", true);
        }
        else {
            this.player.setVelocityX(0);
            this.player.anims.play("idle", true);
        }

        if (cursors.up.isDown && this.player.body.bottom === this.physics.world.bounds.height) {
            this.player.setVelocityY(-600);
            this.player.anims.play("run", true);
        }

        this.bg_2.tilePositionX = this.myCam.scrollX * .1;
        this.bg_3.tilePositionX = this.myCam.scrollX * .2;
        this.bg_4.tilePositionX = this.myCam.scrollX * .4;
        this.bg_5.tilePositionX = this.myCam.scrollX * .5;
        this.bg_6.tilePositionX = this.myCam.scrollX;
        this.bg_7.tilePositionX = this.myCam.scrollX;
    }
}

function resizeGame() {
    const canvas = document.querySelector("canvas");
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const windowRatio = windowWidth / windowHeight;
    const gameRatio = game.config.width / game.config.height;
    if (windowRatio < gameRatio) {
        canvas.style.width = windowWidth + "px";
        canvas.style.height = (windowWidth / gameRatio) + "px";
    }
    else {
        canvas.style.width = (windowHeight * gameRatio) + "px";
        canvas.style.height = windowHeight + "px";
    }
}