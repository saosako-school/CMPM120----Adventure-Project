/**
 * A tiny framework dedicated to tiny adventure games.
 *
 * `AdventureScene` is a Phaser scene that provides:
 *   - an inventory of named string items carried between scenes,
 *   - a transient message box for flavor text,
 *   - faded transitions between scenes,
 *   - a consistent UI layout with fullscreen support.
 *
 * Subclass it and implement {@link AdventureScene#onEnter} to build one
 * location of your adventure. Call the helper methods ({@link AdventureScene#showMessage},
 * {@link AdventureScene#gainItem}, {@link AdventureScene#gotoScene}, etc.) from
 * your interactive objects.
 *
 * @extends {Phaser.Scene}
 */
class AdventureScene extends Phaser.Scene {

    /**
     * Phaser lifecycle: receives data passed by `scene.start(key, data)`.
     * We use this to thread the inventory through scene transitions.
     *
     * @param {{inventory?: string[]}} data
     */
    init(data) {
        this.inventory = data.inventory || [];
        this.codes = data.codes || {
            filingCabinet: [0, 0, 0],
            filingCabinetAnswer: [9, 0, 7],
            lockbox: [0, 0, 0],
            lockboxAnswer: [5, 3, 4],
            locker: ['A', 'A', 'A', 'A'],
            lockerAnswer: ['F', 'D', 'E', 'A'],
            wrongLocker: ['A', 'A', 'A', 'A'],
            wrongLockerComparison: [-1, -1, -1, -1]
        };
        this.gameStateStuff = data.gameStateStuff || {
            unlockPadlock: 0,
            unlockDoor: 0,
            removeBar: 0,
        }
        this.readBook = data.readBook || 0;
    }

    /**
     * @param {string} key  A unique Phaser scene key (e.g. `"tunnel"`).
     * @param {string} name A human-readable name shown in the UI (e.g. `"The Tunnel"`).
     */
    constructor(key, name) {
        super(key);
        this.name = name;
    }

    preload() {
        this.load.bitmapFont('pixelFont', 'bitmap font/minogram_6x10.png', 'bitmap font/minogram_6x10.xml');
        this.load.image('rightArrow', 'images/Placeholders/Right_Arrow.png');
        this.load.image('leftArrow', 'images/Placeholders/Left_Arrow.png');
        this.load.image('leftClassBG', 'images/regular assets/LeftClassroomBG.png');
        this.load.image('upArrow', 'images/UI assets/UpArrow.png');
        this.load.image('downArrow', 'images/UI assets/DownArrow.png');
        this.load.image('UIFrame', 'images/UI assets/UI_Frame.png');
        this.load.image('UIBackground', 'images/UI assets/UI_Background.png');
        this.load.image('enterCancelButton', 'images/UI assets/Button_UI.png');
        this.load.image('numberFrame', 'images/UI assets/numberFrame.png');
        this.load.image('leftClassDoor', 'images/regular assets/door.png');
        this.load.image('leftRoomDecor', 'images/regular assets/leftRoomDecor.png');
        this.load.image('leftClassBG', 'images/regular assets/LeftClassroomBG.png');
        this.load.image('rightClassDecor', 'images/regular assets/rightClassDecor.png');
        this.load.image('rightClassBG', 'images/regular assets/rightClassroom.png');
        this.load.image('rightDoor', 'images/regular assets/rightDoor.png');
        this.sceneSpecificLoad();
    }


    sideUIStuff(direction) {
        this.cameras.main.fadeIn(this.transitionDuration, 0, 0, 0);
        let side = 0;
        let fullscreenPos = 0.25;
        if (direction == 'left') {
            side = 0.75;
            fullscreenPos = 1;
        }

        this.add.rectangle(this.w * side, 0, this.w * 0.25, this.h).setOrigin(0, 0).setFillStyle(0, 0.75);
        this.add.bitmapText(this.w * side + this.s, this.s, 'pixelFont', this.name, 3 * this.s, 0)
            .setMaxWidth(this.w * 0.25 - 2 * this.s);

        this.messageBox = this.add.bitmapText(this.w * side + this.s, this.h * 0.33, 'pixelFont', '', 2*this.s, 0)
            .setMaxWidth(this.w * 0.25 - 2 * this.s);

        this.inventoryBanner = this.add.bitmapText(this.w * side + this.s, this.h * 0.66, 'pixelFont', 'Inventory', 2 * this.s, 0)
            .setAlpha(0);
        this.inventoryTexts = [];
        this.updateInventory(direction);

        this.add.text((this.w * fullscreenPos)-3*this.s, this.h-3*this.s, "📺")
            .setStyle({ fontSize: `${2 * this.s}px` })
            .setInteractive({useHandCursor: true})
            .on('pointerover', () => this.showMessage('Fullscreen?'))
            .on('pointerdown', () => {
                if (this.scale.isFullscreen) {
                    this.scale.stopFullscreen();
                } else {
                    this.scale.startFullscreen();
                }
            });
    }

