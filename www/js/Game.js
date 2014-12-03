(function(global) {

    var Game = global.Game = function(game) {};

    Game.prototype.create = function() {
        this.createGame = true;
        this.amountZombies = 0;
        
        // Scenario
        this.spriteCenario = this.game.add.sprite(0, 0, 'cenario');

        // Background music
        this.soundGame = this.game.add.audio('audioBackGroundGame', 1, true);
        this.soundGame.play();
        
        // Target
        this.target = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'target');
        this.target.anchor.setTo(0.5, 0.5);
        this.target.z = 1;
        this.groupGame = this.game.add.group();
        this.groupGame.enableBody = true;
        this.groupGame.physicsBodyType = Phaser.Physics.ARCADE;
        this.groupGame.add(this.target);

        // Score
        this.score = 0;
        this.spriteScore = this.game.add.sprite(25, 0, 'score');
        this.scoreText = this.game.add.text(151, 28, this.score, {
            font: '25px arcade_normalregular',
            fill: '#ffffff',
            align: 'right'
        });
        
        // Round
        this.stage = 0;
        this.spriteRound = this.game.add.sprite(625, 0, 'round');
        this.roundText = this.game.add.text(751, 28, this.stage, {
            font: '25px arcade_normalregular',
            fill: '#ffffff',
            align: 'right'
        });
        
        // People
        this.amountPeople = 0;
        this.spriteAmountPeople = this.game.add.sprite(325, 0, 'amountPeople');
        this.amountPeopleText = this.game.add.text(400, 17, this.amountPeople, {
            font: '25px arcade_normalregular',
            fill: '#ffffff',
            align: 'right'
        });
    };

    Game.prototype.update = function() {
        this.hit();
        if (this.gameOver()) {
            return;
        }
        this.updateRound();
        this.updateTarget();
        this.groupGame.sort('y', Phaser.Group.SORT_ASCENDING);
    };

    Game.prototype.punctuate = function() {
        this.amountZombies -= 1;
        this.score += 1;
        this.scoreText.setText(this.score);
        if (this.score > 9) {
            this.scoreText.x = 127;
        } else if (this.score > 99) {
            this.scoreText.x = 103;
        } else if (this.score > 999) {
            this.scoreText.x = 89;
        }
    };

    Game.prototype.stageMethod = function() {
        this.roundText.setText(++this.stage);
        if (this.stage > 9) {
            this.roundText.x = 727;
        } else if (this.stage > 99) {
            this.roundText.x = 703;
        }
    };

    Game.prototype.amountPeopleMethod = function(amountPeople) {
        this.amountPeopleText.setText(this.amountPeople += amountPeople);
        if (this.amountPeople > 9) {
            this.amountPeopleText.x = 424;
        } else if (this.amountPeople > 9) {
            this.amountPeopleText.x = 448;
        }
    };

    Game.prototype.gameOver = function() {
        this.game.lastScore = this.score;
        this.game.lastRound = this.stage;
        if (this.amountPeople === 0 && !this.createGame) {
            this.soundGame.stop();
            this.game.state.start('gameover');
            return true;
        }
        return false;
    };

    Game.prototype.hit = function() {
        this.game.physics.arcade.overlap(this.groupGame, this.groupGame, this.collisionHandler, null, this);
    };
    
    Game.prototype.collisionHandler = function(obj1, obj2) {
        if (obj1 instanceof Person && obj2 instanceof Zombie) {
            var person = obj1;
            var zombie = obj2;
        } else if (obj1 instanceof Zombie && obj2 instanceof Person) {
            var person = obj2;
            var zombie = obj1;
        } else {
            return;
        }
        
        if (person.alive) {
            person.killPerson(zombie);
        }
    };

    Game.prototype.initPeople = function() {
        var person = new Person(this);
        this.groupGame.add(person);
        this.amountPeopleMethod(1);
        this.createGame = false;
    };

    Game.prototype.initZombies = function(person) {
        var zombie = new Zombie(this, person);
        this.groupGame.add(zombie);
        this.createGame = false;
        if (person) {
            this.amountZombies += 1;
        }
    };

    Game.prototype.updateRound = function() {
        if (this.amountZombies === 0) {
            this.stageMethod();
            this.amountZombies = this.stage * 4;
            this.game.time.events.repeat(Phaser.Timer.SECOND * 2, 5, this.initPeople, this);
            this.game.time.events.repeat(Phaser.Timer.SECOND * 4, this.amountZombies, this.initZombies, this);
        }
    };

    Game.prototype.updateTarget = function() {
        this.target.x = this.game.input.x;
        this.target.y = this.game.input.y;
    };

}(this));
