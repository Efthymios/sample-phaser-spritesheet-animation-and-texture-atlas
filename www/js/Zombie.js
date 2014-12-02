(function(global) {

    var Zombie = global.Zombie = function(state, person) {

        this.game = state.game;
        this.state = state;

        var x, y;

        if (typeof zombie === 'undefined') {
            var pos = this.rand();
            x = pos.x;
            y = pos.y;
        } else {
            x = person.x;
            y = person.y;
        }

        Phaser.Sprite.call(this, state.game, x, y, (x < 0 ? 'zombieRight' : 'zombieLeft'));

        this.name = 'zombie ' + (x < 0 ? 'right' : 'left') + ' - ' + (++Zombie.id);

        // this.spriteSheetZombie = this.createSprite(x);
        // this.spriteZombie = this.game.add.sprite(x, y, this.spriteSheetZombie);
        this.z = 0;

        this.animations.add('zDown').play(7, true);

        this.game.physics.enable(this, Phaser.Physics.ARCADE);
        this.body.enable = true;
        this.body.setSize(30, 30);

        this.inputEnabled = true;
        this.events.onInputDown.add(this.killZombie, this);

        if (person) {
            this.body.velocity.x = person.body.velocity.x;
        } else {
            if (x < 0) {
                this.body.velocity.x = this.game.rnd.integerInRange(10, 50);
                this.body.velocity.y = 0;
            } else {
                this.body.velocity.x = -this.game.rnd.integerInRange(10, 50);
                this.body.velocity.y = 0;
            }
        }

        this.health = this.getHealth();

        this.checkWorldBounds = true;
        this.events.onOutOfBounds.add(this.boundOut, this);

    };

    Zombie.prototype = Object.create(Phaser.Sprite.prototype);
    Zombie.prototype.constructor = Zombie;

    Zombie.id = 0;

    Zombie.prototype.update = function() {
        if (!this.alive) {
            this.destroy();
        }
    };

    Zombie.prototype.killZombie = function () {

        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
        if (this.health <= 0) {
            this.game.add.audio('audioZombieDead').play();
            this.inputEnabled = false;
            this.loadTexture('zombieDead');
            this.animations.add('zDead').play(7, false, true)
            .onComplete.add(function(){
                this.alive = false;
            }, this);

            this.state.amountZombiesDead += 1;
            this.state.punctuate(1);

        } else {
            this.game.add.audio('audioPuchZombie').play()
            .onStop.add(function (){
                this.health -= 1;
            }, this);
        }
    }

    Zombie.prototype.boundOut = function(zombie) {
        var pos = this.rand(true);
        this.x = pos.x;
        this.y = pos.y;
    };

    Zombie.prototype.getHealth = function() {

        if (this.state.stage > 1) {
            return 1;
        } else {
            return 0;
        }
    };

    Zombie.prototype.rand = function (wrap) {
        if (wrap) {
            var x = this.x < 0 ? 650 : -50;
        } else {
            var x = this.game.rnd.pick([-50, 650]);
        }
        var r = this.game.rnd.integerInRange(0, 5);
        var y = 162 + (400 - 162) / 5 * r;
        return {x: x, y:y};
    };

}(this));
