(function(global) {

    var Splash = global.Splash = function(game) {};

    Splash.prototype.preload = function() {
        var game = this.game;
        game.load.image('splashTeam', splashGroupImage);
        game.load.image('splashGame', SplashGameImage);
    };

    Splash.prototype.create = function() {
        var game = this.game;

        var fundo = game.add.sprite(0, 0, 'splashTeam');
        fundo.alpha = 0;
        var fundoTween = game.add.tween(fundo).to({
                alpha: 1
            }, 2000, Phaser.Easing.Linear.None, false, 0, 0, true)
            .delay(1000)
            .to({
                alpha: 0
            }, 2000, Phaser.Easing.Linear.None, false, 0, 0, true);

        var splashGame = game.add.sprite(0, 0, 'splashGame');
        splashGame.alpha = 0;
        var splashGameTween = game.add.tween(splashGame).to({
                alpha: 1
            }, 2000, Phaser.Easing.Linear.None, false, 0, 0, true)
            .delay(500)
            .to({
                alpha: 0
            }, 2000, Phaser.Easing.Linear.None, false, 0, 0, true);
        splashGameTween.onComplete.add(function() {
            game.state.start('menu');
        });

        fundoTween.delay(500).chain(splashGameTween).start();
    };

}(this));
