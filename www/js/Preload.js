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
            this.load.atlasJSONArray('person', spriteSheetsImagePerson, spriteSheetsJSONPerson);

            //SpriteSheets Zumbis
            this.load.atlasXML('zombie', spriteSheetsImageZombie, spriteSheetsXmlZombie);

            // Boards
            this.load.image('target', spriteTarget);
            this.load.image('score', spriteScore);
            this.load.image('round', spriteRound);
            this.load.image('amountPeople', amountPeopleImage);

            // Scenarios
            this.load.image('cenario', imageCenario);
            this.load.image('screenBlack', imageCenarioBlack);
            this.load.image('gameOverScreen', gameOverScreen);
            this.load.image('credits', splashCredits);
            this.load.atlasXML('howToPlay', spriteSheetsImageHowToPlay, spriteSheetsXmlHowToPlay);

            // Buttons
            this.load.atlasXML('buttonsNext', btImageProximoImage, btImageProximoXml);

            // Load audios
            this.load.audio('audioPuchZombie', audioPuchZombie);
            this.load.audio('audioZombieDead', audioZombieDead);
            this.load.audio('audioBackGroundGame', audioBackGroundGame);
        },
        create: function() {
            this.state.start('splash');
        }
    };

}(this));