    /**
     * Phaser lifecycle: called once when the scene starts.
     * Lays out the UI, then invokes {@link AdventureScene#onEnter}.
     * Subclasses should override `onEnter`, not `create`.
     */
    create() {
        /** @type {number} Duration in ms of scene fade-in / fade-out. */
        this.transitionDuration = 1000;

        /** @type {number} Game width in scaled pixels (nominally 1920). */
        this.w = this.game.config.width;
        /** @type {number} Game height in scaled pixels (nominally 1080). */
        this.h = this.game.config.height;
        /** @type {number} UI spacing unit in scaled pixels (1% of width). Use multiples of `this.s` for text sizes, margins, etc. */
        this.s = this.game.config.width * 0.01;
        this.sw = this.game.config.width * 0.003125;
        this.sh = this.game.config.height/180;

        this.cameras.main.setBackgroundColor('#444');
        this.onEnter();

    }

    /**
     * Briefly flash a message in the UI message box. The message fades out
     * over a few seconds.
     *
     * @param {string} message The text to show.
     */
    showMessage(message) {
        this.messageBox.setText(message);
        this.tweens.add({
            targets: this.messageBox,
            alpha: { from: 1, to: 0 },
            easing: 'Quintic.in',
            duration: 4 * this.transitionDuration
        });
    }

    /**
     * Re-render the inventory panel. Called automatically by
     * {@link AdventureScene#gainItem} and {@link AdventureScene#loseItem};
     * you generally do not need to call this yourself.
     */
    updateInventory(direction) {
        let side = 0;
        if (direction == 'left') {
            side = 0.75;
        }
        if (this.inventory.length > 0) {
            this.tweens.add({
                targets: this.inventoryBanner,
                alpha: 1,
                duration: this.transitionDuration
            });
        } else {
            this.tweens.add({
                targets: this.inventoryBanner,
                alpha: 0,
                duration: this.transitionDuration
            });
        }
        if (this.inventoryTexts) {
            this.inventoryTexts.forEach((t) => t.destroy());
        }
        this.inventoryTexts = [];
        let h = this.h * 0.66 + 3 * this.s;
        this.inventory.forEach((e, i) => {
            let text = this.add.bitmapText((this.w * side) + (2 * this.s), h, 'pixelFont', e, 1.75 * this.s)
                .setMaxWidth(this.w * side + 4 * this.s);
            h += text.height + this.s;
            this.inventoryTexts.push(text);
        });
    }

    /**
     * Test whether the player is currently carrying an item.
     *
     * @param {string} item Item name.
     * @returns {boolean}
     */
    hasItem(item) {
        return this.inventory.includes(item);
    }

    /**
     * Add an item to the player's inventory (no-op with a console warning
     * if the item is already held). The inventory panel animates the new entry in.
     *
     * @param {string} item Item name. Short and consistent works best (e.g. `"key"`, not `"a shiny key"`).
     */
    gainItem(item, direction) {
        if (this.inventory.includes(item)) {
            console.warn('gaining item already held:', item);
            return;
        }
        this.inventory.push(item);
        this.updateInventory(direction);
        for (let text of this.inventoryTexts) {
            if (text.text == item) {
                this.tweens.add({
                    targets: text,
                    x: { from: text.x - 20, to: text.x },
                    alpha: { from: 0, to: 1 },
                    ease: 'Cubic.out',
                    duration: this.transitionDuration
                });
            }
        }
    }

    /**
     * Remove an item from the player's inventory (no-op with a console warning
     * if the item is not held). The inventory panel animates the entry out.
     *
     * @param {string} item Item name. Must match the name passed to {@link AdventureScene#gainItem}.
     */
    loseItem(item, direction) {
        if (!this.inventory.includes(item)) {
            console.warn('losing item not held:', item);
            return;
        }
        for (let text of this.inventoryTexts) {
            if (text.text == item) {
                this.tweens.add({
                    targets: text,
                    x: { from: text.x, to: text.x + 20 },
                    alpha: { from: 1, to: 0 },
                    ease: 'Cubic.in',
                    duration: this.transitionDuration
                });
            }
        }
        this.time.delayedCall(500, () => {
            this.inventory = this.inventory.filter((e) => e != item);
            this.updateInventory(direction);
        });
    }

