define
  (
  [
    'SS/platformer/state/base_state',
    './win_state'
  ],

  function (BaseState, WinState) {
    return function () { }
    .inherits(BaseState)
    .extend({
      create: function () {
        this.add.sprite(0, 0, 'mainmenu_background');
        this.wintext = this.add.text(this.game.width / 2, this.game.height / 4, "Course Cleared!", { font: "45px monospace", fill: "#fff" });
        this.wintext.anchor.setTo(0.5, 0.5);

        this.nextText = this.add.text(this.game.width / 6, (this.game.height / 3) + 100, "Next..", { font: "30px monospace", fill: "#00FF00" });
        this.nextText.anchor.setTo(0.5, 0.5);

        this.quitText = this.add.text(this.game.width / 4, (this.game.height / 3) + 100, "Quit", { font: "30px monospace", fill: "#FF0000" });
        this.quitText.anchor.setTo(0.5, 0.5);
      }
    })

  });