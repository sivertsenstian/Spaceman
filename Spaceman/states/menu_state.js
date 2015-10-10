﻿define(
  [
    'SS/platformer/state/base_state',
    './play_state',
  ],

  function (BaseState, PlayState) {
    return function () { }
    .inherits(BaseState)
    .extend({
      create: function () {
        this.add.sprite(0, 0, 'mainmenu_background');

        this.timer = 0;
        this.titleText = this.add.text(this.game.width / 2, this.game.height / 4, "SPACEMAN", { font: "80px monospace", fill: "#fff" });
        this.titleText.anchor.setTo(0.5, 0.5);

        this.startText = this.add.text(this.game.width / 2, this.game.height / 3, "Press Enter to start", { font: "25px monospace", fill: "yellow" });
        this.startText.anchor.setTo(0.5, 0.5);

        this.enterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        this.enterKey.onDown.add(this.startGame, this);
      },

      update: function () {
        this.timer += this.game.time.elapsed;
        if (this.timer >= 500) {
          this.timer = 0;
          this.startText.visible = !this.startText.visible;
        }
      },

      startGame: function () {
        var level = this.game.cache.getJSON('level1');

        this.game.state.add('play', new PlayState(this.game, level));

        this.state.start('play');
      }
    })
  });