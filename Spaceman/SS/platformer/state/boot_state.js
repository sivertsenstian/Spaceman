//Init namespaces
var Phaser = Phaser || {};
var ss = ss || {};
ss.platformer = ss.platformer || {};
ss.platformer.state = ss.platformer.state || {};

(function () {
  "use strict";
  ss.platformer.state.BootState = function () {}
  .inherits(ss.platformer.state.BaseState)
  .extend({
    preload: function () {
      //PLUGINS
      this.game.add.plugin(Phaser.Plugin.Debug);
    },

    create: function () {
      this.game.state.start('load');
    }
  });
}());