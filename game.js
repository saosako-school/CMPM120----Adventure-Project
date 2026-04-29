class Hallway extends AdventureScene {
    constructor() {
        super('hallway', 'Hallway');
    }

    sceneSpecificLoad() {
        this.load.image('doorPlaceholder', 'images/Placeholders/placeholderDoor.png');
        this.load.image('upButtonPlaceholder', 'images/Placeholders/triangle.png');

        this.load.image('enterCancelButton', 'images/UI assets/Button_UI.png');
        this.load.image('UIBackground', 'images/UI assets/UI_Background.png');
        this.load.image('UIFrame', 'images/UI assets/UI_Frame.png');
        this.load.image('numberFrame', 'images/UI assets/numberFrame.png');
        this.load.image('downArrow', 'images/UI assets/DownArrow.png');
        this.load.image('upArrow', 'images/UI assets/UpArrow.png');
        this.load.image('redframe', 'images/Placeholders/numberFrameHelp.png');
    }

    onEnter() {
        let mathDoor = this.doorAdd(this.s*20, this.w*0.3, 'doorPlaceholder', 0.08, 'math classroom');
        let englishDoor = this.doorAdd(this.w*0.1, this.w*0.1, 'doorPlaceholder', 0.08, 'english classroom');
        let chemDoor = this.doorAdd(this.w*0.2, this.w*0.2, 'doorPlaceholder', 0.08, 'chemistry classroom');
        let orchDoor = this.doorAdd(this.w*0.4, this.w*0.4, 'doorPlaceholder', 0.08, 'orchestra classroom');
        let exitDoor = this.doorAdd(this.w*0.15, this.w*0.15, 'doorPlaceholder', 0.08, 'exit door');

        /*let val1 = 0;

        let frame = this.add.image(this.w * 0.5, this.h * 0.5, 'UIFrame').setScale(6);
        let uiBackground = this.add.image(this.w * 0.5, this.h * 0.5, 'UIBackground').setScale(6).setAlpha(0.5);
        let cancelButton = this.add.image(this.sw * 100, this.sh * 123, 'enterCancelButton').setScale(6);
        let enterButton = this.add.image(this.sw * 220, this.sh * 123, 'enterCancelButton').setScale(6);
        let numberFrame1 = this.add.image(this.sw * 160, this.sh * 71, 'numberFrame').setScale(6);
        let numberFrame2 = this.add.image(this.sw * 200, this.sh * 71, 'numberFrame').setScale(6);
        let numberFrame3 = this.add.image(this.sw * 120, this.sh * 71, 'numberFrame').setScale(6);
        //let redFrame = this.add.image(this.sw * 160, this.sh * 71, 'redframe').setScale(6);
        let nummy = this.add.bitmapText(this.sw * 150, this.sh * 53, 'pixelFont', `${val1}`, 240);
        let upArrow = this.add.image(this.sw * 160, this.sh * 41.5, 'upArrow')
        .setScale(6)
        .setInteractive()
        .on('pointerdown', () => {
            if (val1 == 9){
                val1 = 0;
            }
            else {
                val1 += 1;
            }
            nummy.setText(`${val1}`);
            
        });
        let downArrow = this.add.image(this.sw * 160, this.sh * 100.5, 'downArrow')
        .setScale(6)
        .setInteractive()
        .on('pointerdown', () => {
            if (val1 == 0) {
                val1 = 9;
            }
            else {
                val1 -= 1;
            }
            nummy.setText(`${val1}`);
        });
        //let testing123 = this.add.bitmapText(this.sw * 150, this.sh * 53, 'pixelFont', '1', 240, 1);*/

        //let texthelp = this.add.bitmapText(this.s*20, this.s*20, 'pixelFont', 'AAAA', 10);
        /*let tester = this.add.image(this.w*0.6, this.w*0.6, 'upButtonPlaceholder')
        .setScale(0.8)
        .setInteractive()
        .on('pointerdown', () => {
            let val1 = 0;
            let val2 = 0;
            let val3 = 0;

            let codeInput = this.add.text(this.w * 0.1, this.w * 0.1, `${val1} ${val2} ${val3}`, {font: '400px Arial'});
            let up1 = this.add.image(this.w * 0.15, this.w * 0.1, 'upButtonPlaceholder')
            .setScale(0.04)
            .setInteractive()
            .on('pointerdown', () => {
                if (val1 == 9){
                    val1 = 0;
                }
                else{
                    val1 += 1;
                }
                codeInput.setText(`${val1} ${val2} ${val3}`);
            });
            
            let up2 = this.add.image(this.w * 0.33, this.w * 0.1, 'upButtonPlaceholder')
            .setScale(0.04)
            .setInteractive()
            .on('pointerdown', () => {
                if (val2 == 9){
                    val2 = 0;
                }
                else{
                    val2 += 1;
                }
                codeInput.setText(`${val1} ${val2} ${val3}`);
            });

            let up3 = this.add.image(this.w * 0.5, this.w * 0.1, 'upButtonPlaceholder')
            .setScale(0.04)
            .setInteractive()
            .on('pointerdown', () => {
                if (val3 == 9){
                    val3 = 0;
                }
                else{
                    val3 += 1;
                }
                codeInput.setText(`${val1} ${val2} ${val3}`);
            });
        });*/
    }
}

class MathClassroom extends AdventureScene {
    constructor() {
        super('math classroom', 'MathClassroom');
    }

    preload() {
        this.load.image('doorPlaceholder', 'images/Placeholders/placeholderDoor.png');
        this.load.bitmapFont('pixelFont', 'bitmap font/minogram_6x10.png', 'bitmap font/minogram_6x10.xml');
    }

