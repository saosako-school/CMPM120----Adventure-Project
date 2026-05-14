class StartScene extends Phaser.Scene {
    constructor() {
        super('startScene', 'StartScene');
    }

    preload() {
        this.load.bitmapFont('pixelFont', 'bitmap font/minogram_6x10.png', 'bitmap font/minogram_6x10.xml');
    }

    create() {
        this.add.bitmapText((this.game.config.width * 0.003125) * 80, (this.game.config.height/180) * 80, 'pixelFont', 'Click to start', 80, 0);
        this.input.once('pointerdown', (pointer) => {
            console.log('beep');
            this.events.off('pointerdown');
            this.scene.start('hallway');
        });
        
    }
}

class Hallway extends AdventureScene {
    constructor() {
        super('hallway', 'Hallway');
    }

    sceneSpecificLoad() {
        this.load.image('hallBG', 'images/regular assets/hallBG.png');
        this.load.image('chemDoor', 'images/regular assets/chemDoor.png');
        this.load.image('englishDoor', 'images/regular assets/englishDoor.png');
        this.load.image('orchestraDoor', 'images/regular assets/orchestraDoor.png');
        this.load.image('mathDoor', 'images/regular assets/mathDoor.png');
        this.load.image('exitDoor', 'images/regular assets/exitDoor.png');
    }

    onEnter() {
        this.add.image(this.sw*160, this.sh*90, 'hallBG').setScale(6);
        this.doorAdd(this.sw*153, this.sh*90.5, 'englishDoor', 6, 'english classroom');
        this.doorAdd(this.sw*194.5, this.sh*94.5, 'chemDoor', 6, 'chemistry classroom');
        this.doorAdd(this.sw*30, this.sh*91, 'orchestraDoor', 6, 'orchestra classroom');
        this.doorAdd(this.sw*69.5, this.sh*88, 'mathDoor', 6, 'math classroom');
        this.add.image(this.sw*104.5, this.sh*86, 'exitDoor').setScale(6);
        this.add.image(this.sw*104.5, this.sh*100, 'upArrow').setScale(6)
        .setInteractive()
        .on('pointerover', () => {
            this.showMessage("Go to the door at the end of the hallway?");
        })
        .on('pointerdown', () => {
            this.gotoScene('exit door');
        });
        this.sideUIStuff('left');
        
    }
}

class MathClassroom extends AdventureScene {
    constructor() {
        super('math classroom', 'Math Classroom');
    }

    sceneSpecificLoad() {
        this.load.image('mathWhiteboard', 'images/regular assets/mathWhiteboard.png');
        this.load.image('filingCabinet', 'images/regular assets/filingCabinet.png');
    }

    onEnter() {
        let mathObjects = [];
        let BG = this.add.image(this.sw * 160, this.sh * 90, 'rightClassBG')
        .setScale(6);
        let whiteboard = this.add.image(this.sw * 147.5, this.sh * 85.5, 'mathWhiteboard')
        .setScale(6)
        .setInteractive()
        .on('pointerover', () => {
            this.showMessage("There's a simple derivative problem on the whiteboard.");
        });
        let hallway = this.doorAdd(this.sw * 295, this.sh * 98.5, 'rightDoor', 6, 'hallway');
        mathObjects.push(whiteboard);
        mathObjects.push(hallway);

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
                this.enterCode(filingCabinet, this.codes.filingCabinet, mathObjects, this.codes.filingCabinetAnswer, 'crowbar', 'right', 'filing cabinet');
            });
        }
    }
}

class EnglishClassroom extends AdventureScene {
    constructor() {
        super('english classroom', 'English Classroom');
    }

    sceneSpecificLoad() {
        this.load.image('book', 'images/regular assets/book.png');
        this.load.image('englishPoster', 'images/regular assets/englishPoster.png');
        this.load.image('hole', 'images/regular assets/Hole.png');
        this.load.image('englishWhiteboard', 'images/regular assets/englishWhiteboard.png');
    }

