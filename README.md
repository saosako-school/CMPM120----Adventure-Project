A simple adventure game by Sydney based on a simple adventure game engine by [Adam Smith](https://github.com/rndmcnlly).

Code requirements:
- **4+ scenes based on `AdventureScene`**:
    - Scene 1: Hallway
    - Scene 2: MathClassroom,
    - Scene 3: OrchestraClassroom,
    - Scene 4: EnglishClassroom
- **2+ scenes *not* based on `AdventureScene`**: unsatisfied (name the classes).
- **2+ methods or other enhancement added to the adventure game engine to simplify my scenes**:
    - Enhancement 1: doorAdd(); adds door objects that can transport the player to different scenes
    - Enhancement 2: made this.sh and this.sw which scale to the height and width of the canvas I drew the assets on (so this.sh is 1/180 of the height since I drew my assets on a canvas with a height of 180 pixels), which made calculating where to place objects much much easier.

Experience requirements:
- **4+ locations in the game world**: unsatisfied (name at least 4 of the classes).
- **2+ interactive objects in most scenes**: unsatisfied (describe two examples)
- **Many objects have `pointerover` messages**: unsatisfied (describe two examples)
- **Many objects have `pointerdown` effects**: unsatisfied (describe two examples)
- **Some objects are themselves animated**: unsatisfied (describe two examples)

Asset sources:
- I drew each image asset myself (with exception to the bitmap font stuff) using Procreate on my iPad. I made all assets that I was going to use on one canvas (which was 320 by 180) on a bunch of different layers and made several copies of the canvas to isolate individual assets on each canvas, crop out all unnecessary space, and send it over to my computer for use.
- The bitmap font was NOT created by me in any way. If I had the time, I likely would have created my own font (though, it was unlikely that such an endeavor would be worth it considering that I'd come out with a similar, or inferior result, and would have spent way more time than I already have). In any case, the font (by which I mean the .xml and .png files for the font I used) was created by frostyfreeze. I downloaded a pack of these fonts from [here](https://frostyfreeze.itch.io/pixel-bitmap-fonts-png-xml), which I found when I was looking around for .xml and .png files for bitmap fonts (Phaser reqires both, which, as frostyfreeze notes, is difficult to come by, so they made the fonts for this reason).

Code sources:
- `adventure.js` and `index.html` were created for this project [Adam Smith](https://github.com/rndmcnlly) and edited by me.
- `game.js` was sketched by [Adam Smith](https://github.com/rndmcnlly) and rewritten by me.