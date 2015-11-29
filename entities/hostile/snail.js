define(['SS/platformer/gameobject/movable_entity'], function (SSMoveableEntity) {

  return function (game_state, x, y, key, frame, properties) {
    SSMoveableEntity.call(this, game_state, x, y, key, frame, properties);
    this.game_state.game.add.existing(this);
    this.game_state.game.physics.arcade.enable(this);
    this.animations.add("move",
       [
           'snail',
           'snail_move'
       ],
       2,
       true);

    this.animations.add('die',
      [
      'snail_shell'
      ], 2, false);

    this.initialized = false;
    this.speed = this.speed || 60;
    this.position = { x: x, y: y };
    this.SHELL_MODE = false;
    this.interactive = true;
    this.animations.play("move", true);
    this.anchor.setTo(0.5, 0.5);
    this.shell_speed = this.body.maxVelocity.x = 400;
    this.body.setSize(50, 36);
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
      this.game_state.game.physics.arcade.collide(this, this.game_state.layers.terrain, this.hit_terrain, null, this);
      this.game_state.game.physics.arcade.collide(this, this.game_state.groups.hostile, this.hit_hostile, function () { return this.SHELL_MODE && this.moving; }, this);
    },

    hit_terrain: function (snail) {
      if (snail.body.blocked.left) {
        snail.body.velocity.x = snail.SHELL_MODE ? this.shell_speed : this.speed;
        this.scale = -1;
      } else if (snail.body.blocked.right) {
        snail.body.velocity.x = snail.SHELL_MODE ? -this.shell_speed : -this.speed;
        this.scale = 1;
      }
    },

    hit_hostile: function (snail, hostile) {
      if (snail.SHELL_MODE && snail.moving) {
        hostile.kill();
        snail.body.velocity.x = snail.body.touching.right ? snail.shell_speed : -snail.shell_speed;
      }
    },

    interact: function (spaceman) {
      if(this.SHELL_MODE && this.moving){
        spaceman.interact(spaceman, this);
      } else {
        this.body.velocity.x = this.body.touching.left ? this.shell_speed : -this.shell_speed;
        this.moving = true;
      }  
    },

    kill: function () {
      if (this.alive || this.moving) {
        this.alive = false;
        this.moving = false;
        this.animations.play("die", true);
        this.SHELL_MODE = true;
        this.body.setSize(40, 30);
        this.body.immovable = false;
        this.body.velocity.x = 0;
      }
    }
  })
});