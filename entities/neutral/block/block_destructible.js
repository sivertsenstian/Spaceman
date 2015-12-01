define(['SS/platformer/gameobject/static_entity'], function (SSStaticEntity, Coin) {

  return function (game_state, x, y, key, frame, properties) {
    SSStaticEntity.call(this, game_state, x, y, key, frame, properties);
    this.game_state.game.add.existing(this);

    this.game_state.game.physics.arcade.enable(this);
    this.animations.add("enabled",
        [
            'blockDestructible'
        ],
        1,
        true);
          
    this.animations.play('enabled');
    this.body.setSize(64, 64);
    this.body.allowGravity = false;
    this.body.immovable = true;
    this.activated = 0;
    this.collision = true;
        
    //tweens
    this.tween = this.game_state.game.add.tween(this).to( { y: this.y - 20 }, 150, "Quart.easeOut");
    var reset = this.game_state.game.add.tween(this).to( { y: this.y }, 150, "Quart.easeOut");
    this.tween.chain(reset);
  }
  .inherits(SSStaticEntity)
  .extend({
    update: function () {
    },
    
    hit: function (spaceman) {  
        this.tween.onComplete.add(function() {
            if(spaceman.power_priority > 0) {
                this.kill(true);
            }
        }, this);
        this.tween.start();
    },
    
    kill: function (allowed) {
        if(allowed) {
            this.alive = false;
            this.destroy();
            this.game_state.groups[this.entityType].remove(this);
        }
    }
  })
});