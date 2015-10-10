define(
  [
    'SS/platformer/factory',
    './friendly/spaceman',
    './hostile/slime',
    './hostile/snail',
    './hostile/fly'
  ],

  function (SSFactory, Spaceman, Slime, Snail, Fly) {

    return function (game, groups) {
      this.game = game;
      this.groups = {
        'entities': this.game.add.group()
      };

      for (var i = 0; i < groups.length; i++) {
        this.groups[group] = this.game.add.group();
      }
    }
      .inherits(SSFactory)
      .extend({
        createEntity: function (object) {
          switch (object.type) {
            case "player":
              this.player = new ss.platformer.gameobject.PlayerEntity(this.game, position.x, position.y, 'player');
              this.game.physics.arcade.enable(this.player);

              this.game.add.existing(this.player);
              this.player.animations.add("walking", [0, 1, 2, 1], 6, true);

              this.player.anchor.setTo(0.5, 0.5);
              this.player.body.bounce.y = 0.2;
              this.player.body.drag.set(250);
              this.player.body.maxVelocity.x = 300;
              this.player.body.collideWorldBounds = true;

              this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_PLATFORMER);

              this.entities.push(this.player);

              //prefab = new Platformer.Player(this, position, object.properties);
              break;

            case "slime":
              var slime = new ss.platformer.gameobject.EnemyEntity(this.game, position.x, position.y, 'slime');
              this.game.physics.arcade.enable(slime);

              this.game.add.existing(slime);
              slime.animations.add("walking", [0, 1, 0], 6, true);

              slime.animations.play("walking", true);

              slime.anchor.setTo(0.5, 0.5);
              slime.body.velocity.x = -25;
              slime.body.collideWorldBounds = true;

              this.entities.push(slime);
              this.enemies.push(slime);
              break;

            case "snail":
              var snail = new ss.platformer.gameobject.EnemyEntity(this.game, position.x, position.y, 'snail');
              this.game.physics.arcade.enable(snail);

              this.game.add.existing(snail);
              snail.animations.add("walking", [0, 1, 0], 6, true);

              snail.animations.play("walking", true);

              snail.anchor.setTo(0.5, 0.5);
              snail.body.velocity.x = -60;
              snail.body.collideWorldBounds = true;

              this.entities.push(snail);
              this.enemies.push(snail);
              break;

            case "fly":
              var fly = new ss.platformer.gameobject.EnemyEntity(this.game, position.x, position.y, 'fly');
              this.game.physics.arcade.enable(fly);

              this.game.add.existing(fly);
              fly.animations.add("walking", [0, 1, 0], 6, true);

              fly.animations.play("walking", true);

              fly.anchor.setTo(0.5, 0.5);
              fly.body.velocity.x = -60;
              fly.body.collideWorldBounds = true;
              fly.body.allowGravity = false;

              this.entities.push(fly);
              this.enemies.push(fly);
              break;
          }
        }
      })
  });