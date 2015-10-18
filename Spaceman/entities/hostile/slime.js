define(['SS/platformer/gameobject/movable_entity'], function (SSMoveableEntity) {

  return function (game_state, x, y, key, frame, properties) {
    SSMoveableEntity.call(this, game_state, x, y, key, frame, properties);
    this.game_state.game.add.existing(this);

    this.game_state.game.physics.arcade.enable(this);
    this.animations.add("move",
        [
            'slimeGreen',
            'slimeGreen_move'
        ],
        2,
        true);

    this.animations.add('die',
      [
      'slimeGreen_hit'
      ], 2, false);

    this.animations.play("move");
    this.position = { x: x, y: y};
    this.anchor.setTo(.5, 1);
    this.body.setSize(50, 20);

    this.body.velocity.x = -this.speed;
  }
  .inherits(SSMoveableEntity)
  .extend({
    update: function () {
      this.game_state.game.physics.arcade.collide(this, this.game_state.layers.terrain);
      this.game_state.game.physics.arcade.collide(this, this.game_state.groups.hostile, null, function () { return false; }, this);
  
      //this.body.velocity.x = this.inCamera ? -this.speed : 0;
      
    },

    kill: function () {
      if (this.alive) {
        this.alive = false;
        this.animations.play("die", true);
        this.body.enable = false;
        this.game_state.game.time.events.add(1000, function () {
          this.destroy();
          this.game_state.groups[this.entityType].remove(this);
        }, this);
      }
    }
  })
});