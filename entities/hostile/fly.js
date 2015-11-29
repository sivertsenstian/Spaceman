define(['SS/platformer/gameobject/movable_entity'], function (SSMoveableEntity) {

  return function (game_state, x, y, key, frame, properties) {
    SSMoveableEntity.call(this, game_state, x, y, key, frame, properties);
    this.game_state.game.add.existing(this);

    this.game_state.game.physics.arcade.enable(this);
    this.animations.add("move",
        [
            'fly',
            'fly_dead'
        ],
        4,
        true);

    this.animations.add('die',
      [
      'fly_move'
      ], 2, false);

    this.initialized = false;
    this.speed = this.speed || 100;
    this.position = { x: x, y: y };
    this.animations.play("move", true);
    this.anchor.setTo(0.5, 0.5);
    this.body.setSize(32, 32);
    this.body.allowGravity = false;
    this.body.immovable = true;
  }
  .inherits(SSMoveableEntity)
  .extend({
    init: function () {
      this.initialized = true;
      this.body.velocity.x = -this.speed;
    },
    
    update: function () {
      if(this.inCamera && !this.initialized){
        this.init();
      }      
      if (this.alive) {
        this.game_state.game.physics.arcade.collide(this, this.game_state.layers.terrain);
        this.game_state.game.physics.arcade.collide(this, this.game_state.groups.hostile, null, function () { return false; }, this);
      }
    },

    kill: function () {
      if (this.alive) {
        this.alive = false;
        this.animations.play("die", true);
        this.body.allowGravity = true;
        this.game_state.game.time.events.add(1000, function () {
          this.destroy();
          this.game_state.groups[this.entityType].remove(this);
        }, this);
      }
    }
  })
});