# Phaser Texture Atlas Sample

### Disclaimer
See [LICENSE.md]() for license terms and conditions.

This sample is used to show the usage of texture atlas in Phaser engine with 
Intel(R) XDK. The assets and code are created from [Zombie Attack](https://github.com/jucimarjr/html5games/tree/master/phaser/zombie_attack) by Jucimar Junior.

### Application Files
* asset/
* audios/
* index.html
* js/
  * FilePaths.js
  * Game.js
  * GameOver.js
  * HowToPlay.js
  * Menu.js
  * Person.js
  * Preload.js
  * Splash.js
  * Zombie.js
  * app.js
* lib/
* prep/

### Overview

`www/js/app.js` is the entrance of the game which defines and bootstrap following scenarios (or states):
* [Preload](www/js/Preload.js): load assets for the game
* [Splash](www/js/Splash.js): display splash screens for the game
* [Menu](www/js/Menu.js): display menu and navigate to other scenarios
* [Game](www/js/Game.js): main game logic
* [HowToPlay](www/js/HowToPlay.js): display the guide for the game
* [Credits](www/js/Credits.js): display credits for the authors
* [GameOver](www/js/GameOver.js): display high scores

### Game Asset Manager
Game Asset Manager (GAM) is a tool for previewing and creating code snippets for various assets commonly used in game projects. By creating or importing a game project in Intel XDK, you will find GAM panel on the left side of "DEVELOP" tab.
With Game Asset Manager, you can generate code snippet to preload, create sprite and render animations from texture atlas.

### Preload Texture Atlas
The definition of sprites is stored in .xml or .json file. Phaser engine accepts three formats of texture atlas definition: `XML`, `JSONHash` and `JSONArray`. All the formats can be created from tools like [TexturePacker](https://www.codeandweb.com/texturepacker). `www/prep` contains original TexturePacker projects and images.

You can use [`Phaser.Loader.atlas (key, textureURL, atlasURL, atlasData, format)`](http://docs.phaser.io/Phaser.Loader.html#atlas) to preload all kinds of texture atlas by specifying `format` argument. For example, to load `asset/spritesheets/zombie.xml` use following code:

```
this.game.loader.atlas('zombie', 'asset/spritesheets/zombie.png', 'asset/spritesheets/zombie.xml', null, Phaser.Loader.TEXTURE_ATLAS_XML_STARLING);
```

Or instead, you can use `Phaser.Loader.atlasXML`, `Phaser.Loader.atlasJSONHash` and `JSONArray` to load definitions in XML, JSONHash and JSONArray format separately. See `www/js/Preload.js` for the usage of preloading of texture atlas.

### Create Sprite with Texture Atlas
Texture atlas should be loaded with sprite. You can use factory function [`sprite(x, y, key, frame, group)`](http://docs.phaser.io/Phaser.GameObjectFactory.html#sprite) or the constructor [`Phaser.Sprite(game, x, y, key, frame)`](http://docs.phaser.io/Phaser.Sprite.html#Sprite). For example, to create a zombie sprite with preloaded texture `zombie`:

```
// ignore "frame" parameter will let the sprite use all frames within the texture atlas
var zombie = new Sprite (x, y, 'zombie');
```

See `www/js/Person.js` and `www/js/Zombie.js` for the usage above.

### Define Sprite Animations with Texture Atlas
You can pack as many frames as you can in texture atlas and use it in a sprite. In this sample game, zombies walking left, right or zombies dead can be packed into one texture atlas. To use play animations from these frames, you can add animations to the sprite by [`sprite.animations.add(name, frames, frameRate, loop, useNumericIndex)`](http://docs.phaser.io/Phaser.AnimationManager.html#add) and use [`sprite.animations.play(name, frameRate, loop, killOnComplete)`](http://docs.phaser.io/Phaser.AnimationManager.html#play) to play the animation. For example, to add zombie walking left animation you can use following code:

```
sprite.animations.add(
    'left',                         // name of the animation
    ['left-0', 'left-1', 'left-2'], // ordered frame names / indexes of the animation
    7,                              // frame rate set to 7
    true,                           // we want the animation loop
    false                           // set to true if you are using numeric indexes for the frames
);
sprite.animations.play('left');     // play the animation
```

The frame names can also be generated by helper function [`Phaser.Animation.generateFrameNames(prefix, start, stop, suffix, zeroPad)`](http://docs.phaser.io/Phaser.Animation.html#generateFrameNames).

See `www/js/Person.js` and `www/js/Zombie.js` for detailed usage of animations.

# Intel(R) XDK
This sample is part of the Intel(R) XDK. 
Download the Intel XDK at http://software.intel.com/en-us/html5.