    onEnter() {
        let englishObjects = [];
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
        let hole = this.add.image(this.sw * 72.5, this.sh * 77, 'hole')
        .setScale(6);
        let inspirationalPoster = this.add.image(this.sw * 72.5, this.sh * 77, 'englishPoster')
        .setScale(6).setAlpha(0);
        englishObjects.push(englishWhiteboard);
        englishObjects.push(hallway);
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
            this.readBook = 1;
            if (this.hasItem('padlock code') != true) {
                inspirationalPoster.on('pointerover', () => {
                    this.showMessage("You suddenly feel irritated by the 'Tomorrow Starts Today' poster.");
                });

                inspirationalPoster.on('pointerdown', () => {
                    inspirationalPoster.disableInteractive();
                    this.fadeObject(inspirationalPoster, 1, 0);
                    this.showMessage("You tear down the poster to reveal a hole in the wall. You reach into the hole and pull out a scrap of paper with a combination on it.");
                    this.gainItem('padlock code', 'left');
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
        this.load.image('lockbox', 'images/regular assets/Lockbox.png');
        this.load.image('chemWhiteboard', 'images/regular assets/ChemWhiteboard.png');
    }

    onEnter() {
        let chemistryObjects = [];
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
        chemistryObjects.push(hallway);
        chemistryObjects.push(chemWhiteboard);
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
                this.enterCode(lockboxImg, this.codes.lockbox, chemistryObjects, this.codes.lockboxAnswer, 'padlock instructions', 'left', 'lockbox');
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

    onEnter() {
        let orchestraObjects = [];
        let BG = this.add.image(this.sw * 160, this.sh * 90, 'rightClassroom')
        .setScale(6);
        let hallway = this.doorAdd(this.sw * 295, this.sh * 98.5, 'rightDoor', 6, 'hallway');
        let whiteboard = this.add.image(this.sw * 147.5, this.sh * 85.5, 'orchestraWhiteboard')
        .setScale(6)
        .setInteractive()
        .on('pointerover', () => {
            this.showMessage("The whiteboard has some music notes written on it.");
        });
        orchestraObjects.push(hallway);
        orchestraObjects.push(whiteboard);
        let lockerImg2 = this.add.image(this.sw * 252.5, this.sh * 127.5, 'locker')
        .setScale(6)
        .setInteractive()
        .on('pointerover', () => {
            this.showMessage("It's a locker. There's a sticker that says 'National Merit Semi-Finalist' on the side.");
        });
        orchestraObjects.push(lockerImg2);
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
            `not to mention his endless bragging about grades and test scores, was going to bite him back.`,
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

        theoryBook.on('pointerdown', () => {
            this.investigate(theoryPages, theoryBook, orchestraObjects);
        });

        note.on('pointerdown', () => {
            this.investigate(notePages, note, orchestraObjects);
        })


        lockerImg2.on('pointerdown', () => {
            this.enterCode(lockerImg2, this.codes.wrongLocker, orchestraObjects, this.codes.wrongLockerComparison, '', 'right', '');
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
                this.enterCode(lockerImg, this.codes.locker, orchestraObjects, this.codes.lockerAnswer, 'key', 'right', 'locker');
            });
        }
    }
}

class ExitDoor extends AdventureScene {
    constructor() {
        super('exit door', 'ExitDoor');
    }

    sceneSpecificLoad() {
        this.load.bitmapFont('pixelFont', 'bitmap font/minogram_6x10.png', 'bitmap font/minogram_6x10.xml');

        this.load.image('exitBG', 'images/regular assets/exitBG.png');
        this.load.image('exit', 'images/regular assets/finalExit.png');
        this.load.image('doorHandles', 'images/regular assets/doorHandles.png');
        this.load.image('lock', 'images/regular assets/lock.png');
        this.load.image('padlock', 'images/regular assets/padlock.png');
        this.load.image('bars', 'images/regular assets/bars.png');
    }

    onEnter() {
        this.add.image(this.sw*160, this.sh*90, 'exitBG').setScale(6);
        let exited = this.add.image(this.sw*120, this.sh*90, 'exit').setScale(6);
        let padlock = this.add.image(this.sw*120, this.sh*98.5, 'padlock').setScale(6).setAlpha(0);
        this.add.image(this.sw*120, this.sh*91.5, 'doorHandles').setScale(6);
        let bar = this.add.image(this.sw*120, this.sh * 60.5, 'bars').setScale(6).setAlpha(0);
        let keyhole = this.add.image(this.sw*128.5, this.sh*80.5, 'lock').setScale(6);
        let returnToHall = this.add.image(this.sw*120, this.sh*160, 'downArrow').setScale(6);
        this.sideUIStuff('left');

        returnToHall.setInteractive()
        .on('pointerover', () => {
            this.showMessage("Go back to the Hallway?");
        })
        .on("pointerdown", () => {
            this.gotoScene("hallway");
        });
        
        exited.setInteractive()
        .on('pointerover', () => {
            if (this.gameStateStuff.removeBar == 0 || this.gameStateStuff.unlockDoor == 0 || this.gameStateStuff.unlockPadlock == 0) {
                this.showMessage("The door won't open in its current state.");
            }
            else {
                this.showMessage("At last, you can be free!");
            }
        })
        .on('pointerdown', () => {
            if (this.gameStateStuff.removeBar == 0) {
                this.showMessage("You try to tug open the doors, but the giant wood bar keeps the door from budging.");
            }
            else if (this.gameStateStuff.unlockPadlock == 0) {
                this.showMessage("You try to open the doors, but the combination lock and chain keep it firmly shut.");
            }
            else if (this.gameStateStuff.unlockDoor == 0) {
                this.showMessage("You try to open the doors, but they appear to be locked.");
            }
            else {
                this.scene.start("endScene");
            }
        })

        if (this.gameStateStuff.removeBar == 0){
            bar.setAlpha(1);
            bar.setInteractive()
            .on('pointerover', () => {
                this.showMessage("There's a giant wooden bar blocking the door.");
            })
            .on('pointerdown', () => {
                if (this.hasItem('crowbar')) {
                    this.showMessage("You pry the plank off of the door with the crowbar.");
                    this.fadeObject(bar, 1, 0);
                    this.gameStateStuff.removeBar = 1;
                    bar.removeListener('pointerover')
                    .removeListener('pointerdown');
                }
                else {
                    this.showMessage("You tug at the plank until your hands are red, but you don't manage to pry the bar off.");
                }
            });
        }

        if (this.gameStateStuff.unlockPadlock == 0) {
            padlock.setAlpha(1);
            padlock.setInteractive()
            .on('pointerover', () => {
                this.showMessage("A padlock with a combination code and a chain binds the door handles together.");
            })
            .on('pointerdown', () => {
                if (this.hasItem('padlock code') && this.hasItem('padlock instructions')) {
                    this.showMessage("You enter the code and the padlock clicks open.");
                    this.fadeObject(padlock, 1, 0);
                    this.gameStateStuff.unlockPadlock = 1;
                    padlock.removeAllListeners();
                }
                else if ((!(this.hasItem('padlock instructions'))) && this.hasItem('padlock code')) {
                    this.showMessage("You fiddle around with the padlock since you know the code, but no matter how you try to put in the code, the padlock refuses to open. You wish you knew how this particular padlock took combination codes.");                    
                }
                else {
                    this.showMessage("You try a bunch of random codes for the padlock, but none of them work, and you give up, a bit frustrated.");
                }
            })
        }

        if (this.gameStateStuff.unlockDoor == 0) {
            keyhole.setInteractive()
            .on('pointerover', () => {
                this.showMessage("It's a keyhole for the door.");
            })
            .on('pointerdown', () => {
                if (this.hasItem('key')) {
                    this.showMessage("You fit the key into the hole and turn it with a satisfying click, unlocking the door.");
                    this.gameStateStuff.unlockDoor = 1;
                    keyhole.removeAllListeners();
                }
                else {
                    this.showMessage("You reach out towards the keyhole before pulling your hand back, realizing that you don't have a way to unlock it.");
                }
            })
        }

    }
}

class EndScene extends Phaser.Scene {
    constructor() {
        super("endScene", "EndScene");
    }

    preload() {
        this.load.bitmapFont('pixelFont', 'bitmap font/minogram_6x10.png', 'bitmap font/minogram_6x10.xml');
    }

    create() {
        this.add.bitmapText((this.game.config.width * 0.003125) * 80, (this.game.config.height/180) * 20, 'pixelFont', 
`Thank you all so much for playing this.
Seriously. I spent so much time working on this (I have pulled all-nighters and stayed up until 2 in the afternoon to work on this). I know I could have improved a lot of the way I wrote things. A lot of choices were made at like 4 in the morning and I would come back later and wonder what I was even thinking when I wrote them. However, the intended effects were achieved, so for the sake of time I'll ignore ths sillier decisions. I learned a lot and suffered a lot, but I think it was (maybe) worth it. I probably need to curb my ambitions a little though. Every image asset was drawn by me, though this font and its .xml and .png files were made by freezyfrost on itch.io, so a big thanks to them and to you.`,
        1)
        .setMaxWidth(160 * 6)
        .setScale(30);
    }


}

const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080,
    },
    pixelArt: true,
    //the dimensions are 16:9
    scene: [StartScene, Hallway, MathClassroom, EnglishClassroom, ChemClassroom, OrchestraClassroom, ExitDoor, EndScene],
    title: "Adventure Game",
});

