define(['SS/platformer/gameobject/movable_entity'], function (SSMoveableEntity) {

  return function (game_state, x, y, key, frame, properties) {
    SSMoveableEntity.call(this, game_state, x, y, key, frame, properties);
    this.game_state.game.add.existing(this);
    this.game_state.game.physics.arcade.enable(this);
    this.animations.add("move",
       [
           'snail',
           'snail_move'
       ],
       2,
       true);

    this.animations.add('die',
      [
      'snail_shell'
      ], 2, false);

    this.position = { x: x, y: y };
    this.SHELL_MODE = false;
    this.interactive = true;
    this.animations.play("move", true);
    this.anchor.setTo(0.5, 0.5);
    this.shell_speed = this.body.maxVelocity.x = 400;
    this.body.setSize(50, 36);

    this.body.velocity.x = -this.speed;
  }
  .inherits(SSMoveableEntity)
  .extend({
    update: function () {
      this.game_state.game.physics.arcade.collide(this, this.game_state.layers.terrain, this.hit_terrain, null, this);
      this.game_state.game.physics.arcade.collide(this, this.game_state.groups.hostile, this.hit_hostile, function () { return this.SHELL_MODE && this.moving; }, this);
    },

    hit_terrain: function (snail) {
      if (snail.SHELL_MODE) {
        if (snail.body.blocked.left) {
          snail.body.velocity.x = this.shell_speed;
        } else if (snail.body.blocked.right) {
          snail.body.velocity.x = -this.shell_speed;
        }
      }
    },

    hit_hostile: function (snail, hostile) {
      if (snail.SHELL_MODE && snail.moving) {
        hostile.kill();
        snail.body.velocity.x = snail.body.touching.right ? snail.shell_speed : -snail.shell_speed;
      }
    },

    interact: function () {
      this.body.velocity.x = this.body.touching.left ? this.shell_speed : -this.shell_speed;
      this.moving = true;
    },

    kill: function () {
      if (this.alive) {
        this.alive = false;
        this.moving = false;
        this.animations.play("die", true);
        this.body.setSize(40, 30);
        this.SHELL_MODE = true;
        this.body.velocity.x = 0;
      }
    }
  })
});