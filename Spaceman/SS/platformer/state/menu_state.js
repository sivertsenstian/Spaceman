//Init namespaces
var Phaser = Phaser || {};
var ss = ss || {};
ss.platformer = ss.platformer || {};
ss.platformer.state = ss.platformer.state || {};

(function () {
  "use strict";
  ss.platformer.state.MenuState = function () { }
  .inherits(ss.platformer.state.BaseState)
  .extend({
    create: function () {
      this.loadingText = this.add.text(this.game.width / 2, this.game.height / 2, "Press Enter to start", { font: "20px monospace", fill: "#fff" });
      this.loadingText.anchor.setTo(0.5, 0.5);

      this.enterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

      this.enterKey.onDown.add(this.startGame, this);
    },

    startGame: function () {
      this.state.start('play');
    }
  });
}());