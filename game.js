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
        this.load.image('redframe2', 'images/Placeholders/buttonFrameHelp.png');
    }
    
    setupVisuals() {
        let returnArray = [];
        returnArray.push(this.doorAdd(this.s*20, this.w*0.3, 'doorPlaceholder', 0.08, 'math classroom'));
        returnArray.push(this.doorAdd(this.w*0.1, this.w*0.1, 'doorPlaceholder', 0.08, 'english classroom'));
        returnArray.push(this.doorAdd(this.w*0.2, this.w*0.2, 'doorPlaceholder', 0.08, 'chemistry classroom'));
        returnArray.push(this.doorAdd(this.w*0.3, this.w*0.3, 'doorPlaceholder', 0.08, 'orchestra classroom'));
        returnArray.push(this.doorAdd(this.w*0.15, this.w*0.15, 'doorPlaceholder', 0.08, 'exit door'));
        return returnArray;
    }

    onEnter() {
        let interactiveObjects = this.setupVisuals();
        this.sideUIStuff('left');
        //this.add.image(this.sw * 160, this.sh * 80, 'redTextFrame').setScale(6);
        //this.add.bitmapText(this.sw * 90, this.sh * 49.25, 'pixelFont', 'The quick brown fox jumps over the lazy dog.', 50, 0).setMaxWidth(this.sw * 140);

        /*let test = this.add.image(this.s * 30, this.s * 10, 'upButtonPlaceholder')
        .setScale(0.2);
        let thingy = ['', '', ''];
        test.setInteractive().on('pointerdown', () => {
            this.investigate(thingy, test, interactiveObjects);
        });*/
        
    }
}

class MathClassroom extends AdventureScene {
    constructor() {
        super('math classroom', 'Math Classroom');
    }

    sceneSpecificLoad() {
        this.load.image('doorPlaceholder', 'images/Placeholders/placeholderDoor.png');
        this.load.bitmapFont('pixelFont', 'bitmap font/minogram_6x10.png', 'bitmap font/minogram_6x10.xml');
        this.load.image('upButtonPlaceholder', 'images/Placeholders/triangle.png');
        this.load.image('rightDoor', 'images/regular assets/rightDoor.png');
        this.load.image('rightClassBG', 'images/regular assets/rightClassroom.png');
        this.load.image('mathWhiteboard', 'images/regular assets/mathWhiteboard.png');
        this.load.image('rightClassDecor', 'images/regular assets/rightClassDecor.png');
        this.load.image('filingCabinet', 'images/regular assets/filingCabinet.png');
    }

    setupVisuals() {
        let returnArray = [];
        let BG = this.add.image(this.sw * 160, this.sh * 90, 'rightClassBG')
        .setScale(6);
        let whiteboard = this.add.image(this.sw * 147.5, this.sh * 85.5, 'mathWhiteboard')
        .setScale(6)
        .setInteractive()
        .on('pointerover', () => {
            this.showMessage("There's a simple derivative problem on the whiteboard.");
        });
        let hallway = this.doorAdd(this.sw * 295, this.sh * 98.5, 'rightDoor', 6, 'hallway');
        returnArray.push(whiteboard);
        returnArray.push(hallway);
        return returnArray;
    }

    onEnter() {
        let mathObjects = this.setupVisuals();
        let filingCabinet = this.add.image(this.sw * 238.5, this.sh * 135, 'filingCabinet')
        .setScale(6)
        .setInteractive();
        let decor = this.add.image(this.sw * 160, this.sh * 90, 'rightClassDecor')
        .setScale(6);

        this.sideUIStuff();

        if (this.hasItem('crowbar')) {
            filingCabinetImg.on('pointerover', () => {
                this.showMessage('There is nothing of note left in here.');
            });
        }
        else {
            filingCabinet.on('pointerover', () => {
                this.showMessage("It's a filing cabinet. The top drawer is locked and the rest are empty.");
            })
            filingCabinet.on('pointerdown', () => {
                this.enterCode(filingCabinet, this.codes.filingCabinet, mathObjects, this.codes.filingCabinetAnswer, 'crowbar', 'right');
            });
        }
    }
}

class EnglishClassroom extends AdventureScene {
    constructor() {
        super('english classroom', 'English Classroom');
    }

