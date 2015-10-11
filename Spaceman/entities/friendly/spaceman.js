define(['SS/platformer/gameobject/movable_entity'], function (SSMoveableEntity) {

  return function (game_state, x, y, key, frame, properties) {
    SSMoveableEntity.call(this, game_state, x, y, key, frame, properties);
    this.game_state.physics.arcade.enable(this);
    this.animations.add("walk",
        [
            'walk/p2_walk01',
            'walk/p2_walk02',
            'walk/p2_walk03',
            'walk/p2_walk04',
            'walk/p2_walk05',
            'walk/p2_walk06',
            'walk/p2_walk07',
            'walk/p2_walk08',
            'walk/p2_walk09',
            'walk/p2_walk10',
            'walk/p2_walk11'
        ],
        20,
      true);

    this.anchor.setTo(0.5, 0.5);
    this.body.bounce.y = 0.2;
    this.body.drag.set(250);
    this.body.maxVelocity.x = 300;
    this.body.collideWorldBounds = true;
    this.game_state.game.camera.follow(this, Phaser.Camera.FOLLOW_PLATFORMER);
    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.jumptimer = 0;

    this.game_state.game.add.existing(this);
  }
  .inherits(SSMoveableEntity)
  .extend({
    update: function () {
      this.game_state.game.physics.arcade.collide(this, this.game_state.layers.terrain);
      this.game_state.game.physics.arcade.collide(this, this.game_state.groups.hostile, this.hit_hostile, null, this);
      this.game_state.game.physics.arcade.collide(this, this.game_state.groups.neutral, this.hit_neutral, null, this);

      //player is on the ground, so he is allowed to start a jump
      if (this.cursors.up.isDown && this.body.blocked.down) {   //player is on the ground, so he is allowed to start a jump
        this.jumptimer = this.game_state.game.time.elapsed;
        this.body.velocity.y = -this.jumpSpeed;
      } else if (this.cursors.up.isDown && (this.jumptimer !== 0)) { //player is no longer on the ground, but is still holding the jump key
        if (this.jumptimer > 300) { // player has been holding jump for over 600 millliseconds, it's time to stop him
          this.jumptimer = 0;
        } else { // player is allowed to jump higher, not yet 600 milliseconds of jumping
          this.jumptimer += this.game_state.game.time.elapsed;
          this.body.velocity.y = -this.jumpSpeed;
        }
      } else if (this.jumptimer !== 0) { //reset jumptimer since the player is no longer holding the jump key
        this.jumptimer = 0;
      }

      if (this.cursors.left.isDown) {
        this.body.velocity.x -= this.walkSpeed;
        this.scale.x = -1;
        this.animations.play("walk");
      }
      else if (this.cursors.right.isDown) {
        this.body.velocity.x += this.walkSpeed;
        this.scale.x = 1;
        this.animations.play("walk");
      }

      if (this.body.velocity.x === 0) {
        this.animations.stop();
      }
    },

    kill: function () {
      console.log("spaceman died..");
    },

    hit_hostile: function () {
      console.log("COLLISION WITH HOSTILE!");
    },

    hit_neutral: function () {
      console.log("COLLISION WITH NEUTRAL!");
    }
  })
});