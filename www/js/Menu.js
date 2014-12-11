(function(global) {

    var Menu = global.Menu = function(game) {};

    Menu.prototype.preload = function() {
        this.game.load.image('menu', screenMenu);
        this.game.load.atlas('buttons', spriteSheetsImageButtons, spriteSheetsJsonButtons);
    };

    Menu.prototype.create = function() {
        this.background = this.game.add.sprite(0, 0, 'menu');
        this.background.name = 'background';

        var btnGroup = this.btnGroup = this.game.add.group();

        var btnPlay = this.game.add.button(410, 397, 'buttons', this.play, this);
        btnPlay.setFrames(btPlaySelecionado, btPlay);
        btnPlay.anchor.x = 0.5;
        btnGroup.add(btnPlay);

        var btnHowToPlay = this.game.add.button(324, 467, 'buttons', this.howToPlay, this);
        btnHowToPlay.setFrames(btHowToPlaySelelecionado, btHowToPlay);
        btnHowToPlay.anchor.x = 0.5;
        btnGroup.add(btnHowToPlay);

        var btnHighScores = this.game.add.button(489, 467, 'buttons', this.highScores, this);
        btnHighScores.setFrames(btScoreSelecionado, btScore);
        btnHighScores.anchor.x = 0.5;
        btnGroup.add(btnHighScores);

        var btnCredits = this.game.add.button(410, 535, 'buttons', this.credits, this);
        btnCredits.setFrames(btCreditsSelected, btCredits);
        btnCredits.anchor.x = 0.5;
        btnGroup.add(btnCredits);

    };

    Menu.prototype.play = function() {
        this.fadeOut()
            .onComplete.add(function() {
                this.game.state.start('game');
            }, this);
    };

    Menu.prototype.howToPlay = function() {
        this.fadeOut()
            .onComplete.add(function() {
                this.game.state.start('howtoplay');
            }, this);
    };

    Menu.prototype.highScores = function() {
        this.fadeOut()
            .onComplete.add(function() {
                this.game.state.start('gameover');
            }, this);
    };

    Menu.prototype.credits = function() {
        this.fadeOut()
            .onComplete.add(function() {

                this.background.alpha = 0.75;
                this.game.add.tween(this.background).to({
                    alpha: 0
                }, Phaser.Easing.Linear.None, true, 0, 1000, false);

                var credits = this.creditsSprite = this.game.add.sprite(-50, 200, 'credits');

                credits.scale.setTo(0.5, 0.5);

                var creditsArrives = this.game.add.tween(credits);

                creditsArrives.to({
                    x: 300
                }, 1000, Phaser.Easing.Bounce.Out);

                var btnBack = this.btnBack = this.game.add.button(500, 420, 'buttons', this.BackMenu, this);
                btnBack.setFrames(btVoltar, btVoltar);
                btnBack.anchor.x = 0.5;

                creditsArrives.start();

            }, this);
    };

    Menu.prototype.BackMenu = function() {
        this.game.add.tween(this.btnBack)
            .to({
                alpha: 0
            }, 1000)
            .start();

        this.game.add.tween(this.creditsSprite)
            .to({
                x: -300
            }, 1000, Phaser.Easing.Bounce.Out, true)
            .onComplete.add(function() {
                this.create();
            }, this);
    };

    Menu.prototype.fadeOut = function() {
        return this.game.add.tween(this.btnGroup).to({
            alpha: 0
        }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
    };

}(this));
