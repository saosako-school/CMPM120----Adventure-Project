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
            lockbox: [0, 0, 0],
            locker: ['A', 'A', 'A', 'A'],
        };
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
        this.sceneSpecificLoad();
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
        this.cameras.main.fadeIn(this.transitionDuration, 0, 0, 0);

        this.add.rectangle(this.w * 0.75, 0, this.w * 0.25, this.h).setOrigin(0, 0).setFillStyle(0);
        this.add.bitmapText(this.w * 0.75 + this.s, this.s, 'pixelFont', this.name, 3 * this.s, 0)
            .setMaxWidth(this.w * 0.25 - 2 * this.s);

        this.messageBox = this.add.bitmapText(this.w * 0.75 + this.s, this.h * 0.33, 'pixelFont', '', 2*this.s, 0)
            .setMaxWidth(this.w * 0.25 - 2 * this.s);

        this.inventoryBanner = this.add.bitmapText(this.w * 0.75 + this.s, this.h * 0.66, 'pixelFont', 'Inventory', 2 * this.s, 0)
            .setAlpha(0);

        this.inventoryTexts = [];
        this.updateInventory();

        this.add.text(this.w-3*this.s, this.h-3*this.s, "📺")
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
    updateInventory() {
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
            let text = this.add.text(this.w * 0.75 + 2 * this.s, h, e)
                .setStyle({ fontSize: `${1.5 * this.s}px` })
                .setWordWrapWidth(this.w * 0.75 + 4 * this.s);
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
    gainItem(item) {
        if (this.inventory.includes(item)) {
            console.warn('gaining item already held:', item);
            return;
        }
        this.inventory.push(item);
        this.updateInventory();
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
    loseItem(item) {
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
            this.updateInventory();
        });
    }

    fadeDrop(arrayTargets) {
        this.add.tweens({
            targets: arrayTargets,
            y: `-=${this.w * 0.3}`,
            alpha: 0
        })
        //disable interactive
    }

    updateDisplayCode(codeArray, display) {
        /*let codeDisplayStr = ``;
        for (let i = 0; i < codeArray.length; ++i) {
            if (i != 0){
                codeDisplayStr = ` `;
            }
            codeDisplayStr += `${codeArray[i]}`;
        }
        display.setText(codeDisplayStr);*/
    }

    enterCode(numInput, codeArray, codeDisplay) {
        //TODO: make down button that decrements, make enter button and add functionality for correct/incorrect inputs
        // and add stuff that makes codes save and not update when all this junk is not on screen
        //let codeDisplay = this.add.text(this.w * 0.1, this.w * 0.1, `${var1} ${var2} ${var3}`, {font: '400px Arial'});
        this.updateDisplayCode(codeArray, codeDisplay);//add display arg
        /*let up1 = this.add.image(this.w * 0.15, this.w * 0.1, 'upButtonPlaceholder')
        .setScale(0.04)
        .setInteractive()
        .on('pointerdown', () => {
            if (val1 == 9){
                val1 = 0;
            }
            else{
                val1 += 1;
            }
            codeInput.setText(`${var1} ${var2} ${var3}`); //codeInput is basically whatever is displaying the nums/letters
        });*/

        //add to string of some sort later
        
        /* 
        let codeDisplayStr = ``;
        for (let i = 0; i < codeArray.length; ++i) {
            if (i != 0){
                codeDisplayStr += ` `
            }
            codeDisplayStr += `${codeArray[i]}`;
        }

        for (let i = 0; i < codeArray.length; ++i) {
            this.add.image()
            .setScale()
            .setInteractive()
            .on('pointerdown', () => {
                if (codeArray[i] == 9){
                    codeArray[i] = 0;
                }
                else {
                    codeArray[i] += 1;
                }
            });

        }

        codeArray.forEach((num) => {
            
            this.add.image()
            .setScale()
            .setInteractive()
            .on('pointerdown', () => {
                if (num == 9){
                    num = 0;
                }
                else {
                    num += 1;
                }
            });
        });
        
        */
            
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
            codeInput.setText(`${var1} ${var2} ${var3}`);
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
            codeInput.setText(`${var1} ${var2} ${var3}`);
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