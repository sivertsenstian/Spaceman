define(['Phaser', 'SS/utils/extend'], function (Phaser, extend) {

  return function (game_state, x, y, key, frame, properties) {
    properties = properties || {};
    Phaser.Sprite.call(this, game_state.game, x, y, key, frame);

    for (var key in properties) {
      if (properties.hasOwnProperty(key)) {
        if (!isNaN(parseInt(properties[key], 10))) {
          this[key] = parseInt(properties[key]);
        } else {
          this[key] = properties[key];
        }
      }
    }
  }
  .inherits(Phaser.Sprite)
  .extend({
    update: function () {

    }
  })

});