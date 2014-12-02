(function(global) {

    var HowToPlay = global.HowToPlay = function(game) {};

    HowToPlay.prototype.create = function() {
        this.countFrames = 0;
        this.background = this.game.add.sprite(0, 0, 'screenBlack');
        this.spriteHowToPlayScene = this.game.add.sprite(300, 100, 'howToPlay', 0);

        this.btnProximo = this.game.add.button(545, 460, 'buttonsNext', this.ProximoFrame, this);
        this.btnProximo.setFrames('proximoSelecionado', 'proximo');
        this.btnProximo.anchor.x = 0.5;

        this.btnBack = this.game.add.button(375, 460, 'buttons',
            this.goMenu, this);
        this.btnBack.setFrames(btVoltar, btVoltar);
        this.btnBack.anchor.x = 0.5;
    };

    HowToPlay.prototype.goMenu = function() {
        this.fadeout = this.game.add.tween(this.btnBack).to({
                alpha: 0
            }, 500, Phaser.Easing.Linear.None, true, 0, 0,
            false);
        this.fadeout.onComplete.add(function() {
            this.game.state.start('menu', Menu);
        }, this);
    };



    HowToPlay.prototype.ProximoFrame = function() {
        this.countFrames += 1;
        if (this.countFrames == 1) {
            this.spriteHowToPlayScene = this.game.add.sprite(300, 100, 'howToPlay', 1);
        } else if (this.countFrames == 2) {
            this.spriteHowToPlayScene = this.game.add.sprite(300, 100, 'howToPlay', 2);
        } else if (this.countFrames == 3) {
            this.game.state.start('menu', Menu);
        }
    };

}(this));
