define(['./spaceman_powerup'], function (SpacemanPowerup) {

  return function (game_state, x, y, key, frame, properties) {
      
    //default properties
    properties = properties || {};
    properties.name = properties.name || "mushroom";
    properties.pwr_health = properties.pwr_health || 2;
    properties.pwr_texture = properties.pwr_texture || "player_normal";
    properties.speed = properties.speed || 150;
    
    SpacemanPowerup.call(this, game_state, x, y, key, frame, properties);
    this.game_state.game.add.existing(this);

    this.game_state.game.physics.arcade.enable(this);
    this.animations.add("idle",
        [
            'gemBlue'
        ],
        1,
        true);
    this.animations.play('idle');
    this.anchor.setTo(.5, 0.5);
    this.body.bounce.y = 0.2;
    this.body.allowGravity = true;
    this.body.setSize(32, 32);
    this.body.velocity.x = this.speed;
  }
  .inherits(SpacemanPowerup)
  .extend({
  })
});