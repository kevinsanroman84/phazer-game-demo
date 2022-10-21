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

        this.load.image("ground", "./assets/layers/platform.png");
        this.load.image("background", "./assets/layers/2.png");
        this.load.image("foreground1", "./assets/layers/3.png");
        this.load.image("foreground2", "./assets/layers/4.png");
        this.load.image("foreground3", "./assets/layers/5.png");
        this.load.image("foreground4", "./assets/layers/6.png");
        this.load.image("foreground5", "./assets/layers/7.png");
        this.load.image("foreground6", "./assets/layers/8.png");

        this.load.spritesheet("blue_witch_run", "./assets/characters/B_witch_run.png", { frameWidth: 32, frameHeight: 48 });
        this.load.spritesheet("blue_witch_idle", "./assets/characters/B_witch_idle.png", { frameWidth: 32, frameHeight: 48 });

        this.load.audio("music", "./assets/music/theVileGrove.wav")
    }

    create() {
        // Creates ground for game
        this.ground = this.physics.add.staticGroup();
        this.ground.create(990, 1020, "ground");

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
        this.player.setCollideWorldBounds(false);

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
        })

        this.player.body.setGravityY(300);

        // Set main camera to follow character
        this.setBounds
        this.myCam = this.cameras.main;
        this.myCam.setBounds(0, 0, game.config.width * 9999, game.config.height);
        this.myCam.startFollow(this.player, true, 0.05, 0.05);
        // Input Events 
        cursors = this.input.keyboard.createCursorKeys();

        // Collider settings
        this.physics.add.collider(this.ground, this.player);

        const music = this.sound.add("music", { loop: true });
        music.play();
    }

    update() {
        if (gameOver) {
            return;
        }
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
        else {
            this.player.setVelocityX(0);
            this.player.anims.play("idle", true);
        }
        this.bg_2.tilePositionX = this.myCam.scrollX * .1;
        this.bg_3.tilePositionX = this.myCam.scrollX * .2;
        this.bg_4.tilePositionX = this.myCam.scrollX * .4;
        this.bg_5.tilePositionX = this.myCam.scrollX * .5;
        this.bg_6.tilePositionX = this.myCam.scrollX;
        this.bg_7.tilePositionX = this.myCam.scrollX;
        this.ground.tilePositionX = this.player.x;
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
