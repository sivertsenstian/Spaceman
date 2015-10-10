//Init namespaces
var Phaser = Phaser || {};
var ss = ss || {};
ss.platformer = ss.platformer || {};
ss.platformer.gameobject = ss.platformer.gameobject || {};

(function () {
  "use strict";
  ss.platformer.gameobject.MovableEntity = function (game, x, y, key, frame, properties) {
    ss.platformer.gameobject.Entity.call(this, game, x, y, key, frame, properties);
  }
  .inherits(ss.platformer.gameobject.Entity);
}());