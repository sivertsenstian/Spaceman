define(['SS/platformer/gameobject/movable_entity'], function (SSMovableEntity) {
  return function (game_state, x, y, key, frame, properties) {
    this.properties = properties || {};
    SSMovableEntity.call(this, game_state, x, y, key, frame, properties);
    this.interactive = true;
  }
  .inherits(SSMovableEntity)
  .extend({
    update: function () {
      this.game_state.game.physics.arcade.collide(this, this.game_state.layers.terrain, this.hit_terrain, null, this);
      this.game_state.game.physics.arcade.collide(this, this.game_state.groups.friendly, null, function () { return false; }, this);
      this.game_state.game.physics.arcade.collide(this, this.game_state.groups.neutral, null, null, this);
    },

    interact: function (spaceman) {
      spaceman.use_powerup(this);
    },

    kill: function () {
      if (this.alive) {
        this.alive = false;
        this.destroy();
        this.game_state.groups[this.entityType].remove(this);
      }
    },
    
    hit_terrain: function (entity) {
        if (entity.body.blocked.left) {
          entity.body.velocity.x = this.speed;
        } else if (entity.body.blocked.right) {
          entity.body.velocity.x = -this.speed;
        }
    }
    
  })
});