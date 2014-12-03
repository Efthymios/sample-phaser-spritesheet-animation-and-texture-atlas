(function(global) {

    var Person = global.Person = function(state) {

        this.state = state;
        this.game = state.game;

        var pos = this.rand();
        var x = pos.x;
        var y = pos.y;
        
        Phaser.Sprite.call(this, state.game, x, y, 'person');

        this.name = 'person ' + (pos.x < 0 ? 'right': 'left') + ' - ' + (++Person.id);
        this.animations.add('walking', [
            'person-0.png',
            'person-1.png',
            'person-2.png',
            'person-3.png',
            'person-4.png',
            'person-5.png'
            ], 10, true, false);
        this.animations.add('bite', [
            'bite-0.png',
            'bite-1.png',
            'bite-2.png',
            'bite-3.png'
            ], 4, false, false);
        this.animations.play('walking');
        this.game.physics.enable(this, Phaser.Physics.ARCADE);
        this.body.enable = true;
        this.body.setSize(30, 30);

        this.checkWorldBounds = true;
        this.events.onOutOfBounds.add(this.boundOut, this);

        if (x < 0) {
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

    Person.prototype.killPerson = function(zombie) {
        this.alive = false;
        zombie.exists = false;

        this.body.velocity.x = 0;

        this.state.amountPeopleMethod(-1);

        this.animations.play('bite', null, false, true)
        .onComplete.add(function() {
            zombie.exists = true;
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