    sceneSpecificLoad() {
        this.load.image('doorPlaceholder', 'images/Placeholders/placeholderDoor.png');
        this.load.image('leftClassBG', 'images/regular assets/LeftClassroomBG.png');
        this.load.bitmapFont('pixelFont', 'bitmap font/minogram_6x10.png', 'bitmap font/minogram_6x10.xml');
        this.load.image('upButtonPlaceholder', 'images/Placeholders/triangle.png');
        this.load.image('leftClassDoor', 'images/regular assets/door.png');
        this.load.image('englishWhiteboard', 'images/regular assets/englishWhiteboard.png');
        this.load.image('leftRoomDecor', 'images/regular assets/leftRoomDecor.png');
        this.load.image('book', 'images/regular assets/book.png');
        this.load.image('englishPoster', 'images/regular assets/englishPoster.png');
        this.load.image('hole', 'images/regular assets/Hole.png');
    }

    setupVisuals() {
        let arrayReturn = [];
        let BG = this.add.image(this.sw * 160, this.sh * 90, 'leftClassBG').setScale(6);
        let hallway = this.doorAdd(this.sw*25, this.sh*98.5, 'leftClassDoor', 6, 'hallway');
        let englishWhiteboard = this.add.image(this.sw * 172.5, this.sh * 85.5, 'englishWhiteboard')
        .setScale(6)
        .setInteractive()
        .on('pointerover', () => {
            this.showMessage("There's nothing written on the whiteboard.");
        });
        let englishDecor = this.add.image(this.sw * 160, this.sh * 90, 'leftRoomDecor')
        .setScale(6);
        arrayReturn.push(englishWhiteboard);
        arrayReturn.push(hallway);
        return arrayReturn;
    }

    onEnter() {
        let englishObjects = this.setupVisuals();
        this.sideUIStuff('left');

        let bookPages = [
`Tomorrow, and tomorrow, and tomorrow,
Creeps in this petty pace from day to day,`,
`To the last syllable of recorded time;
And all our yesterdays have lighted fools
The way to dusty death.`,
`Out, out, brief candle!
Life's but a walking shadow, a poor player,
That struts and frets his hour upon the stage,`,
`And then is heard no more. It is a tale
Told by an idiot, full of sound and fury,
Signifying nothing.`];

        let hole = this.add.image(this.sw * 72.5, this.sh * 77, 'hole')
        .setScale(6);
        let inspirationalPoster = this.add.image(this.sw * 72.5, this.sh * 77, 'englishPoster')
        .setScale(6).setAlpha(0);

        if (this.hasItem('padlock code')) {
            hole.setInteractive().on('pointerover', () => {
                this.showMessage("It's a hole. There's really nothing to say other than that.");
            });
            englishObjects.push(hole);
        }
        else {
            inspirationalPoster
            .setAlpha(1)
            .setInteractive();
            if (this.readBook == 1) {
                inspirationalPoster.on('pointerover', () => {
                    this.showMessage("You suddenly feel irritated by the 'Tomorrow Starts Today' poster.");
                })
                inspirationalPoster.on('pointerdown', () => {
                    inspirationalPoster.disableInteractive();
                    this.fadeObject(inspirationalPoster, 1, 0);
                    this.showMessage("You tear down the poster to reveal a hole in the wall. You reach into the hole and pull out a scrap of paper with a combination on it.");
                    this.gainItem('padlock code', 'left');
                    hole.setInteractive().on('pointerover', () => {
                        this.showMessage("It's a hole. There's really nothing to say other than that.");
                    });
                })
            }
            else {
                inspirationalPoster.on('pointerover', () => {
                    this.showMessage("It's a poster that says 'Tomorrow Starts Today'");
                })
            }
            englishObjects.push(inspirationalPoster);
        }

        let book = this.add.image(this.sw * 146, this.sh * 126.5, 'book')
        .setScale(6)
        .setInteractive()
        .on('pointerover', () => {
            this.showMessage("It's a book of various Shakespeare plays.");
        })
        .on('pointerdown', () => {
            this.investigate(bookPages, book, englishObjects);
            if (this.hasItem('padlock code') != true) {
                inspirationalPoster.on('pointerover', () => {
                    this.showMessage("You suddenly feel irritated by the 'Tomorrow Starts Today' poster.");
                });

                inspirationalPoster.on('pointerdown', () => {
                    inspirationalPoster.disableInteractive();
                    this.fadeObject(inspirationalPoster, 1, 0);
                    this.showMessage("You tear down the poster to reveal a hole in the wall. You reach into the hole and pull out a scrap of paper with a combination on it.");
                    this.gainItem('padlock code');
                    hole.setInteractive().on('pointerover', () => {
                        this.showMessage("It's a hole. There's really nothing to say other than that.");
                    });
                });
            }
        });
    }
}

