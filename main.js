let game;
const gameOptions = {

}
window.onload = function () {
    const gameConfig = {
        width: 270,
        height: 150,
        scene: [bootGame, playGame]
    }

    game = new Phaser.Game(gameConfig);
    window.focus();
    resizeGame();
    window.addEventListener("resize", resizeGame);

}

class bootGame extends Phaser.Scene {
    constructor() {
        super("BootGame");
    }

    create() {
        console.log("game is booting...");
        this.scene.start("PlayGame");
        const animConfig = {
            key: 'walk',
            frames: 'walker',
            frameRate: 60,
            repeat: -1
        };

        this.anims.create(animConfig);
    }
}

class playGame extends Phaser.Scene {
    constructor() {
        super("PlayGame");
    }

    preload() {
        this.load.image("background", "./assets/layers/parallax-mountain-bg.png");
        this.load.image("foreground1", "./assets/layers/parallax-mountain-1.png");
        this.load.image("foreground2", "./assets/layers/parallax-mountain-2.png");
        this.load.image("foreground3", "./assets/layers/parallax-mountain-3.png");
        this.load.image("foreground4", "./assets/layers/parallax-mountain-4.png");
    }

    create() {
        this.bg_1 = this.add.tileSprite(0, 0, game.config.width, game.config.height, "background");
        this.bg_1.setOrigin(0, 0);
        this.bg_1.setScrollFactor(0);

        this.bg_2 = this.add.tileSprite(0, 0, game.config.width, game.config.height, "foreground1");
        this.bg_2.setOrigin(0, 0);
        this.bg_2.setScrollFactor(0.25);

        this.bg_3 = this.add.tileSprite(0, 0, game.config.width, game.config.height, "foreground2");
        this.bg_3.setOrigin(0, 0);
        this.bg_3.setScrollFactor(0.30);

        this.bg_4 = this.add.tileSprite(0, 0, game.config.width, game.config.height, "foreground3");
        this.bg_4.setOrigin(0, 0);
        this.bg_4.setScrollFactor(0.50);

        this.bg_5 = this.add.tileSprite(0, 0, game.config.width, game.config.height, "foreground4");
        this.bg_5.setOrigin(0, 0);
        this.bg_5.setScrollFactor(0.75);
    }

    update() {
        this.bg_2.tilePositionX -= 0.05;
        this.bg_3.tilePositionX -= 0.1;
        this.bg_4.tilePositionX -= 0.25;
        this.bg_5.tilePositionX -= 0.50;
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
