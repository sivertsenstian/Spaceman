define(
  [
    'SS/platformer/factory',
    './friendly/spaceman',
    './hostile/slime',
    './hostile/snail',
    './hostile/fly'
  ],

  function (SSFactory, Spaceman, Slime, Snail, Fly) {

    return function (game_state) {
      this.game_state = game_state;
    }
      .inherits(SSFactory)
      .extend({
        create: function (object) {
          var entity;
          switch (object.type) {
            case "player":
              entity = new Spaceman(this.game_state, object.x, object.y, 'player');
              this.game_state.groups.all.add(entity);
              this.game_state.groups.friendly.add(entity);
              break;

            case "slime":
              entity = new Slime(this.game_state, object.x, object.y, 'slime');
              this.game_state.groups.all.add(entity);
              this.game_state.groups.hostile.add(entity);
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