class ChemClassroom extends AdventureScene {
    constructor() {
        super('chemistry classroom', 'Chem Classroom');
    }

    sceneSpecificLoad() {
        this.load.image('doorPlaceholder', 'images/Placeholders/placeholderDoor.png');
        this.load.bitmapFont('pixelFont', 'bitmap font/minogram_6x10.png', 'bitmap font/minogram_6x10.xml');
        this.load.image('upButtonPlaceholder', 'images/Placeholders/triangle.png');
        this.load.image('lockbox', 'images/regular assets/Lockbox.png');
        this.load.image('leftRoomDecor', 'images/regular assets/leftRoomDecor.png');
        this.load.image('leftClassBG', 'images/regular assets/LeftClassroomBG.png');
        this.load.image('chemWhiteboard', 'images/regular assets/ChemWhiteboard.png');
        this.load.image('leftClassDoor', 'images/regular assets/door.png');
    }

    setupVisuals() {
        let arrayReturn = [];
        let BG = this.add.image(this.sw * 160, this.sh * 90, 'leftClassBG').setScale(6);
        let hallway = this.doorAdd(this.sw*25, this.sh*98.5, 'leftClassDoor', 6, 'hallway');
        let chemWhiteboard = this.add.image(this.sw * 172.5, this.sh * 85.5, 'chemWhiteboard')
        .setScale(6)
        .setInteractive()
        .on('pointerover', () => {
            this.showMessage('It appears to be a problem about balancing a chemistry equation.');
        });
        let chemDecor = this.add.image(this.sw * 160, this.sh * 90, 'leftRoomDecor')
        .setScale(6);
        arrayReturn.push(hallway);
        arrayReturn.push(chemWhiteboard);
        return arrayReturn;

    }

    onEnter() {
        let chemistryObjects = this.setupVisuals();
        this.sideUIStuff('left');

        let lockboxImg = this.add.image(this.sw * 208, this.sh * 123, 'lockbox')
        .setScale(6)
        .setInteractive();

        if (this.hasItem('padlock instructions')) {
            lockboxImg.on('pointerover', () => {
                this.showMessage('There is nothing of note left in here.');
            });
        }
        else {
            lockboxImg
            .on('pointerover', () => {
                this.showMessage("It's a small lockbox. You shake it a little, noting that it is surprisingly light.");
            })
            .on('pointerdown', () => {
                this.enterCode(lockboxImg, this.codes.lockbox, chemistryObjects, this.codes.lockboxAnswer, 'padlock instructions', 'left');
            });
        }

    }
}

class OrchestraClassroom extends AdventureScene {
    constructor() {
        super('orchestra classroom', 'Orchestra Classroom');
    }

    sceneSpecificLoad() {
        this.load.image('doorPlaceholder', 'images/Placeholders/placeholderDoor.png');
        this.load.bitmapFont('pixelFont', 'bitmap font/minogram_6x10.png', 'bitmap font/minogram_6x10.xml');
        this.load.image('upButtonPlaceholder', 'images/Placeholders/triangle.png');
        this.load.image('rightClassroom', 'images/regular assets/rightClassroom.png');
        this.load.image('orchestraWhiteboard', 'images/regular assets/orchestraWhiteboard.png');
        this.load.image('rightDoor', 'images/regular assets/rightDoor.png');
        this.load.image('locker', 'images/regular assets/locker.png');
        this.load.image('theoryBook', 'images/regular assets/theoryBook.png');
        this.load.image('note', 'images/regular assets/Note.png');
    }

