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
      
      if(!this.inCamera && this.initialized){
        this.kill();
      }      
            
      if (this.alive) {
        this.game_state.game.physics.arcade.collide(this, this.game_state.layers.terrain, this.hit_terrain);
        this.game_state.game.physics.arcade.collide(this, this.game_state.groups.neutral, null, null, this);
        this.game_state.game.physics.arcade.collide(this, this.game_state.groups.hostile, this.hit_hostile, null, this);
      }
    },
    
    hit_hostile: function (fireball, hostile) {
      hostile.kill();
      fireball.kill();
    },
    
    hit_terrain: function (fireball) {
      if(fireball.body.touching.left || fireball.body.touching.right || fireball.body.blocked.left || fireball.body.blocked.right){
        fireball.kill();
      }
    },

    kill: function () {
      if (this.alive) {
        this.alive = false;
        this.owner.projectiles--;
        this.game_state.game.time.events.add(1000, function () {
          this.destroy();
          this.game_state.groups[this.entityType].remove(this);
        }, this);
      }
    }
  })
});