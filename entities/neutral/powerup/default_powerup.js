define(['./spaceman_powerup'], function (SpacemanPowerup) {

  return function (game_state, x, y, key, frame, properties) {
    //default properties
    properties = properties || {};
    properties.name = "default";
    properties.priority = 0;
    properties.pwr_health = 1;
    properties.pwr_texture = "player_small";
    properties.pwr_invincible = true;
    
    SpacemanPowerup.call(this, game_state, x, y, key, frame, properties);
  }
  .inherits(SpacemanPowerup)
  .extend({
  })
});