    onEnter() {
        let hallway = this.doorAdd(this.w*0.3, this.w*0.3, 'doorPlaceholder', 0.08, 'hallway');
    }
}

class EnglishClassroom extends AdventureScene {
    constructor() {
        super('english classroom', 'EnglishClassroom');
    }

    preload() {
        this.load.image('doorPlaceholder', 'images/Placeholders/placeholderDoor.png');
        this.load.bitmapFont('pixelFont', 'bitmap font/minogram_6x10.png', 'bitmap font/minogram_6x10.xml');
    }

    onEnter() {
        let hallway = this.doorAdd(this.w*0.3, this.w*0.3, 'doorPlaceholder', 0.08, 'hallway');
    }
}

class ChemClassroom extends AdventureScene {
    constructor() {
        super('chemistry classroom', 'ChemClassroom');
    }

    preload() {
        this.load.image('doorPlaceholder', 'images/Placeholders/placeholderDoor.png');
        this.load.bitmapFont('pixelFont', 'bitmap font/minogram_6x10.png', 'bitmap font/minogram_6x10.xml');
    }

    onEnter() {
        let hallway = this.doorAdd(this.w*0.3, this.w*0.3, 'doorPlaceholder', 0.08, 'hallway');
    }
}

class OrchestraClassroom extends AdventureScene {
    constructor() {
        super('orchestra classroom', 'OrchestraClassroom');
    }

    preload() {
        this.load.image('doorPlaceholder', 'images/Placeholders/placeholderDoor.png');
        this.load.bitmapFont('pixelFont', 'bitmap font/minogram_6x10.png', 'bitmap font/minogram_6x10.xml');
    }

    onEnter() {
        let hallway = this.doorAdd(this.w*0.3, this.w*0.3, 'doorPlaceholder', 0.08, 'hallway');
    }
}

class ExitDoor extends AdventureScene {
    constructor() {
        super('exit door', 'ExitDoor');
    }

    preload() {
        this.load.bitmapFont('pixelFont', 'bitmap font/minogram_6x10.png', 'bitmap font/minogram_6x10.xml');
        //loads in all the bars, locks, etc
    }

    onEnter() {
        //make back button
        //add locks and bars
    }
}

/*class Demo1 extends AdventureScene {
    constructor() {
        super("demo1", "First Room");
    }

    onEnter() {

        let clip = this.add.text(this.w * 0.3, this.w * 0.3, "📎 paperclip")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => this.showMessage("Metal, bent."))
            .on('pointerdown', () => {
                this.showMessage("No touching!");
                this.tweens.add({
                    targets: clip,
                    x: '+=' + this.s,
                    repeat: 2,
                    yoyo: true,
                    ease: 'Sine.inOut',
                    duration: 100
                });
            });

        let key = this.add.text(this.w * 0.5, this.w * 0.1, "🔑 key")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("It's a nice key.")
            })
            .on('pointerdown', () => {
                this.showMessage("You pick up the key.");
                this.gainItem('key');
                this.tweens.add({
                    targets: key,
                    y: `-=${2 * this.s}`,
                    alpha: { from: 1, to: 0 },
                    duration: 500,
                    onComplete: () => key.destroy()
                });
            })

        let door = this.add.text(this.w * 0.1, this.w * 0.15, "🚪 locked door")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                if (this.hasItem("key")) {
                    this.showMessage("You've got the key for this door.");
                } else {
                    this.showMessage("It's locked. Can you find a key?");
                }
            })
            .on('pointerdown', () => {
                if (this.hasItem("key")) {
                    this.loseItem("key");
                    this.showMessage("*squeak*");
                    door.setText("🚪 unlocked door");
                    this.gotoScene('demo2');
                }
            })

    }
}

class Demo2 extends AdventureScene {
    constructor() {
        super("demo2", "The second room has a long name (it truly does).");
    }
    onEnter() {
        this.add.text(this.w * 0.3, this.w * 0.4, "just go back")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("You've got no other choice, really.");
            })
            .on('pointerdown', () => {
                this.gotoScene('demo1');
            });

        let finish = this.add.text(this.w * 0.6, this.w * 0.2, '(finish the game)')
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage('*giggles*');
                this.tweens.add({
                    targets: finish,
                    x: this.s + (this.h - 2 * this.s) * Math.random(),
                    y: this.s + (this.h - 2 * this.s) * Math.random(),
                    ease: 'Sine.inOut',
                    duration: 500
                });
            })
            .on('pointerdown', () => this.gotoScene('outro'));
    }
}

class Intro extends Phaser.Scene {
    constructor() {
        super('intro')
    }
    create() {
        this.add.text(50,50, "Adventure awaits!").setFontSize(50);
        this.add.text(50,100, "Click anywhere to begin.").setFontSize(20);
        this.input.on('pointerdown', () => {
            this.cameras.main.fade(1000, 0,0,0);
            this.time.delayedCall(1000, () => this.scene.start('demo1'));
        });
    }
}

class Outro extends Phaser.Scene {
    constructor() {
        super('outro');
    }
    create() {
        this.add.text(50, 50, "That's all!").setFontSize(50);
        this.add.text(50, 100, "Click anywhere to restart.").setFontSize(20);
        this.input.on('pointerdown', () => this.scene.start('intro'));
    }
}

*/
const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080,
    },
    pixelArt: true,
    //the dimensions are 16:9
    scene: [Hallway, MathClassroom, EnglishClassroom, ChemClassroom, OrchestraClassroom, ExitDoor],
    title: "Adventure Game",
});

