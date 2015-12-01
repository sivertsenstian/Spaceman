define(['SS/platformer/gameobject/movable_entity'], function (SSMoveableEntity) {

  return function (game_state, x, y, key, frame, properties) {
    SSMoveableEntity.call(this, game_state, x, y, key, frame, properties);
    this.game_state.game.add.existing(this);

    this.game_state.game.physics.arcade.enable(this);
    this.animations.add("move",
        [
            'fireball'
        ],
        1,
        true);

    this.initialized = false;
    this.speed = this.speed || 400;
    this.position = { x: x, y: y };
    this.animations.play("move", true);
    this.anchor.setTo(0.5, 0.5);
    this.body.bounce.y = 1.0;
    this.body.setSize(5, 5);
    this.body.allowGravity = true;    
    
    this.tween = this.game_state.game.add.tween(this).to( { angle: 360 }, 500, Phaser.Easing.Linear.None, true).loop(true);
    this.tween.start();
  }
  .inherits(SSMoveableEntity)
  .extend({
    init: function () {
      this.initialized = true;
      this.body.velocity.x = this.speed * this.direction;
    },
    
    update: function () {
      if(this.inCamera && !this.initialized){
        this.init();
      }      
      if (this.alive) {
        this.game_state.game.physics.arcade.collide(this, this.game_state.layers.terrain);
        this.game_state.game.physics.arcade.collide(this, this.game_state.groups.neutral, null, null, this);
        this.game_state.game.physics.arcade.collide(this, this.game_state.groups.hostile, null, null, this);
      }
    },

    kill: function () {
      if (this.alive) {
        this.alive = false;
        this.game_state.game.time.events.add(1000, function () {
          this.destroy();
          this.game_state.groups[this.entityType].remove(this);
        }, this);
      }
    }
  })
});