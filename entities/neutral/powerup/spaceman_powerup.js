﻿define(['SS/platformer/gameobject/movable_entity'], function (SSMovableEntity) {
  return function (game_state, x, y, key, frame, properties) {
    properties = properties || {};

    this.properties = {
      pwr_health: parseInt(properties.pwr_health, 10) || 1,
      pwr_texture: properties.pwr_texture || 'player_small'
    };
    SSMovableEntity.call(this, game_state, x, y, key, frame, properties);
    this.interactive = true;
  }
  .inherits(SSMovableEntity)
  .extend({
    update: function () {
      this.game_state.game.physics.arcade.collide(this, this.game_state.layers.terrain);
      this.game_state.game.physics.arcade.collide(this, this.game_state.groups.friendly, null, function () { return false; }, this);
    },

    interact: function (spaceman) {
      //this.game_state.game.paused = true;
      spaceman.use_powerup(this);
      //this.game_state.game.time.events.add(1000, function () {
      //  this.game_state.game.paused = false;
      //}, this);

    },

    kill: function () {
      if (this.alive) {
        this.alive = false;
        this.destroy();
        this.game_state.groups[this.entityType].remove(this);
      }
    }
  })
});