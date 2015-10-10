define(['Phaser', 'SS/utils/extend'], function (Phaser, extend) {

  return function (game, x, y, key, frame, properties) {
    properties = properties || {};
    Phaser.Sprite.call(this, game, x, y, key, frame);

    for (var key in properties) {
      if (params.hasOwnProperty(key)) {
        this[key] = properties[key];
      }
    }
  }
  .inherits(Phaser.Sprite)
  .extend({
    update: function () {

    }
  })

});