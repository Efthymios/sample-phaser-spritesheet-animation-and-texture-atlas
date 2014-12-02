(function(global) {

    var Preload = global.Preload = function() {};

    Preload.prototype = {
        init: function() {
            this.stage.disableVisibilityChange = true;
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
            this.scale.setScreenSize(true);
            this.scale.refresh();
        },
        preload: function preload() {
            //SpriteSheets Pessoas
            this.load.atlasXML('personDown', spriteSheetsImagePersonDown, spriteSheetsXmlPersonDown);

            //SpriteSheets Zumbis
            this.load.atlasXML('zombieLeft', spriteSheetsImageZombieLeft, spriteSheetsXmlZombieLeft);
            this.load.atlasXML('zombieRight', spriteSheetsImageZombieRight, spriteSheetsXmlZombieRight);
            this.load.atlasXML('zombieDead', spriteSheetsImageZombieDead, spriteSheetsXmlZombieDead);
            this.load.atlasXML('zombieBitePerson', spriteSheetsImageBitePerson, spriteSheetsXmlBitePerson);

            this.load.image('target', spriteTarget);
            this.load.image('score', spriteScore);
            this.load.image('round', spriteRound);
            this.load.image('cenario', imageCenario);
            this.load.image('credits', splashCredits);
            this.load.image('screenBlack', imageCenarioBlack);
            this.load.image('gameOverScreen', gameOverScreen);
            this.load.image('btMenu', btImageMenu);
            this.load.atlasXML('buttonsNext', btImageProximoImage, btImageProximoXml);
            this.load.atlasXML('howToPlay', spriteSheetsImageHowToPlay, spriteSheetsXmlHowToPlay);
            this.load.image('amountPeople', amountPeopleImage);

            // Load audios
            this.load.audio('audioPuchZombie', audioPuchZombie);
            this.load.audio('audioZombieDead', audioZombieDead);
            this.load.audio('audioBackGroundGame', audioBackGroundGame);
        },
        create: function() {
            this.state.start('game');
        }
    };

}(this));
