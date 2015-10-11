define(['SS/platformer/gameobject/movable_entity'], function (SSMoveableEntity) {

  return function (game_state, x, y, key, frame, properties) {
    SSMoveableEntity.call(this, game_state, x, y, key, frame, properties);
    this.game_state.game.add.existing(this);

    this.game_state.game.physics.arcade.enable(this);
    this.animations.add("walking", [0, 1, 0], 6, true);
    this.animations.play("walking", true);
    this.anchor.setTo(0.5, 0.5);
    this.body.velocity.x = -this.speed;
    this.body.collideWorldBounds = true;
    this.body.allowGravity = false;
  }
  .inherits(SSMoveableEntity)
  .extend({
    update: function () {
      this.game_state.game.physics.arcade.collide(this, this.game_state.layers.terrain);
      this.game_state.game.physics.arcade.collide(this, this.game_state.groups.neutral, this.hit_neutral, null, this);
    },

    hit_neutral: function () {
      console.log("HIT NEUTRAL");
    }
  })
});