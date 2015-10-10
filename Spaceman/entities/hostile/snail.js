define(['SS/platformer/gameobject/movable_entity'], function (SSMoveableEntity) {

  return function (game, x, y, key, frame, properties) {
    SSMoveableEntity.call(this, game, x, y, key, frame, properties);
  }
  .inherits(SSMoveableEntity)
  .extend({

  }),

});