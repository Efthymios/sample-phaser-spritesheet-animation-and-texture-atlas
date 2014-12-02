(function(global) {

    var GameOver = global.GameOver = function(game) {};

    GameOver.prototype.preload = function() {
        this.game.load.atlas('buttons', spriteSheetsImageButtons, spriteSheetsJsonButtons);
    };

    GameOver.prototype.create = function() {
        this.background = this.game.add.sprite(0, 0, 'gameOverScreen');
        global.localStorage.setItem('lastScore', this.game.lastScore);
        global.localStorage.setItem('lastRound', this.game.lastRound);

        if (typeof this.game.bestScore === 'undefined') {
            this.game.bestScore = 0;
            this.game.BestRound = 1;
        }

        if (this.game.lastScore > this.game.bestScore) {
            this.game.bestScore = this.game.lastScore;
            this.game.bestRound = this.game.lastRound;
            global.localStorage.setItem('bestScore', this.game.lastScore);
            global.localStorage.setItem('bestRound', this.game.lastRound);
        }

        this.lastScoreText = this.game.add.text(440, 173, this.game.lastScore, {
            font: '24px arcade_normalregular',
            fill: '#ffffff',
            align: 'right'
        });
        this.lastRoundText = this.game.add.text(440, 218, this.game.lastRound, {
            font: '24px arcade_normalregular',
            fill: '#ffffff',
            align: 'right'
        });
        this.bestScoreText = this.game.add.text(425, 368, this.game.bestScore, {
            font: '27px arcade_normalregular',
            fill: '#ffffff',
            align: 'right'
        });
        this.bestRoundText = this.game.add.text(425, 435, this.game.bestRound, {
            font: '27px arcade_normalregular',
            fill: '#ffffff',
            align: 'right'
        });

        this.btnBack = this.game.add.button(680, 440, 'buttons', this.goMenu, this);
        this.btnBack.setFrames(btVoltar, btVoltar);
        this.btnBack.anchor.x = 0.5;
    };

    GameOver.prototype.goMenu = function() {
        this.game.add.tween(this.btnBack).to({
            alpha: 0
        }, 500, Phaser.Easing.Linear.None, true, 0, 0, false)
        .onComplete.add(function() {
            this.game.state.start('menu', Menu);
        }, this);
    };

}(this));
