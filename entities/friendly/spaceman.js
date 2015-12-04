define(
  [
    'SS/platformer/gameobject/movable_entity',
    'entities/neutral/powerup/default_powerup',
  ],
  function (SSMoveableEntity, DefaultPowerup) {

    return function (game_state, x, y, key, frame, properties) {
      SSMoveableEntity.call(this, game_state, x, y, key, frame, properties);
      this.game_state.game.add.existing(this);

      this.game_state.game.physics.arcade.enable(this);
      this.animations.add("walk",
          [
              'alienBlue_walk1',
              'alienBlue_walk2'
          ],
          10,
          true);
      this.animations.add("idle",
          [
              'alienBlue_front',
              'alienBlue_stand',
              'alienBlue_front'
          ],
          1,
          true);

      this.animations.add("jump",
      [
          'alienBlue_jump',
      ],
      1,
      true);
      this.default_spaceman = new DefaultPowerup(this.game_state);
      
      this.walkSpeed = this.walkSpeed || 10;
      this.jumpSpeed = this.jumpSpeed || 290;
      
      this.invincible = false;
      this.invincible_time = 0;
      this.default_invincible_time = 1500;
      this.default_spaceman.interact(this);

      this.anchor.setTo(0.5, 0.5);
      this.body.bounce.y = 0.0;
      this.body.drag.set(250);
      this.body.maxVelocity.x = 300;
      this.body.collideWorldBounds = true;
      this.game_state.game.camera.follow(this, Phaser.Camera.FOLLOW_PLATFORMER, {x: 0, y: 700});
      this.cursors = this.game.input.keyboard.createCursorKeys();
      this.jumptimer = 0;
      
      
        //TEST TOUCH
        this.game_state.game.input.addPointer();
        // create our virtual game controller buttons
        var buttonA = this.game.add.button(1050, 640, 'ui', null, this, "buttonA", "buttonA", "buttonA", "buttonA");
        buttonA.fixedToCamera = true;
        buttonA.events.onInputDown.add(function(){ this.cursors.up.isDown = true;}, this);
        buttonA.events.onInputUp.add(function(){ this.cursors.up.isDown = false;}, this);
        
        var buttonB = this.game.add.button(1150, 640, 'ui', null, this, "buttonB", "buttonB", "buttonB", "buttonB");
        buttonB.fixedToCamera = true;
        
        var buttonRight = this.game.add.button(160, 650, 'ui', null, this, "buttonRight", "buttonRight", "buttonRight", "buttonRight");
        buttonRight.fixedToCamera = true;
        //buttonRight.events.onInputOver.add(function(){right=true;});
        //buttonRight.events.onInputOut.add(function(){right=false;});
        buttonRight.events.onInputDown.add(function(){ this.cursors.right.isDown = true;}, this);
        buttonRight.events.onInputUp.add(function(){ this.cursors.right.isDown = false;}, this);
        
        var buttonLeft = this.game.add.button(0, 650, 'ui', null, this, "buttonLeft", "buttonLeft", "buttonLeft", "buttonLeft");
        buttonLeft.fixedToCamera = true;
        buttonLeft.events.onInputDown.add(function(){ this.cursors.left.isDown = true;}, this);
        buttonLeft.events.onInputUp.add(function(){ this.cursors.left.isDown = false;}, this);
        
        //END TEST TOUCH
      
      //Attackmode - default to false
      this.attack = false;
      this.projectiles = 0;
      this.projectile_limit = 3;
      this.attackKey = this.game_state.game.input.keyboard.addKey(Phaser.Keyboard.D);
      this.attackKey.onDown.add(function () {
        if(this.attack && this.projectiles < this.projectile_limit){
          this.projectiles++;
          this.game_state.entityFactory.create({
                    type: 'fireball', 
                    x: this.x + ( 5 * this.scale.x), 
                    y: this.y,
                    properties: {
                      direction: this.scale.x,
                      owner: this
                    }
                },
                    'friendly'
                );
        }
      }, this);
      
    }
    .inherits(SSMoveableEntity)
    .extend({
      update: function () {
        this.game_state.game.physics.arcade.collide(this, this.game_state.layers.terrain);
        this.game_state.game.physics.arcade.collide(this, this.game_state.groups.hostile, this.hit_hostile, null, this);
        this.game_state.game.physics.arcade.collide(this, this.game_state.groups.neutral, this.hit_block, this.process_neutral, this);

        if (this.bottom >= this.game_state.world.height) {
          this.kill();
        }

        //player is on the ground, so he is allowed to start a jump
        if (this.cursors.up.isDown && (this.body.blocked.down || this.body.touching.down)) {   //player is on the ground, so he is allowed to start a jump
          this.animations.play("jump");
          this.jumptimer = this.game_state.game.time.elapsed;
          this.body.velocity.y = -this.jumpSpeed;
        } else if (this.cursors.up.isDown && (this.jumptimer !== 0)) { //player is no longer on the ground, but is still holding the jump key
          this.animations.play("jump");
          if (this.jumptimer > 250) { // player has been holding jump for over x millliseconds, it's time to stop him
            this.jumptimer = 0;
          } else { // player is allowed to jump higher, not yet 600 milliseconds of jumping
            this.jumptimer += this.game_state.game.time.elapsed;
            this.body.velocity.y = -this.jumpSpeed*2;
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
          this.animations.play("idle");
        }

        if (this.invincible) {
          this.invincible_time -= this.game_state.game.time.elapsed;
          this.invincible = this.invincible_time > 0;
          this.visible = !this.visible;
        } else {
          this.visible = true;
        }
      },

      kill: function () {
        this.game_state.restart();
      },

      hit_hostile: function (player, hostile) {
        if (hostile.alive) {
          this.interact(player, hostile);
        } else if (hostile.interactive) {
          hostile.interact(this);
        }
      },
      
      interact: function(player, hostile) {
        if (hostile.body.touching.up) {
            hostile.kill();
            player.body.velocity.y = -this.jumpSpeed;
        } else if(!this.invincible) {
            this.health--;
            if (this.health === 1) {
              this.default_spaceman.interact(this);
            } else if (this.health <= 0) {
              this.kill();
            }
        }
      },

      process_neutral: function (player, neutral) {
        if (neutral.interactive) {
          neutral.interact(player);
        }
        neutral.kill();
        
        return neutral.collision || false;
      },
      
      hit_block: function (player, neutral) {
        if (neutral.block && neutral.body.touching.down) {
          neutral.hit(player);
        }
        return neutral.collision || false;
      },

      use_powerup: function (powerup) {
        this.power = powerup.name;
        
        if(powerup.priority !== undefined) {
          this.power_priority = this.power_priority || 0;
          if(powerup.priority <= this.power_priority) {
            return;
          }        
          this.power_priority = powerup.priority;
        }
        
        var changes = powerup.properties || {};
        //Set life to the powerups level
        if (changes.hasOwnProperty('pwr_health')) {
          this.health = changes.pwr_health;
        }
        
        //Add life to game-state
        if (changes.hasOwnProperty('pwr_life')) {
          this.game_state.lives += changes.pwr_life;
        }

        //Change texture on player according to powerup
        if (changes.hasOwnProperty('pwr_texture')) {
          this.loadTexture(changes.pwr_texture);
          this.body.setSize(this.texture.frame.width * 0.5, this.texture.frame.height);
          this.y -= this.texture.frame.height/4;
        }
        
        //Toggle attack-mode according to powerup / default to falses
        if(changes.hasOwnProperty('pwr_attack')){
          this.attack = changes.pwr_attack;
        }
        
        //Set invincible according to the powerup
        if(changes.hasOwnProperty('pwr_invincible')) {
          this.invincible = true;
          this.invincible_time = this.default_invincible_time;
        }
      }

    })
  });