define(['./base_entity'], function (BaseEntity) {

  return function (game, x, y, key, frame, properties) {
    BaseEntity.call(this, game, x, y, key, frame, properties);
  }
  .inherits(BaseEntity);

});