    fadeObject(target, alphaStart, alphaEnd) {
        this.tweens.add({
            targets: target,
            alpha: {from: alphaStart, to: alphaEnd},
            ease: 'Linear',
            duration: 1000,
        })
    }

    enterCode(summoningObject, codeArray, sceneObjectArray, answer, addedItem, direction, lockedContainer) {
        summoningObject.disableInteractive();

        let startingXPos = 0;
        let upButtons = [];
        let downButtons = [];
        let display = [];
        let numberFrames = [];
        let frame = this.add.image(this.w * 0.5, this.h * 0.5, 'UIFrame').setScale(6).setAlpha(0);
        let uiBackground = this.add.image(this.w * 0.5, this.h * 0.5, 'UIBackground').setScale(6).setAlpha(0)

        for (let i = 0; i < sceneObjectArray.length; ++i) {
            sceneObjectArray[i].disableInteractive();
        }

        if (codeArray.length == 3) {
            startingXPos = 110;
        }
        else {
            startingXPos = 90;
        }

        for (let i = 0; i < codeArray.length; ++i){
            numberFrames.push(this.add.image(((startingXPos + 10) + (40 * i)) * this.sw, this.sh * 71, 'numberFrame')
            .setScale(6));

            display.push(this.add.bitmapText((startingXPos + (40 * i)) * this.sw, this.sh * 53, 'pixelFont', `${codeArray[i]}`, 240));
            upButtons.push(this.add.image((startingXPos + (40 * i) + 10) * this.sw, this.sh * 41.5, 'upArrow')
            .setScale(6)
            .setAlpha(0));

            downButtons.push(this.add.image((startingXPos + (40 * i) + 10) * this.sw, this.sh * 100.5, 'downArrow')
            .setScale(6)
            .setAlpha(0));
        }

        let cancel = this.add.image(this.sw * 100, this.sh * 123, 'enterCancelButton')
        .setScale(6)
        .setAlpha(0);

        let enter = this.add.image(this.sw * 220, this.sh * 123, 'enterCancelButton')
        .setScale(6)
        .setAlpha(0);

        let exitText = this.add.bitmapText(this.sw * 89, this.sh * 118.5, 'pixelFont', 'Exit', 60, 1).setAlpha(0);
        let enterText = this.add.bitmapText(this.sw * 206, this.sh * 118.5, 'pixelFont', 'Enter', 60, 1).setAlpha(0);

        this.fadeObject(uiBackground, 0, 0.5);
        this.fadeObject(frame, 0, 1);
        this.fadeObject(display, 0, 1);
        this.fadeObject(upButtons, 0, 1);
        this.fadeObject(downButtons, 0, 1);
        this.fadeObject(cancel, 0, 1);
        this.fadeObject(enter, 0, 1);
        this.fadeObject(numberFrames, 0, 1);
        this.fadeObject(exitText, 0, 1);
        this.fadeObject(enterText, 0, 1);

        for (let i = 0; i < codeArray.length; ++i){
            upButtons[i].setInteractive()
            .on('pointerdown', () => {
                if (codeArray.length == 3) {
                    if (codeArray[i] == 9) {
                        codeArray[i] = 0;
                    }
                    else {
                        codeArray[i] += 1;
                    }
                }
                else {
                    if (codeArray[i] == 'Z') {
                        codeArray[i] = 'A';
                    }
                    else {
                        codeArray[i] = String.fromCharCode(codeArray[i].charCodeAt(0) + 1);
                    }
                }
                display[i].setText(`${codeArray[i]}`);
            });

            downButtons[i].setInteractive()
            .on('pointerdown', () => {
                if (codeArray.length == 3) {
                    if (codeArray[i] == 0) {
                        codeArray[i] = 9;
                    }
                    else {
                        codeArray[i] -= 1;
                    }
                }
                else {
                    if (codeArray[i] == 'A') {
                        codeArray[i] = 'Z';
                    }
                    else {
                        codeArray[i] = String.fromCharCode(codeArray[i].charCodeAt(0) - 1);
                    }
                }
                display[i].setText(`${codeArray[i]}`);
            });
        }

        cancel.setInteractive()
        .on('pointerdown', () => {
            for (let i = codeArray.length - 1; i >= 0; --i) {
                downButtons[i].disableInteractive();
                upButtons[i].disableInteractive();
                display[i].disableInteractive();
                cancel.disableInteractive();
                enter.disableInteractive();
            }

            this.fadeObject(display, 1, 0);
            this.fadeObject(downButtons, 1, 0);
            this.fadeObject(upButtons, 1, 0);
            this.fadeObject(uiBackground, 0.5, 0);
            this.fadeObject(numberFrames, 1, 0);
            this.fadeObject(frame, 1, 0);
            this.fadeObject(cancel, 1, 0);
            this.fadeObject(enter, 1, 0);
            this.fadeObject(exitText, 1, 0);
            this.fadeObject(enterText, 1, 0);
            summoningObject.setInteractive();
            
            for (let i = 0; i < sceneObjectArray.length; ++i) {
                sceneObjectArray[i].setInteractive();
            }
        });

        enter.setInteractive()
        .on('pointerdown', () => {
            for (let i = 0; i < codeArray.length; ++i){
                if (codeArray[i] != answer[i]){
                    this.showMessage('You enter the code, but nothing happens.');
                    break;
                }
                if (i == codeArray.length - 1){
                    this.showMessage(`You unlocked the ${lockedContainer} and got the ${addedItem}.`);
                    this.gainItem(addedItem, direction);

                    for (let i = codeArray.length - 1; i >= 0; --i) {
                        downButtons[i].disableInteractive();
                        upButtons[i].disableInteractive();
                        display[i].disableInteractive();
                        cancel.disableInteractive();
                        enter.disableInteractive();
                    }
                    cancel.disableInteractive();
                    enter.disableInteractive();

                    this.fadeObject(display, 1, 0);
                    this.fadeObject(downButtons, 1, 0);
                    this.fadeObject(upButtons, 1, 0);
                    this.fadeObject(uiBackground, 0.5, 0);
                    this.fadeObject(numberFrames, 1, 0);
                    this.fadeObject(frame, 1, 0);
                    this.fadeObject(cancel, 1, 0);
                    this.fadeObject(enter, 1, 0);
                    this.fadeObject(exitText, 1, 0);
                    this.fadeObject(enterText, 1, 0);

                    summoningObject.setInteractive()
                    .on('pointerover', () => {
                        this.showMessage("There's nothing of note left in there.");
                    })
                    .removeListener('pointerdown');

                    for (let i = 0; i < sceneObjectArray.length; ++i) {
                        sceneObjectArray[i].setInteractive();
                    }
                }
            }
        });
    }

