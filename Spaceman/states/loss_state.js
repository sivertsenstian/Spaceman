define
  (
  [
    'SS/platformer/state/base_state',
    './load_state'
  ],

  function (BaseState, LoadState) {
    return function () { }
    .inherits(BaseState)
    .extend({
      create: function () {
        this.diedtext = this.add.text(this.game.width / 2, this.game.height / 2, ":( YOU DIEDED!11", { font: "40px monospace", fill: "#fff" });
        this.diedtext.anchor.setTo(0.5, 0.5);

        this.retrytext = this.add.text(this.game.width / 2, (this.game.height / 2) + 100, "Press Enter to restart", { font: "20px monospace", fill: "#fff" });
        this.retrytext.anchor.setTo(0.5, 0.5);

        this.enterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

        this.enterKey.onDown.add(this.startGame, this);
      },

      startGame: function () {
        var level = this.game.cache.getJSON('level1');
        this.game.state.add('load', new LoadState(level));
        this.state.start('load');
      }
    })

  });