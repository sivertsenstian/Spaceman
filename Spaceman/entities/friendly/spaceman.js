define(['SS/platformer/gameobject/movable_entity'], function (SSMoveableEntity) {

  return function (game_state, x, y, key, frame, properties) {
    SSMoveableEntity.call(this, game_state, x, y, key, frame, properties);

    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.jumptimer = 0;
  }
  .inherits(SSMoveableEntity)
  .extend({
    update: function () {
      this.game_state.game.physics.arcade.collide(this, this.game_state.layers.terrain);
      this.game_state.game.physics.arcade.collide(this, this.game_state.groups.hostile, this.hit_hostile, null, this);
      this.game_state.game.physics.arcade.collide(this, this.game_state.groups.item, this.hit_item, null, this);
    },

    kill: function () {
      console.log("spaceman died..");
    },

    hit_hostile: function () {
      console.log("COLLISION WITH HOSTILE!");
    },

    hit_item: function () {
      console.log("COLLISION WITH ITEM!");
    }
  }),

});