    doorAdd(xPos, yPos, doorImage, scale, key) {
        return this.add.image(xPos, yPos, doorImage)
        .setScale(scale)
        .setInteractive()
        .on('pointerover', () => this.showMessage(`It's a door that leads to the ${key}.`))
        .on('pointerdown', () => {
            this.gotoScene(key);
        });
    }

    investigate(pages, summoningObject, sceneObjectArray) {
        summoningObject.disableInteractive();
        for (let i = 0; i < sceneObjectArray.length; ++i) {
            sceneObjectArray[i].disableInteractive();
        }
        let currentPageNum = 1;
        let frame = this.add.image(this.w * 0.5, this.h * 0.5, 'UIFrame').setScale(6).setAlpha(0);
        let uiBackground = this.add.image(this.w * 0.5, this.h * 0.5, 'UIBackground').setScale(6).setAlpha(0);
        //this.add.image(this.sw * 153.5, this.sh * 41.5, 'redframesmall').setScale(6);
        //this.add.image(this.sw * 166.5, this.sh * 41.5, 'redframesmall').setScale(6);
        let back = this.add.image(this.sw * 142.5, this.sh * 42, 'leftArrow').setScale(6).setAlpha(0);
        let next = this.add.image(this.sw * 177.5, this.sh * 42, 'rightArrow').setScale(6).setAlpha(0);

        let currentPage = this.add.bitmapText(this.sw * 151, this.sh * 37, 'pixelFont', currentPageNum, 60, 1).setAlpha(0);
        let lastPage = this.add.bitmapText(this.sw * 164, this.sh * 37, 'pixelFont', `${pages.length}`, 60, 1).setAlpha(0);
        let slash = this.add.bitmapText(this.sw * 157.5, this.sh * 37, 'pixelFont', '/', 60, 1).setAlpha(0);

        let cancel = this.add.image(this.sw * 100, this.sh * 123, 'enterCancelButton')
        .setScale(6).setAlpha(0);
        let exitText = this.add.bitmapText(this.sw * 89, this.sh * 118.5, 'pixelFont', 'Exit', 60, 1).setAlpha(0);
        let displayText = this.add.bitmapText(this.sw * 90, this.sh * 49.25, 'pixelFont', `${pages[currentPageNum - 1]}`, 60, 0)
        .setMaxWidth(this.sw * 140).setAlpha(0);

        this.fadeObject(frame, 0, 1);
        this.fadeObject(uiBackground, 0, 0.5);
        this.fadeObject(back, 0, 1);
        this.fadeObject(next, 0, 1);
        this.fadeObject(currentPage, 0, 1);
        this.fadeObject(lastPage, 0, 1);
        this.fadeObject(cancel, 0, 1);
        this.fadeObject(exitText, 0, 1);
        this.fadeObject(slash, 0, 1);
        this.fadeObject(displayText, 0, 1);

        next.setInteractive();
        next.on('pointerdown', () => {
            next.disableInteractive();
            back.disableInteractive();
            if (currentPageNum == pages.length) {
                currentPageNum = 1;
            }
            else {
                currentPageNum += 1;
            }
            let fadeOut = this.tweens.add({
                targets: [currentPage, displayText],
                y: '+=25',
                alpha: {from: 1, to: 0},
                ease: 'Linear',
                duration: 500
            });

            fadeOut.on('complete', () => {
                currentPage.setText(`${currentPageNum}`);
                displayText.setText(`${pages[currentPageNum - 1]}`);
                let fadeIn = this.tweens.add({
                    targets: [currentPage, displayText],
                    y: '-=25',
                    alpha: {from: 0, to: 1},
                    ease: 'Linear',
                    duration: 500,
                });

                fadeIn.on('complete', () => {
                    next.setInteractive();
                    back.setInteractive();
                });
            });
        });

        back.setInteractive();
        back.on('pointerdown', () => {
            back.disableInteractive();
            next.disableInteractive();
            if (currentPageNum == 1) {
                currentPageNum = pages.length;
            }
            else {
                currentPageNum -= 1;
            }
            let fadeOut = this.tweens.add({
                targets: [currentPage, displayText],
                y: '+=25',
                alpha: {from: 1, to: 0},
                ease: 'Linear',
                duration: 500
            });
            fadeOut.on('complete', () => {
                currentPage.setText(`${currentPageNum}`);
                displayText.setText(`${pages[currentPageNum - 1]}`);
                let fadeIn = this.tweens.add({
                    targets: [currentPage, displayText],
                    y: '-=25',
                    alpha: {from: 0, to: 1},
                    ease: 'Linear',
                    duration: 500,
                });
                fadeIn.on('complete', () => {
                    back.setInteractive();
                    next.setInteractive();
                });
            });
        });

        cancel.setInteractive();
        cancel.on('pointerdown', () => {
            back.disableInteractive();
            next.disableInteractive();
            cancel.disableInteractive();

            this.fadeObject(frame, 1, 0);
            this.fadeObject(uiBackground, 0.5, 0);
            this.fadeObject(back, 1, 0);
            this.fadeObject(next, 1, 0);
            this.fadeObject(currentPage, 1, 0);
            this.fadeObject(lastPage, 1, 0);
            this.fadeObject(cancel, 1, 0);
            this.fadeObject(exitText, 1, 0);
            this.fadeObject(slash, 1, 0);
            this.fadeObject(displayText, 1, 0);
            for (let i = 0; i < sceneObjectArray.length; ++i) {
                sceneObjectArray[i].setInteractive();
            }
            summoningObject.setInteractive();
            this.readBook = 1;
        });
    }

    /**
     * Fade out the camera and transition to another scene by key, carrying
     * the current inventory with us.
     *
     * @param {string} key The Phaser scene key of the destination scene.
     */
    gotoScene(key) {
        this.cameras.main.fade(this.transitionDuration, 0, 0, 0);
        this.time.delayedCall(this.transitionDuration, () => {
            this.scene.start(key, {
                inventory: this.inventory,
                codes: this.codes,
                readBook: this.readBook,
                gameStateStuff: this.gameStateStuff
            });
        });
    }

    /**
     * Subclass hook: called at the end of {@link AdventureScene#create}, after
     * the message box and inventory panel exist. Override this in your scene
     * to add your location's interactive objects.
     *
     * @example
     * onEnter() {
     *     this.add.text(100, 100, "a rock")
     *         .setInteractive()
     *         .on('pointerover', () => this.showMessage("It's a rock."))
     *         .on('pointerdown', () => this.gotoScene('next_room'));
     * }
     */
    onEnter() {
        console.warn('This AdventureScene did not implement onEnter():', this.constructor.name);
    }

    sceneSpecificLoad() {
        console.warn('This AdventureScene did not implement sceneSpecificLoad():', this.constructor.name);
    }
}