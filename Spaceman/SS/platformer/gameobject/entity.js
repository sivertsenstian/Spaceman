//Init namespaces
var Phaser = Phaser || {};
var ss = ss || {};
ss.platformer = ss.platformer || {};
ss.platformer.gameobject = ss.platformer.gameobject || {};

(function () {
  "use strict";
  ss.platformer.gameobject.Entity = function (game, x, y, key, frame, properties) {
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

    },

    kill: function () {
      console.log("i dieded :(");
    },

    collide: function (entity) {

    }
  })
}());