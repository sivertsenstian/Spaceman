define(['./base_entity'], function (BaseEntity) {

  return function (game_state, x, y, key, frame, properties) {
    BaseEntity.call(this, game_state, x, y, key, frame, properties);
    this.game_state = game_state;
    this.initialized = false;
  }
  .inherits(BaseEntity).
  extend({
    update: function() {
    }
  });

});