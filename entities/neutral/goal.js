define(['SS/platformer/gameobject/static_entity'], function (SSStaticEntity) {

  return function (game_state, x, y, key, frame, properties) {
    SSStaticEntity.call(this, game_state, x, y, key, frame, properties);
    this.game_state.game.add.existing(this);
    this.game_state.game.physics.arcade.enable(this);
    this.body.allowGravity = false;
    this.body.setSize(this.width, this.height);
  }
  .inherits(SSStaticEntity)
  .extend({
    update: function () {
    },

    kill: function (interactor) {
      this.game_state.state.start('win');
    }
  })
});