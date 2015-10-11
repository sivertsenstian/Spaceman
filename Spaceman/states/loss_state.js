﻿define(['SS/platformer/state/base_state'], function (BaseState) {

  return function () { }
  .inherits(BaseState)
  .extend({
    create: function () {
      this.diedtext = this.add.text(this.game.width / 2, this.game.height / 2, ":( YOU DIEDED!11", { font: "20px monospace", fill: "#fff" });
      this.diedtext.anchor.setTo(0.5, 0.5);

      this.retrytext = this.add.text(this.game.width / 2, (this.game.height / 2) + 100, "Press Enter to restart", { font: "10px monospace", fill: "#fff" });
      this.retrytext.anchor.setTo(0.5, 0.5);

      this.enterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

      this.enterKey.onDown.add(this.startGame, this);
    },

    startGame: function () {
      this.game.state.restart(true, false);
    }
  })

});