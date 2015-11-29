define(['SS/platformer/gameobject/static_entity'], function (SSStaticEntity) {

  return function (game_state, x, y, key, frame, properties) {
    SSStaticEntity.call(this, game_state, x, y, key, frame, properties);
    this.game_state.game.add.existing(this);

    this.game_state.game.physics.arcade.enable(this);
    this.animations.add("idle",
        [
            'coinGold'
        ],
        1,
        true);
    this.animations.play('idle');
    this.anchor.setTo(.5, .5);
    this.body.setSize(32, 32);
    this.body.allowGravity = false;
  }
  .inherits(SSStaticEntity)
  .extend({
    update: function () {
      this.game_state.game.physics.arcade.collide(this, this.game_state.groups.friendly, null, function () { return false; }, this);
    },

    kill: function () {
      if (this.alive) {
        this.game_state.coins += 1;
        this.alive = false;
        this.destroy();
        this.game_state.groups[this.entityType].remove(this);
      }
    },
    
    tweenComplete: function () {
      this.kill();
    }
    
  })
});