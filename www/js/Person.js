(function(global) {

    var Person = global.Person = function(state) {

        this.state = state;
        this.game = state.game;

        var pos = this.rand();
        var x = pos.x;
        var y = pos.y;
        
        /**
        //
        // The Intel XDK generated this code snippet for you
        //
        // To use it in your project, follow the
        //   instructions in comments below
        //

        // This code snippet demonstrates how to load atlas

        var game = ... // You know how to get this game object

        // TODO: add this line to your proload function
        game.load.atlas('person-', 'asset/spritesheets/person.png', 'asset/spritesheets/person.json');

        // TODO: add below lines to your create function
        var spriteAnimation = game.add.sprite(200, 200, 'person-');

        // Explanation of arguments:
        //   15: 15fps
        //   true: loop forever
        // TODO: change FPS/loop to your own value
        spriteAnimation.animations.add('person-', Phaser.Animation.generateFrameNames('person-', 5, 0, '.png', 0), 15, true);

        // Now play the animation
        spriteAnimation.animations.play('person-');

        // TODO: update the position in your update function
         */
        // SpriteSheets Person
        Phaser.Sprite.call(this, state.game, x, y, 'person');

        this.name = 'person ' + (pos.x < 0 ? 'right': 'left') + ' - ' + (++Person.id);
        this.animations.add('walking', Phaser.Animation.generateFrameNames('person-', 0, 5, '.png', 0), 10, true, false);
        this.animations.add('bite', Phaser.Animation.generateFrameNames('bite-', 0, 3, '.png', 0), 4, false, false);
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
        var x, y, r;
        if (wrap) {
            x = this.x < 0 ? 650 : -50;
        } else {
            x = this.game.rnd.pick([-50, 650]);
        }
        r = this.game.rnd.integerInRange(0, 5);
        y = 162 + (400 - 162) / 5 * r;
        return {x: x, y:y};
    };

}(this));
