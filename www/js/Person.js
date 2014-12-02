(function(global) {

    var Person = global.Person = function(state) {

        this.state = state;
        this.game = state.game;

        var pos = this.rand();
        Phaser.Sprite.call(this, state.game, pos.x, pos.y, 'personDown');

        this.name = 'person ' + (pos.x < 0 ? 'right': 'left') + ' - ' + (++Person.id);
        this.animations.add('personWalkDown').play(10, true);
        this.game.physics.enable(this, Phaser.Physics.ARCADE);
        this.body.enable = true;
        this.body.setSize(30, 30);

        this.checkWorldBounds = true;
        this.events.onOutOfBounds.add(this.boundOut, this);
        // this.block = false;

        if (pos.x < 0) {
            this.body.velocity.x = this.game.rnd.integerInRange(10, 30);
            this.body.velocity.y = 0;
        } else {
            this.body.velocity.x = -this.game.rnd.integerInRange(10, 30);
            this.body.velocity.y = 0;
        }
    };

    Person.id = 0;

    Person.prototype = Object.create(Phaser.Sprite.prototype);
    Person.prototype.constructor = Person;

    Person.prototype.boundOut = function(person) {
        var pos = this.rand(true);
        this.x = pos.x;
        this.y = pos.y;
    };

    Person.prototype.killBy = function(zombie) {
        // zombie.kill();
        // zombie.exists = false;
        var vx = zombie.body.velocity.x;
        zombie.body.velocity.x = 0;
        zombie.exists = false;

        this.body.velocity.x = 0;

        this.state.amountPeople -= 1;
        this.state.amountPeopleMethod(this.state.amountPeople);

        this.loadTexture('zombieBitePerson');
        this.animations.add('zBitePerson')
        .play(4, false, true)
        .onComplete.add(function() {
            zombie.exists = true;
            zombie.body.velocity.x = vx;
            this.state.initZombies(this);
        }, this);
    };

    Person.prototype.rand = function (wrap) {
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
