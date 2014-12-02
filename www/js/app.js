(function(global) {
    var game = new Phaser.Game(800, 600, Phaser.AUTO, 'body');
    game.lastScore = global.localStorage.getItem('lastScore');
    game.lastRound = global.localStorage.getItem('lastRound');
    game.bestScore = global.localStorage.getItem('bestScore');
    game.bestRound = global.localStorage.getItem('bestRound');

    game.state.add('preload', Preload);
    game.state.add('splash', Splash);
    game.state.add('menu', Menu);
    game.state.add('game', Game);
    game.state.add('gameover', GameOver);
    game.state.add('howtoplay', HowToPlay);

    game.state.start('preload');
}(this));