    setupVisuals() {
        let returnArray = [];
        let BG = this.add.image(this.sw * 160, this.sh * 90, 'rightClassroom')
        .setScale(6);
        let hallway = this.doorAdd(this.sw * 295, this.sh * 98.5, 'rightDoor', 6, 'hallway');
        let whiteboard = this.add.image(this.sw * 147.5, this.sh * 85.5, 'orchestraWhiteboard')
        .setScale(6)
        .setInteractive()
        .on('pointerover', () => {
            this.showMessage("The whiteboard has some music notes written on it.");
        });
        returnArray.push(hallway);
        returnArray.push(whiteboard);
        return returnArray;
    }

    onEnter() {
        let orchestraObjects = this.setupVisuals();
        let lockerImg2 = this.add.image(this.sw * 252.5, this.sh * 127.5, 'locker')
        .setScale(6)
        .setInteractive()
        .on('pointerover', () => {
            this.showMessage("It's a locker. There's a sticker that says 'National Merit Semi-Finalist' on the side.");
        });
        let lockerImg = this.add.image(this.sw * 233.5, this.sh * 127.5, 'locker')
        .setScale(6)
        .setInteractive()
        .on('pointerover', () => {
            if (this.hasItem('key')) {
                this.showMessage('There is nothing of note left in here');
            }
            else {
                this.showMessage("It's a locker. There's a word written in Sharpie that has rubbed away to the point of being indecipherable.");
            }
        });
        this.sideUIStuff('right');
        orchestraObjects.push(lockerImg);

        let theoryPages = [
`Treble Clef:
A higher Clef. Read mostly by higher pitched instruments like violins.`,
`The spaces from bottom to top represent F, A, C, and E.`,
`Bass Clef:
A lower Clef. Read mostly by lower pitched instruments like cellos or basses.`,
`The spaces from bottom to top represent A, C, E, and G.`,
`Alto Clef:
A Clef between Treble and Bass. Less common than the other two. Read by violas.`,
`The spaces from bottom to top represent G, B, D, and F.`
        ];

        let notePages = [
            `It seems like Mia's finally lost her patience with the concert master.`,
            `Not that anyone could blame her though. David's insufferable.`,
            `Mia hasn't really retaliated, not verbally at least, but the other day,`, 
            `I lost my phone in the practice room and caught her taking David's hall key.`,
            `David'll at least have to pay the fees to change the locks, but it really is his own fault.`,
            `The relentless bullying towards all of the violists, Mia in particular,`, 
            `not to mention his endless bragging about grades, was going to bite him back.`,
            `At the very least, he'll have to pay for the locks to be changed lol.`
        ]

        let theoryBook = this.add.image(this.sw * 110, this.sh * 112.5, 'theoryBook')
        .setScale(6)
        .setInteractive()
        .on('pointerover', () => {
            this.showMessage("It's a book on elementary music theory.");
        })
        let note = this.add.image(this.sw * 130, this.sh * 170, 'note')
        .setScale(6)
        .setInteractive()
        .on('pointerover', () => {
            this.showMessage("There's a slightly crumpled note on the floor.");
        });
        orchestraObjects.push(lockerImg2);
        orchestraObjects.push(lockerImg);
        orchestraObjects.push(theoryBook);
        orchestraObjects.push(note);

        lockerImg.on('pointerdown', () => {
            this.enterCode(lockerImg, this.codes.locker, orchestraObjects, this.codes.lockerAnswer, 'key', 'right');
        })

        theoryBook.on('pointerdown', () => {
            this.investigate(theoryPages, theoryBook, orchestraObjects);
        });

        note.on('pointerdown', () => {
            this.investigate(notePages, note, orchestraObjects);
        })


        this.investigate(notePages, )

        lockerImg2.on('pointerdown', () => {
            this.enterCode(lockerImg2, this.codes.wrongLocker, orchestraObjects, this.codes.wrongLockerComparison, '', 'right');
        });
        if (this.hasItem('key')) {
            lockerImg.on('pointerover', () => {
                this.showMessage('There is nothing of note left in here.');
            });
        }
        else {
            lockerImg.on('pointerover', () => {
                this.showMessage("It's a locker. There's a word written in Sharpie that has rubbed away to the point of being indecipherable.");
            });
            lockerImg.on('pointerdown', () => {
                this.enterCode(lockerImg, this.codes.locker, orchestraObjects, this.codes.lockerAnswer, 'key', 'right');
            });
        }
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

