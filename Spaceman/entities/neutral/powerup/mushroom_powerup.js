define(['./spaceman_powerup'], function (SpacemanPowerup) {

  return function (game_state, x, y, key, frame, properties) {
    SpacemanPowerup.call(this, game_state, x, y, key, frame, properties);
    this.game_state.game.add.existing(this);

    this.game_state.game.physics.arcade.enable(this);
    this.animations.add("idle",
        [
            'hudJewel_blue'
        ],
        1,
        true);
    this.animations.play('idle');
    this.anchor.setTo(.5, 0.5);
    this.body.bounce.y = 0.2;
    this.body.allowGravity = true;
    this.body.setSize(40, 40);
    this.body.velocity.x = this.speed;
  }
  .inherits(SpacemanPowerup)
  .extend({
  })
});